"use client"

import { createContext, useContext, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

if (!stripePromise) {
    throw new Error("❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined")
}
const AppContext = createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProps = ({ children }) => {
    const [showSignIn, setShowSignIn] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    const handlePayment = async () => {
    }

    const openSignIn = () => {
        setShowSignIn(true)
        setShowSignUp(false)
    }

    const openSignUp = () => {
        setShowSignIn(false)
        setShowSignUp(true)
    }

    const values = {
        showSignIn,
        setShowSignIn,
        showSignUp,
        setShowSignUp,
        openSignIn,
        openSignUp
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}