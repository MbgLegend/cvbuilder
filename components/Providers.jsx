"use client"

import { AppProps } from "@/context/AppContext"
import { SessionProvider } from "next-auth/react"

export default function Providers({ children, session }) {
    return (
        <SessionProvider session={session}>
            <AppProps>
                {children}
            </AppProps>
        </SessionProvider>
    )
}