import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import CvEditor from "@/components/CvEditor"
import connectToDB from "@/utils/db"
import User from "@/models/user.model"

export const metadata = {
    title: 'CV builder - Editor',
    description: 'CV editor where you can edit your cv easily!'
}

export default async function CV({ searchParams }) {
    await connectToDB()
    
    const session = await getServerSession(authOptions)
    const { cvId, step } = await searchParams
    
    const CV_STEPS = Object.freeze([
        "Details",
        "Summary",
        "Experience",
        "Education",
        "Skills"
    ])

    // 🛑 1. Check if user is logged in
    if (!session?.user) {
        redirect("/")
    }

    // 🛑 2. Check if `cvId` is provided
    if (!cvId) {
        redirect("/dashboard")
    }

    // 🔍 3. Check if the CV belongs to the logged-in user
    const userWithCV = await User.findOne(
        { email: session.user.email, "generatedCVs.id": cvId },
        { "generatedCVs.$": 1 } 
    ).lean()

    // 🛑 4. If CV not found OR doesn't belong to user → redirect
    if (!userWithCV || !userWithCV.generatedCVs.length) {
        redirect("/dashboard")
    }

    // ✅ Extract the CV data
    const cvData = JSON.parse(JSON.stringify(userWithCV.generatedCVs[0]))

    // 🛑 5. Validate `step`: If missing or invalid, redirect to first step
    if (!step || !CV_STEPS.includes(step)) {
        redirect(`/dashboard/cv?cvId=${cvId}&step=${CV_STEPS[0]}`)
    }    

    return <CvEditor 
        step={step} 
        cv={cvData}
        CV_STEPS={CV_STEPS}
        cvId={cvId}
    />
}