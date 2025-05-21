import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ArrowRight, CheckCircle, Crown, Download, FileText, Rocket, Sparkles, Star, Zap } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Success() {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.plan !== "pro") {
        redirect("/dashboard")
    }

    return (
        <section className="w-full min-h-screen lg:p-[2.25rem] flex items-center bg-gradient-to-b from-indigo-50 via-white to-purple-50">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative max-w-5xl mx-auto ">
                <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 overflow-hidden">
                    {/* Success Icon */}
                    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
                        <div className="w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-full flex items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Crown className="h-8 w-8 text-indigo-600 mr-3.5" />
                            <h1 className="text-4xl font-bold text-gray-900">Welcome to Pro!</h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Thank you for subscribing to CVbuilder's Pro plan. Your journey to creating exceptional CVs starts now!
                        </p>
                    </div>
                    {/* Unlocked Features */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 lg:items-stretch">
                    {[
                        {
                            icon: Sparkles,
                            title: "AI Enhancement",
                            description: "Smart content suggestions powered by AI",
                            color: "from-blue-500 to-indigo-500"
                        },
                        {
                            icon: Download,
                            title: "All Formats",
                            description: "Export to PDF, DOCX, and more",
                            color: "from-purple-500 to-pink-500"
                        },
                        {
                            icon: FileText,
                            title: "Unlimited CVs",
                            description: "Create as many versions as you need",
                            color: "from-green-500 to-emerald-500"
                        }
                        ].map((feature, index) => (
                            <div key={index} className="relative group h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
                                <div className="relative h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 text-white`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Zap className="h-5 w-5 text-indigo-600 mr-2" />
                                Quick Start Guide
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {[
                                    "Explore premium templates",
                                    "Try AI content suggestions",
                                    "Create your first pro CV",
                                    "Set up your profile"
                                ].map((action, index) => (
                                    <button
                                        key={index}
                                        className="cursor-pointer flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
                                    >
                                      <span className="text-gray-700 group-hover:text-gray-900">{action}</span>
                                      <ArrowRight className="h-4 w-4 text-indigo-600 transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link
                            href="/dashboard"
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center flex items-center justify-center"
                        >
                            <Rocket className="h-5 w-5 mr-2" />
                            Go to Dashboard
                        </Link>
                        <Link
                            href="/#templates"
                            className="flex-1 bg-white text-gray-900 px-6 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-indigo-200 text-center flex items-center justify-center"
                        >
                            <Star className="h-5 w-5 mr-2 text-indigo-600" />
                            Browse Templates
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}