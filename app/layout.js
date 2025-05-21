import Providers from "@/components/Providers"
import "./globals.css"
import { Bounce, ToastContainer } from "react-toastify"

export const metadata = {
    title: "CV builder",
    description: "Create your CV easily with our AI-powered cv builder tool.",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
                <ToastContainer
                    position="bottom-right"
                    autoClose={4000}
                    limit={1}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                    transition={Bounce}
                />
            </body>
        </html>
    )
}