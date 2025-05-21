import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import User from "@/models/user.model"
import connectToDB from "@/utils/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import leoProfanity from "leo-profanity"
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import arcjet, { fixedWindow } from "@arcjet/next"

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
    // apply arcjet security 
    const securityCheck = await aj.protect({
        req,
        ip: req.headers.get("x-forwarded-for") || ""
    })
    if (securityCheck.isDenied()) {
        return NextResponse.json( { error: `Request blocked: ${securityCheck.reason.message || "Too many requests or suspicious behavior detected"}` }, { status: 403 })
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
    if (user.plan !== "pro") {
        return NextResponse.json({ error: "Pro plan is required to do this task" }, { status: 402 })
    }

    const {
        firstName,
        lastName,
        jobTitle,
        Country,
        City,
        Phone,
        Email,
      } = await req.json();
      
      // Load bad-words dictionary
      leoProfanity.loadDictionary();
      
      // Map field names to their values
      const fieldEntries = {
        firstName,
        lastName,
        jobTitle,
        Country,
        City,
        Phone: Number(Phone).toString(),
        Email,
      }
      
      const missingFields = []
      const containInAppropriateLang = []
      
      Object.entries(fieldEntries).forEach(([key, value]) => {
            if (!value || value.toString().trim().length === 0) {
                missingFields.push(key)
            }
        
            if (leoProfanity.check(value)) {
                containInAppropriateLang.push(key)
            }
        })
      
      if (missingFields.length > 0) {
            return NextResponse.json(
            {
                error: `Fill in ${missingFields.join(", ")} to generate a summary`,
            },
            { status: 400 }
            )
      }
      
      if (containInAppropriateLang.length > 0) {
            return NextResponse.json(
                {
                    error: `${containInAppropriateLang} contains inappropirate languge`,
                },
                { status: 400 }
            )
      }      

    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing")
    
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }
            ]
        })
        // AI prompt
        const prompt = `
            Generate a professional summary of approximately 50-60 words based on the following details:
            - **Full Name**: ${firstName} ${lastName}
            - **Job Title**: ${jobTitle}
            - **Location**: ${City}, ${Country}
            The summary should highlight the person's expertise, professional background, and key strengths in a concise and compelling way. Maintain a formal and engaging tone suitable for LinkedIn profiles or resumes.
            This format is very important to ensure a clear and redable CV summary
            [Important: We apologize if any inappropriate language was included in the input. Any such content is unintended.]
        `   
        const result = await model.generateContent(prompt)
        const response = result.response
        if (!response.text()) {
            return NextResponse.json({ error: "Your input was flagged as inappropriate. Please revise and try again." }, { status: 400 })
        }
        return NextResponse.json({ 
            summary: `
                Languages: <b>[Add languages you can speak]</b><br>
                Technologies: <b>[Add relevant technologies you can use]<br>
                ${response.text()}
            `
        })
    } catch (error) {
        return NextResponse.json({ error: "An issue occurred while generating the summary. Please try again later." }, { status: 500 })
    }
}