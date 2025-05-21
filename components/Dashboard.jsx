"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Check, ChevronRight, Clock, Crown, Download, FileText, LoaderCircle, Minus, MoveRight, Plus, PlusIcon, Sparkles, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { dashboardProTips, dashboardQuickActions, templates, userPlan } from "@/public/assets"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/AppContext"
import { toast } from "react-toastify"
import CvCardPreview from "./CvCardPreview"
import { TitleModal } from "./modals/Title"
import CreditsPurchase from "./modals/CreditsPurchase"
import DeleteCV from "./modals/DeleteCV"
import ToolTip from "./ToolTip"

export default function DashboardComponent() {
    const { setShowSignIn } = useAppContext()
    const { data:session, status } = useSession()
    const [title, setTitle] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState("professional")
    const [titleModalActive, setTitleModalActive] = useState(false)
    const [creditsModalActive, setCreditsModalActive] = useState(false)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [creditsPaymentLoading, setCreditsPaymentLoading] = useState(false)
    const [creatingCVLoading, setCreatingCVLoading] = useState(false)
    const [sortOption, setSortOption] = useState("Name")
    const [sortedCVs, setSortedCVs] = useState([])
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [selectedCvDelete, setSelectedCvDelete] = useState({
        name: '',
        id: ''
    })
    const [deletingCv, setDeletingCv] = useState(false)
    const router = useRouter()

    const handleCheckout = async () => {
        if (!session?.user) setShowSignIn(true)
        if (session?.user.plan === "pro") setTitleModalActive(true)
        if (paymentLoading || status === "loading") return
        
        setPaymentLoading(true)
        try {
            const response = await fetch("/api/user/checkout", { method: "POST" })
            const { url, error } = await response.json()
            if (error) {
                toast.error(error)
            } else {
                window.location.href = url
            }
            setPaymentLoading(false)
        } catch (error) {
            console.log("Error at pro plan handleCheckout:", paymentError)
            toast.error("An error occured:", error.message)
            setPaymentLoading(false)
        }
    }

    const onOpen = () => {
        setTitleModalActive(true)
        setTitle("")
    }

    const handleCreateResume = async () => {
        if (creatingCVLoading) return

        setCreatingCVLoading(true)
        try {
            const response = await fetch("/api/user/cv", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    template: selectedTemplate 
                })    
            })
            const { cv, error } = await response.json()
            if (!cv && error) {
                toast.error(error)
            } else {
                setSortedCVs(prev => [...prev, cv]) 
                router.push(`/dashboard/cv?cvId=${cv.id}`)
            }
            setCreatingCVLoading(false)
        } catch (error) {
            console.log("Error at handleCreateResume:", error.message)
            toast.error("Could not create resume:", error.message)
            setCreatingCVLoading(false)
        }
    }

    useEffect(() => {
        if (status !== "loading" && status === "authenticated" && session?.user) {
            const sortOptions = ["Name", "Recent", "Downloads"]
            if (!sortOptions.includes(sortOption)) {
                setSortOption("Name")
            }
            let sortedCVs = [...session?.user.generatedCVs]
            switch (sortOption) {
                case "Name":
                    sortedCVs = session?.user.generatedCVs.sort((a, b) => {
                        const nameA = a.title.toLowerCase()
                        const nameB = b.title.toLowerCase()
                        return nameA.localeCompare(nameB)
                    })
                    break
                case "Recent":
                    sortedCVs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break
                case "Downloads":
                    sortedCVs.sort((a, b) => b.downloads - a.downloads)
                    break
            }
            setSortedCVs(sortedCVs)
        }
    }, [status, session?.user, sortOption])

    useEffect(() => {
        if (titleModalActive && session?.user.credits <= 0) {
            setTitleModalActive(false)
            setCreditsModalActive(true)
        } 
    }, [titleModalActive])

    useEffect(() => {
        if (selectedCvDelete.name.length > 0 || selectedCvDelete.name.length > 0) {
            setDeleteModalActive(true)
        } else {
            setDeleteModalActive(false)
        }
    }, [selectedCvDelete])

    return (
        <>
            {/* Navbar */}
            <Navbar padx="px-[2%] md:px-[5%] lg:px-[7%] xl:px-[11%] 2xl:px-[14%]" />
            {/* Title Modal */}
            {(session?.user.plan === "pro" || (session?.user.plan === "default" && session?.user.credits > 0)) && (
                <TitleModal
                    titleModalActive={titleModalActive}
                    setTitleModalActive={setTitleModalActive}
                    setTitle={setTitle}
                    setSelectedTemplate={setSelectedTemplate}
                    selectedTemplate={selectedTemplate}
                    creatingCVLoading={creatingCVLoading}
                    title={title}
                    handleCreateResume={handleCreateResume}
                />
            )}
            {/* Purchase credits modal */}
            {(session?.user.plan !== "pro") && (
                <CreditsPurchase 
                    creditsModalActive={creditsModalActive}
                    setCreditsModalActive={setCreditsModalActive}
                    creditsPaymentLoading={creditsPaymentLoading}
                    setCreditsPaymentLoading={setCreditsPaymentLoading}
                />
            )} 
            {/* Delete CV modal */}
            {(selectedCvDelete.id.trim().length !== 0 && selectedCvDelete.name.trim().length !== 0) && (
                <DeleteCV 
                    deleteModalActive={deleteModalActive}
                    setDeleteModalActive={setDeleteModalActive}
                    selectedCvDelete={selectedCvDelete}
                    deletingCv={deletingCv}
                    setDeletingCv={setDeletingCv}
                    setSortedCVs={setSortedCVs}
                />
            )}
            {/* Dasboard */}
            <section className="px-[2%] md:px-[5%] lg:px-[7%] xl:px-[11%] 2xl:px-[14%] py-8 bg-gradient-to-b from-gray-50 to-white">
                {/* Hero  */}
                <div className="bg-gradient-to-r from-[var(--main-color)] to-blue-500 rounded-2xl text-white relative overflow-hidden p-8 flex items-start justify-between gap-[2rem] flex-col lg:flex-row">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[32px] font-bold flex items-center gap-2">
                            Welcome back, {status === "loading" ?  <LoaderCircle className="animate-spin text-[1.5rem]" /> : session?.user.fullName}!
                        </h1>
                        <p className="text-neutral-100 max-w-xl leading-[1.815] text-[0.885rem] font-[500]" style={{ fontFamily: 'var(--font-mono)' }}>
                            {session?.user.generatedCVs.length > 0 ? 
                                "Your CV portfolio is looking great! Keep them updated to stay ahead in your career journey."
                                :
                                "Ready to create your first professional CV? Our AI-powered builder will help you craft the perfect resume in minutes."
                            }
                        </p>
                    </div>
                    <button
                        className="bg-white text-[var(--main-color)] px-6 py-3 rounded-lg font-medium flex items-center hover:bg-indigo-50 transition-colors cursor-pointer"
                        onClick={onOpen}
                    >
                        <PlusIcon className="h-5 w-5 mr-2 shrink-0" />
                        Create New CV
                    </button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm text-gray-600">Total CVs</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {status === "loading" ?  <LoaderCircle className="animate-spin text-[1.05rem] " /> : session?.user.generatedCVs.length}
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-[var(--main-color)]" />
                        </div>
                        <p className="text-xs text-gray-500">Build your portfolio</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm text-gray-600">Credits Left</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {status === "loading" ?  
                                        <LoaderCircle className="animate-spin text-[1.05rem]" /> 
                                            : 
                                            session?.user.plan === "pro" ? '∞' 
                                            : 
                                            session?.user.credits
                                    }
                                </p>
                            </div>
                            <Sparkles className="h-8 w-8 text-[var(--main-color)]" />
                        </div>
                        <p className="text-xs text-gray-500">Use them wisely</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-sm text-gray-600">Creation Date</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {status === "loading" ?  
                                        <LoaderCircle className="animate-spin text-[1.05rem]" /> 
                                        : 
                                        new Date(session?.user.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                    }
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-[var(--main-color)]" />
                        </div>
                        <p className="text-xs text-gray-500">Your journey started here</p>
                    </div>
                </div>
                {/* Current plan & template categories */}
                <div className="flex flex-col xl:flex-row lg:items-stretch gap-[2rem] mt-10 w-full">
                    <div className="bg-white rounded-xl shadow-sm w-full xl:max-w-[325px] 2xl:max-w-[375px] flex flex-col gap-4">
                        <div className="flex items-center gap-[1.5rem] justify-between p-6 pb-2">
                            <div className="flex items-center gap-[0.5rem]">
                                <Crown className="h-6 w-6 text-[var(--main-color)] mr-2" />
                                <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                            </div>
                            <span className="px-3 py-1 bg-indigo-100 text-[var(--main-color)] rounded-full text-sm font-medium">
                                {session?.user.plan}
                            </span>
                        </div>
                        <hr />
                        <div className="h-full pt-1 px-6 pb-1.5">
                            <ul className="space-y-4.5">
                                {userPlan[session?.user.plan]?.features.map((feature, index) => (
                                    <li key={`plan-features-${index+1}`} className="flex items-center text-[0.85rem] text-gray-600 font-[500] gap-3.5" style={{ fontFamily: 'var(--font-mono)' }}>
                                        <Check className="h-5 w-5 text-[var(--main-color)]" />
                                        {feature.text}
                                        <ToolTip 
                                            toolTipContent={feature.tooltip}
                                        />
                                    </li>
                                ))}
                            </ul>
                            {session?.user.plan === "default" && (
                                <ul className="space-y-4.5 mt-4.5">
                                    {userPlan[session?.user.plan]?.limitations.map((limitation, index) => (
                                        <li key={index} className="flex items-center text-[0.85rem] text-neutral-500 font-[500] gap-3.5" style={{ fontFamily: 'var(--font-mono)' }}>
                                            <Minus className="h-5 w-5" />
                                            {limitation.text}
                                            <ToolTip 
                                                toolTipContent={limitation.tooltip}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {session?.user.plan === "pro" ? (
                            <button 
                                className={`mx-6 text-[14px] font-[500] text-neutral-100 bg-[var(--main-color)] py-3 border-[#26adf0] cursor-pointer hover:bg-[var(--main-color)]/90 transition-colors mb-4`}
                                onClick={() => setTitleModalActive(true)}
                            >
                                Generate CV now
                            </button>
                        ) : (
                            <button 
                            className={`mx-6 text-[14px] font-[500] text-neutral-100 bg-[var(--main-color)] py-3 border-[#26adf0] cursor-pointer hover:bg-[var(--main-color)]/90 transition-colors mb-4`}
                                onClick={handleCheckout}
                            >
                                {paymentLoading ? (
                                    <LoaderCircle className="animate-spin mx-auto" width={20} height={20} />
                                ) : (
                                    <>
                                        {session?.user.plan === "pro" ? "Generate new CV" : "Upgrade to Pro"}  
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <div className="bg-white rounded-xl shadow-sm w-full flex flex-col">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-[0.5rem] p-6">
                            <Target className="h-6 w-6 text-[var(--main-color)] mr-2" />
                            Template Categories ({templates.length})
                        </h2>
                        <hr />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-strech px-6 py-4.5">
                            {templates.slice(0, 3).map((template) => (
                                <div 
                                    key={`template-${template.title}-dashboard`}
                                    className="group cursor-pointer rounded-xl px-5 py-4 border-2 border-gray-100 hover:border-indigo-100 transition-all hover:shadow-md"
                                    onClick={() => {
                                        setTitleModalActive(true)
                                        setSelectedTemplate(template.title.toLowerCase())
                                    }}
                                >
                                    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${template.color} mb-3 group-hover:scale-110 transition-transform`}>
                                        <template.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-1.5">{template.title}</h3>
                                    <p className="text-sm text-gray-500">{template.description}</p>
                                </div>
                            ))}
                             <div 
                                className="group cursor-pointer rounded-xl px-5 py-4 border-2 border-neutral-100 bg-neutral-50 hover:border-indigo-100 transition-all hover:shadow-md flex items-center justify-center gap-4"
                                onClick={() => {
                                    setTitleModalActive(true)
                                }}
                            >
                                <p className="font-[500] text-gray-500">View all templates</p>
                                <MoveRight className="h-7 w-7 " />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quick actions & Pro tips */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
                    <div className="bg-white rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 p-6">Quick Actions</h2>
                        <hr />
                        <div className="space-y-3 p-3 pb-5.5">
                            {dashboardQuickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                                    onClick={() => {
                                        switch (action.title) {
                                            case "Create a CV from scratch":
                                            case "Use AI to enhance your CV":
                                            case "Import LinkedIn profile":
                                                onOpen()
                                                break
                                            case "Browse CV templates":
                                                router.push("/#templates")
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                    <action.icon className={`h-5 w-5 ${action.color} mr-3`} />
                                    <span className="text-[0.9rem] md:text-[1rem] text-gray-700 group-hover:text-gray-900">{action.title}</span>
                                    {action.badge && (
                                        <span className={`ml-2 text-[0.7rem] md:text-xs px-2 py-1 rounded-full ${
                                            action.badge === 'Premium' ? 'bg-purple-100 text-purple-600' :
                                            action.badge === 'New' ? 'bg-green-100 text-green-600' :
                                            'bg-blue-100 text-blue-600'
                                            }`}>
                                            {action.badge}
                                        </span>
                                    )}
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 p-6">Pro Tips</h2>
                        <hr />
                        <div className="space-y-4 p-3 pb-5.5">
                            {dashboardProTips.map((tip, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        <tip.icon className="h-6 w-6 text-[var(--main-color)]" />
                                        </div>
                                        <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{tip.title}</h3>
                                        <p className="text-sm text-gray-600">{tip.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* My CVs Section */}
                <div className="overflow-hidden mt-10">
                    <div className="relative p-6 bg-gradient-to-r from-[var(--main-color)] to-blue-500 text-neutral-100 flex items-center justify-between rounded-sm">
                        <h2 className="text-2xl font-semibold text-neutral-100">My CVs ({session?.user.generatedCVs.length})</h2>
                        <div className="flex items-center space-x-2">
                            <select 
                                className="text-sm rounded-md p-2 cursor-pointer bg-white text-black appearance-none text-center font-[500]"
                                style={{ fontFamily: "var(--font-mono)" }}
                                value={sortOption}
                                onChange={(e) => {
                                    setSortOption(e.target.value)
                                }}
                            >
                                <option className="text-black" value={"Recent"}>Sort by: Recent</option>
                                <option className="text-black" value={"Name"}>Sort by: Name</option>
                                <option className="text-black" value={"Downloads"}>Sort by: Downloads</option>
                            </select>
                        </div>
                    </div>
                    {session?.user.generatedCVs.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-12 w-12 text-[var(--main-color)]" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No CVs Created Yet</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-6">
                                Start your journey to a perfect CV by creating your first resume. Our smart builder will guide you through every step.
                            </p>
                            <button 
                                className="cursor-pointer bg-[var(--main-color)] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center hover:bg-[var(--main-color)]/90 transition-colors"
                                onClick={onOpen}
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Create Your First CV
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 mt-7">
                            {sortedCVs.map((cv) => (
                               <CvCardPreview 
                                    key={cv.id}
                                    cv={cv}
                                    setSelectedCvDelete={setSelectedCvDelete}
                               />
                            ))}
                            <button
                                className="relative bg-[#f4f4f4]/65 rounded-xl border flex flex-col p-6 h-full flex items-center justify-center cursor-pointer hover:shadow-lg min-h-[450px]"
                                onClick={onOpen}
                            >
                                <div 
                                    className="flex items-center justify-center flex-col gap-3"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    <Plus 
                                        width={30}
                                        height={30}
                                    />
                                    <h1 className="text-[0.915rem] font-[500]">Generate new CV</h1>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </section>
            {/* Footer */}
            <Footer padx="px-[1.25rem] md:px-[5%] lg:px-[7%] xl:px-[11%] 2xl:px-[14%]" />
        </>
    )
}