import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import User from "@/models/user.model"
import { cvPatchSchema } from "@/utils/cv.schema"
import connectToDB from "@/utils/db"
import arcjet, { fixedWindow } from "@arcjet/next"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

const templates = ['professional', 'creative', 'executive', 'visionary', 'pinnacle', 'summit']
const photoWillBeDisplayed = ["creative", "executive", 'pinnacle']

export async function POST(req) {
    try {        
        const aj = arcjet({
            key: process.env.ARCJET_KEY,
            rules: [
                fixedWindow({
                    mode: "LIVE",
                    window: "60s", 
                    max: 2,
                })
            ]
        })

        // apply arcjet security 
        const securityCheck = await aj.protect({
            req,
            ip: req.headers.get("x-forwarded-for") || ""
        })
        if (securityCheck.isDenied()) {
            return NextResponse.json(
                { error: `Request blocked: ${JSON.stringify(securityCheck.reason)}` },
                { status: 403 }
            )
        }

        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectToDB()

        const user = await User.findOne({ email: session.user.email })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        // check if the user has enough credits or not
        if (user.plan !== "pro" && user.credits <= 0) {
            return NextResponse.json({ error: "Insufficient credits" }, { status: 402 })
        }
        const { title, template } = await req.json()

        // validating title
        if (!title || title.trim().length < 8) {
            return NextResponse.json({ error: "Title must contain at least 8 characters" }, { status: 400  })
        }
        if (title.trim().length > 80) {
            return NextResponse.json({ error: "Title characters limit exceeded (80)" }, { status: 400  })
        }
        // validate template
        if (!templates.includes(template)) {
            return NextResponse.json({ error: `${template} is not a valid template` }, { status: 400  })
        }

        // add new cv to user's generated cvs
        const newCV = {
            id: uuidv4(),
            title: title.trim(),
            template,
            createdAt: new Date(),
            updatedAt: new Date(),
            data: {
                photo: "",
                firstName: "",
                lastName: "",
                jobTitle: "",
                country: "",
                city: "",
                phone: "",
                email: "",
                linkedin: "",
                portfolio: "",
                summary: "",
                experience: [{
                    positionTitle: '',
                    companyName: '',
                    city: '',
                    state: '',
                    startDate: '',
                    endDate: '',
                    summary: ''
                }],
                education: [{
                    universtyName: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }],
                skills: [{
                    skillName: '',
                    proficiency: 1,
                    showProficiency: false
                }],
                colors: {
                    primary: "#3f3f40",
                    body: "#000",
                    background:  "#ffffff",
                    line: "#2b2b2b"
                },
                text: {
                    font: "serif",
                    header: 36,
                    section: 18,
                    subtitles: 15,
                    body: 14,
                    date: 14
                }
            }
        }
        user.generatedCVs.push(newCV)

        // deduct 1 credit if user is not on pro plan
        if (user.plan !== "pro") {
            user.credits -= 1
        }
        await user.save()

        return NextResponse.json({ message: "CV created successfully", cv: newCV }, { status: 201 })
    } catch (error) {
        console.error("CV creation Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        const aj = arcjet({
            key: process.env.ARCJET_KEY,
            rules: [
                fixedWindow({
                    mode: "LIVE",
                    window: "60s", 
                    max: 12,
                })
            ]
        })
        
        // apply arcjet security 
        const securityCheck = await aj.protect({
            req,
            ip: req.headers.get("x-forwarded-for") || ""
        })
        if (securityCheck.isDenied()) {
            return NextResponse.json(
                { error: `Request blocked: ${JSON.stringify(securityCheck.reason)}` },
                { status: 403 }
            )
        }

        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDB()

        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const { data, id, template } = await req.json()

        const result = cvPatchSchema.safeParse(data)

        // check if updated template exists
        if (!templates.includes(template)) {
            return NextResponse.json({ error: "Invalid template" }, { status: 404 })
        }

        if (!result.success) {
            const allErrors = result.error.issues.map(issue =>
                `${issue.path.join(".")}: ${issue.message}`
            ).join("; ")
            return NextResponse.json({ error: allErrors }, { status: 400 })
        }

        // Sanitize data before updating
        if (Array.isArray(result.data.experience) && result.data.experience.length === 0) {
            result.data.experience = [{
                positionTitle: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                summary: ''
            }]
        }
        if (Array.isArray(result.data.education) && result.data.education.length === 0) {
            result.data.education = [{
                universtyName: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }]
        }
        if (Array.isArray(result.data.skills) && result.data.skills.length === 0) {
            result.data.skills = [{
                skillName: '',
                proficiency: 1,
                showProficiency: false
            }]
        }
        if (user.plan !== "pro") {
            result.data.colors = {
                primary: result.data.colors.primary || "#3f3f40",
                line: result.data.colors.line || "#2b2b2b",
                background: '#ffffff',
                body: '#000'
            }

            result.data.text = {
                font: "serif",
                header: 36,
                section: 18,
                subtitles: 15,
                body: 14,
                date: 14
            }
        }

        const cv = user.generatedCVs.find(cv => cv.id === id)
        if (!cv) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 })
        }

        if (!photoWillBeDisplayed.includes(cv?.template)) {
            result.data.photo = ""
        }

        if ((user.plan !== "pro" && user.credits === 0 && cv.template !== template)) {
            cv.template = cv.template
        } else {
            cv.template = template
        }
        cv.data = result.data
        cv.updatedAt = new Date()
        await user.save()

        return NextResponse.json({ message: "CV updated successfully" }, { status: 200 })
    } catch (error) {
        console.error("CV updating Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const aj = arcjet({
            key: process.env.ARCJET_KEY,
            rules: [
                fixedWindow({
                    mode: "LIVE",
                    window: "60s",
                    max: 2,
                }),
            ],
        })

        const securityCheck = await aj.protect({
            req,
            ip: req.headers.get("x-forwarded-for") || "",
        })

        if (securityCheck.isDenied()) {
            return NextResponse.json(
                { error: `Request blocked: ${JSON.stringify(securityCheck.reason)}` },
                { status: 403 }
            )
        }

        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDB()

        const user = await User.findOne({ email: session.user.email })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const { id } = await req.json()

        if (!id || typeof id !== "string" || id.trim().length === 0) {
            return NextResponse.json({ error: "Invalid CV ID" }, { status: 400 })
        }

        const initialLength = user.generatedCVs.length
        user.generatedCVs = user.generatedCVs.filter(cv => cv.id !== id)

        if (user.generatedCVs.length === initialLength) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 })
        }

        await user.save()

        return NextResponse.json({ message: "CV deleted successfully", newArray: user.generatedCVs }, { status: 200 })

    } catch (error) {
        console.error("CV deletion error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}