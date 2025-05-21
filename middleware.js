import arcjet, { fixedWindow, shield } from "@arcjet/next"
import { NextResponse } from "next/server"

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        fixedWindow({
            mode: "LIVE",
            window: "60s", 
            max: 250,
        }),  
        shield({ mode: "LIVE" }),
    ]
})

export async function middleware(req) {
    // apply arcjet security 
    const securityCheck = await aj.protect({
        req,
        ip: req.headers.get("x-forwarded-for") || ""
    })
    if (securityCheck.isDenied()) {
        return NextResponse.json({ error: `Request blocked: ${securityCheck.reason}` }, { status: 403 })
    }
}