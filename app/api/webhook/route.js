import Stripe from "stripe"
import { NextResponse } from "next/server"
import connectToDB from "@/utils/db"
import User from "@/models/user.model"
import transporter from "@/lib/transporter"
import premium from "@/emails/premuim"
import credits from "@/emails/credits"

if (
    process.env.STRIPE_SECRET_KEY === undefined || 
    process.env.STRIPE_WEBHOOK_SECRET === undefined ||
    process.env.STRIPE_PRO_PLAN_PRICE_ID === undefined ||
    process.env.STRIPE_CREDIT_PRICE_ID === undefined
) {
    throw new Errror(`
        STRIPE_SECRET_KEY || 
        STRIPE_WEBHOOK_SECRET || 
        STRIPE_PRO_PLAN_PRICE_ID || 
        STRIPE_CREDIT_PRICE_ID is not defined
    `)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const payload = await req.text()
    const sig = req.headers.get("Stripe-Signature")

    if (!sig) {
        return NextResponse.json({ status: "failed", error: "Missing Stripe signature" }, { status: 400 })
    }
    let event
    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return NextResponse.json({ status: "failed", error: `Invalid webhook signature: ${error.message}` }, { status: 400 })
    }

    if (event?.type !== "checkout.session.completed") {
        return NextResponse.json({ status: "ignored", message: "Event not handled" }, { status: 200 })
    }

    const session = event?.data.object
    // check if session exists
    if (!session) {
        return NextResponse.json({ status: "failed", error: "Invalid session data" }, { status: 400 });
    }

    const email = session.customer_email
    const name = session.customer_details?.name
    const sessionId = session.id

    if (!email || !sessionId) {
        return NextResponse.json({ status: "failed", error: "Invalid session data" }, { status: 400 })
    }

    try {
        await connectToDB()

        // Check if this session has already been processed (Prevents duplicate processing)
        const existingUser = await User.findOne({ email }).lean()
        if (!existingUser) {
            return NextResponse.json({ status: "failed", error: "User not found" }, { status: 404 })
        }

        // ✅ Fetch purchased items safely
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
        if (!lineItems?.data || lineItems.data.length === 0) {
            return NextResponse.json({ status: "failed", error: "No items found in the session" }, { status: 400 })
        }

        const purchasedPriceId = lineItems?.data?.[0]?.price?.id
        switch (purchasedPriceId) {
            case process.env.STRIPE_PRO_PLAN_PRICE_ID:
                if (existingUser.plan === "pro") {
                    return NextResponse.json({ status: "failed", error: "User already has Pro plan" }, { status: 400 })
                }
                // update user plan to pro
                await User.findOneAndUpdate({ email }, { plan: "pro" })
                // Send Pro plan confirmation email
                await transporter.sendMail({
                    from: `"CV builder <noreply@cvbuilder.monster>`,
                    to: email,
                    subject: "Welcome to CV Builder Pro 🎉",
                    html: premium(name)
                })
                console.log(`✅ User ${email} upgraded to pro`)
                break

            case process.env.STRIPE_CREDIT_PRICE_ID:
                try {
                    const quantity = lineItems?.data?.[0]?.quantity || 3
                    const price = (lineItems?.data?.[0]?.amount_total / 100) / quantity
                    const product = lineItems?.data?.[0]?.description

                    const updatedCredits = existingUser.credits + quantity
                    await User.findOneAndUpdate({ email }, { credits: updatedCredits })

                    console.log(`✅ User ${email} purchased ${quantity} credits. Total credits: ${updatedCredits}`)

                    // Send Credits purchase confirmation email
                    await transporter.sendMail({
                        from: `"CV Builder" <noreply@cvbuilder.monster>`,
                        to: email,
                        subject: "CV Builder Credits Purchased 🎉",
                        html: credits(product, quantity, price, (lineItems?.data?.[0]?.amount_total / 100), name),
                    })
                } catch (error) {
                    console.log("❌ Unable to retrive quantity: ", error.message)
                }
                break
            default:
                console.log(`❌ Unknown product purchased: ${purchasedPriceId}`);
                return NextResponse.json({ status: "failed", error: "Unknown product purchased" }, { status: 400 })
        }
        return NextResponse.json({ status: "success", event: event.type })
    } catch (error) {
        return NextResponse.json({ status: "failed", error })
    }
}