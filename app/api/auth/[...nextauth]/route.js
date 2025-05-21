import welcome from "@/emails/welcome"
import transporter from "@/lib/transporter"
import User from "@/models/user.model"
import connectToDB from "@/utils/db"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                await connectToDB()
                const sessionUser = await User.findOne({email: session.user.email}).lean()
                if (!sessionUser) return
                
                session.user = {
                    id: sessionUser._id.toString(),
                    email: sessionUser.email,
                    fullName: sessionUser.fullName,
                    image: sessionUser.image,
                    plan: sessionUser.plan,
                    generatedCVs: sessionUser.generatedCVs,
                    credits: sessionUser.credits,
                    createdAt: sessionUser.createdAt,
                    totalDownloads: sessionUser.totalDownloads
                }
                return session
            } catch (error) {
                console.log("❌ Failed to fetch session: ", error.message)
                return session
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB()

                // check if user exists
                let user = await User.findOne({ email: profile.email })
                // if not, create a new one
                if (!user) {       
                    user = await User.create({
                        email: profile.email,
                        fullName: profile.name,
                        image: profile.picture
                    })
                    // send account creation email to user
                    if (!process.env.SMTP_EMAIL) {
                        throw new Error("❌ SMTP_EMAIL undefined")
                    }
                    try {
                        await transporter.sendMail({
                            from: `"CV builder <noreply@cvbuilder.monster>`,
                            to: profile.email,
                            subject: "Welcome to CV Builder 🎉",
                            html: welcome(profile)
                        })
                        console.log(`✅ Welcome email sent to ${profile.email}`)
                    } catch (error) {
                        console.log(`❌ Could not send welcome email:`, error)   
                    }
                }
                return true
            } catch (error) {
                console.log("❌ Could not signIn:", error.message)
                return false
            }
        }
    }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }