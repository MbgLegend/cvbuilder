import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import DashboardComponent from "@/components/Dashboard"

export const metadata = {
    title: 'CV builder - Dashboard',
    description: 'Dashboard page where you can download, update, or create new CVs!'
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/")
    }

    return (
        <DashboardComponent />
    )
}