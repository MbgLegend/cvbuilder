import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import Stripe from "stripe"
import connectToDB from "@/utils/db"
import User from "@/models/user.model"
import arcjet, { fixedWindow } from "@arcjet/next"

if (process.env.STRIPE_SECRET_KEY === undefined || process.env.STRIPE_PRO_PLAN_PRICE_ID === undefined ) {
    throw new Errror("STRIPE_SECRET_KEY || STRIPE_PRO_PLAN_PRICE_ID is not defined")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        fixedWindow({
            mode: "LIVE",
            window: "60s",
            max: 3,
        })
    ]
})

export async function POST(req) {
    try {
        const securityCheck = await aj.protect({ req, ip: req.headers.get("x-forwarded-for") || "" })
        if (securityCheck.isDenied()) {
            return NextResponse.json({ error: `Request blocked: ${securityCheck.reason}` }, { status: 403 })
        }

        // Ensure the request is coming from the frontend
        const origin = req.headers.get("origin");
        if (!origin || !origin.includes(process.env.DOMAIN)) {
            return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
        }

        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const email = session.user.email
        await connectToDB()
        const user = await User.findOne({ email }).lean()
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        // check if user already has the pro plan
        if (user.plan === "pro") {
            return NextResponse.json({ error: "You already have the Pro plan!" }, { status: 400 })
        }

        // Create stripe checkout session
        const stripeSession  = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            customer_email: email,
            line_items: [
                {
                    price: process.env.STRIPE_PRO_PLAN_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.DOMAIN}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/#pricing`,
            consent_collection: {
                terms_of_service: "required"
            },
            custom_text: {
                terms_of_service_acceptance: {
                    message: `I agree to the [Terms of Service](${process.env.DOMAIN}/tos) and [Privacy Policy](${process.env.DOMAIN}/privacy).`
                }
            }
        })

        return NextResponse.json({ url: stripeSession.url })
    } catch (error) {
        console.error("Stripe pro plan Checkout Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}