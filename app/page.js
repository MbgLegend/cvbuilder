"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ArrowRight, Check, ChevronLeft, ChevronRight, Crown, Info, LoaderCircle, Medal, Minus, Plus, Star } from "lucide-react"
import { candidatesHiredIn, faqs, features, featuresPosters, templates } from "@/public/assets"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context/AppContext"
import { toast } from "react-toastify"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ToolTip from "@/components/ToolTip"
import CreditsPurchase from "@/components/modals/CreditsPurchase"

export default function Home() {
    const { setShowSignIn } = useAppContext()
    const { data:session, status } = useSession()
    const [openFaqIndex, setOpenFaqIndex] = useState(null)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [creditsModalActive, setCreditsModalActive] = useState(false)
    const [creditsPaymentLoading, setCreditsPaymentLoading] = useState(false)
    const router = useRouter()

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }

    const handleAction = (func) => {
        if (session?.user) {
            func()
        } else {
            setShowSignIn(true)
        }
    }

    const handleCheckout = async () => {
        if (!session?.user) setShowSignIn(true)
        if (session?.user.plan === "pro") router.push("/dashboard")
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
            console.log("Error at handleCheckout:", error.message)
            toast.error(error.message)
            setPaymentLoading(false)
        }
    }

    return (
        <>
            <Navbar padx="px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%]" />
            {/* Hero section */}
            <section className="py-8 min-h-[calc(82vh-185px-55px)] relative flex items-center overflow-hidden px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%] bg-[#f7f9fc]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 relative items-center w-full">
                    <div className="text-center lg:text-start mx-auto lg:mx-0">
                        <span className="mb-4 rounded-full text-sm font-medium inline-flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            Trusted by 10,000+ professionals worldwide
                        </span>
                        
                        <h1 className="text-[46px] leading-[48px] max-w-[740px] font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Write your story with the ultimate resume builder
                        </h1>
                        
                        <p className="text-gray-600 mb-8 max-w-[600px] text-[20px] font-[500]">
                            Only 2% of resumes win. Yours will be one of them. Let´s build you a resume that works.
                        </p>
                        
                        <div className="flex flex-col 2xl:flex-row items-center lg:items-start 2xl:items-center gap-4 mb-12">
                            <button 
                                onClick={() => handleAction(() => router.push("/dashboard"))}
                                className="lg:max-w-[350px] md:max-w-[100%] 2xl:max-w-[240px] cursor-pointer border text-center w-full justify-center px-8 py-4 bg-[var(--main-color)] border-[var(--main-color)] text-white font-[600] text-[1.3rem] rounded-sm hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-102 shadow-xl hover:shadow-2xl hover:shadow-indigo-200 flex items-center"
                            >
                                Build Your CV
                               
                            </button>
                            <Link 
                                href="#templates"
                                onClick={(e) => {
                                    e.preventDefault()
                                    const section = document.getElementById("templates")
                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" })
                                        history.replaceState(null, null, " ")
                                    }
                                }}
                                className="lg:max-w-[350px] md:max-w-[100%] 2xl:max-w-[240px] cursor-pointer w-full px-8 py-4 text-gray-900 bg-white rounded-sm font-[600] border-[var(--main-color)] text-[1.3rem] transition-all border flex items-center justify-center transform hover:scale-102 hover:shadow-xl"
                            >
                                View Templates
                                
                            </Link>
                        </div>

                        <div className="flex items-center gap-3.5 justify-center lg:justify-start">
                            <div className="flex flex-col items-center lg:items-start gap-3">
                                <div className="bg-[#e7f4ed] text-green-500 text-[31px] font-[500] px-2.5 rounded-sm w-[90px] text-center">
                                    25%
                                </div>
                                <span className="text-[13px] md:text-[16px] font-[500] leading-[19px] text-neutral-500">more likely to get hired</span>
                            </div>
                            <div className="self-stretch border-r w-[3px] mx-4" />
                            <div className="flex flex-col gap-3 items-center lg:items-start">
                                <div className="bg-[#fff2cc] text-[#cf760d] text-[31px] font-[500] px-2.5 rounded-sm w-[90px] text-center">
                                    5%
                                </div>
                                <span className="text-[13px] md:text-[16px] font-[500] leading-[19px] text-neutral-500">better pay with your next job</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full select-none">
                        <img 
                            src="/cveditor.png" 
                            alt="CV editor" 
                            className="mx-auto"
                        />
                    </div>   
                </div>
            </section>
            {/* Candidates */}
            <div className="min-h-[200px] py-7 text-center px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%]">
                <h2 className="text-[21px] xl:text-[25px] font-[500] mb-8.5">Our candidates have been hired at</h2>
                <div className="marquee-container mt-8">
                    <div className="marquee-track">
                    {[...candidatesHiredIn, ...candidatesHiredIn].map((company, index) => (
                        <img
                            key={`${company.alt}-${index}`}
                            alt={company.alt}
                            src={company.logo}
                            className="marquee-logo select-none"
                        />
                    ))}
                    </div>
                </div>
            </div>
            {/* Features section */}
            <section 
                id="features"
                className="overflow-hidden px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%] py-[2.5rem] pt-0 lg:pt-[4.5rem] lg:pb-[6rem] flex flex-col gap-[3.75rem]"
            >
                <h1 className="text-[38px] font-[700] text-center">Land a job fast with a strong resume</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[1.35rem] gap-y-[4.5rem]">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex items-strech gap-4.5 h-full">
                            <img src={feature.image} alt={feature.title} className="w-9 h-9 select-none" />
                            <div className="flex flex-col gap-3.5">
                                <h4 className="text-[23px] font-[700] leading-[28px] text-[var(--main-color)]">{feature.title}</h4>
                                <p className="text-[15px] leading-[24px]" style={{ fontFamily: 'var(--font-roboto)' }}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-[2.5rem] lg:mt-[5.75rem] flex flex-col gap-10 px-[2%] md:px-0">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <h4 className="text-[26px] font-[700]">This resume builder truly helps you land a job</h4>
                        <button 
                            className="rounded-sm px-4 max-w-[285px] w-full md:min-w-[185px] py-3.5 font-[700] text-white bg-[var(--main-color)] text-[15px] cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                            onClick={() => handleAction(() => router.push("/dashboard"))}
                        >
                            Generate CV now
                            <ArrowRight 
                                width={17}
                                height={17}
                            />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {featuresPosters.map((poster) => (
                            <div key={poster.name} className="flex flex-col">
                                <img 
                                    src={poster.image}
                                    alt={poster.name}
                                    className="w-full aspect-[1.25] rounded-md max-h-[500px]"
                                />
                                <h1 className="text-[23px] font-[600] mt-3 mb-1.5">{poster.name}</h1>
                                <p 
                                    className="text-[16px] leading-[25px]"
                                >
                                    {poster.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <hr className="mb-[3rem]" />
            <section 
                className="px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%] flex flex-col gap-[2.75rem] pb-[4.5rem] 2xl:pb-[6rem] pt-[1.25rem] lg:pt-[3rem]"
                id="reviews"
            >
                <div className="text-center flex flex-col items-center justify-center">
                    <h3 
                        className="text-[1.2rem] font-[500] text-[var(--main-color)]" 
                    >
                        Real-World Experiences
                    </h3>
                    <h1 
                        className="text-[2rem] md:text-[2.915rem] lg:text-[3.125rem] font-[700] -mt-1" 
                    >
                        What our customers say
                    </h1>
                    <p 
                        className="max-w-md leading-[27px] text-neutral-500 mt-3"
                        style={{ fontFamily: 'var(--font-roboto)' }}

                    >
                        We’ve helped thousands of people land interviews at top companies. Here’s what a few of them had to say
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 my-7.5 bg-[#f7f9fc] rounded-lg">
                    <div className="py-10 lg:py-20 px-8 lg:px-12 border-b lg:border-r lg:border-b-0">
                        <div className="flex gap-0.5 mb-2">
                        <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                        </div>
                        <p 
                            className="my-9.5 text-base sm:text-lg lg:text-[1.165rem]/8  tracking-tight text-brand-950 text-pretty"
                            style={{ fontFamily: 'var(--font-roboto)' }}
                        >
                            CV Builder helped me craft a professional resume in minutes. I’ve been using it for
                            a couple of months now and getting callbacks from companies has been incredibly
                            motivating and confidence-boosting.
                        </p>
                        <div className="flex justify-start items-center sm:items-start gap-4 mt-2">
                            <img
                                src="/assets/images/user-1.png"
                                className="rounded-full object-cover h-[48px] w-[48px]"
                                alt="Random user"
                            />
                            <div className="flex flex-col sm:items-start">
                                <p className="font-semibold flex items-center">
                                    Kai Durant
                                    <img 
                                        src="/assets/icons/verified.png"
                                        alt="verified" 
                                        className="w-[20px] h-[20px] ml-2" 
                                    />
                                </p>
                                <p className="text-sm text-gray-600">@kdurant_</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-10 lg:py-20 px-8 lg:px-12 lg:pl-17">
                        <div className="flex gap-0.5 mb-2">
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                            <Star className="size-6 text-[var(--main-color)] fill-[var(--main-color)]" />
                        </div>
                        <p 
                            className="my-9.5 text-base sm:text-lg lg:text-[1.165rem]/8 tracking-tight text-brand-950 text-pretty"
                            style={{ fontFamily: 'var(--font-roboto)' }}
                        >
                            CV Builder has truly been a game-changer for me. I've been using it for over two months now, 
                            and creating standout resumes that actually get noticed has made the job hunt so much more satisfying.
                        </p>
                        <div className="flex justify-start items-center sm:items-start gap-4 mt-2">
                            <img
                                src="/assets/images/user-2.png"
                                className="rounded-full object-cover h-[48px] w-[48px]"
                                alt="Random user"
                            />
                            <div className="flex flex-col sm:items-start">
                                <p className="font-semibold flex items-center">
                                    Freya Larsson
                                    <img 
                                        src="/assets/icons/verified.png"
                                        alt="verified" 
                                        className="w-[20px] h-[20px] ml-2" 
                                    />
                                </p>
                                <p className="text-sm text-gray-600">@itsfreya</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-[var(--main-color)] text-white mx-auto max-w-[300px] w-full py-4 font-mono font-[600] rounded-sm cursor-pointer hover:shadow-lg flex items-center justify-center gap-2.5 text-[15px]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    onClick={() => handleAction(() => router.push("/dashboard"))}
                >
                    Start for free today
                    <ArrowRight 
                        width={17}
                        height={17}
                    />
                </button>
            </section>
            {/* Subscription Plans */}
            <section id="pricing" className="relative py-[3.75rem] overflow-hidden px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%] flex flex-col gap-[2.75rem] bg-[#f7f9fc]">
                <div className="flex flex-col items-center justify-center text-center gap-4 relative z-1">
                    <h1 className="text-6xl font-[700]">Pricing</h1>
                    <p className="text-center max-w-[450px] text-[18px] text-neutral-500 leading-[28px] mt-2">Whether you're just trying out our service or need more, we've got you covered.</p>
                </div>
                <div className="relative z-1 flex flex-col lg:flex-row gap-[2rem] items-center lg:items-stretch justify-center">
                    {/* Free Plan */}
                    <div className="w-full h-full lg:max-w-[500px] border border-white bg-white rounded-2xl py-8 shadow-sm hover:shadow-md transition-all duration-300 h-full w-full">
                        <div className="mb-6 px-8">
                            <h3 
                                className="text-[36px] font-bold text-gray-900 text-center"
                            >
                                Free
                            </h3>
                            <p 
                                className="text-[15px] text-neutral-500 text-center mx-auto w-full mt-1.5"
                                style={{ fontFamily: 'var(--font-roboto)' }}
                            >
                                For basic resume needs
                            </p>
                            <p 
                                className="text-[53px] font-bold text-gray-900 mb-2 text-center w-full "
                            >
                                $0
                            </p>
                            <p 
                                className="text-[13px] text-neutral-500 text-center mx-auto w-full mt-1.5"
                                style={{ fontFamily: 'var(--font-roboto)' }}
                            >
                                Lifetime Access
                            </p>
                        </div>

                        <div 
                            className="border-y w-full p-5 text-[14px] text-neutral-500 text-center bg-[#f6f6f7] flex items-center justify-center gap-3"  
                            style={{ fontFamily: 'var(--font-roboto)' }}
                        >
                            2 Free credits Included <ToolTip toolTipContent="Up to 2 CVs for free" />
                        </div>

                        <ul className="flex flex-col gap-5.5 mb-8 px-8 mt-8">
                            {[
                                { text: "All templates available", included: true, tooltip: "All 6 templates available" },
                                { text: "Download in PDF", included: true, tooltip: "Export as PDF" },
                                { text: "ATS optimized CVs", included: true, tooltip: "Resume scanner ready" },
                                { text: "Advanced customization", included: false, tooltip: "Basic customizations only" },
                                { text: "Multiple file formats (PDF, PNG)", included: false, tooltip: "Pro feature only" },
                                { text: "AI content suggestions", included: false, tooltip: "Upgrade to access" },
                                { text: "Priority support", included: false, tooltip: "Support not included" }
                            ].map((feature, index) => (
                            <li 
                                key={index} 
                                className="flex items-center"
                            >
                                {feature.included ? (
                                    <Check className="h-5 w-5 text-[var(--main-color)] mr-4" />
                                ) : (
                                    <Minus className="h-5 w-5 text-neutral-400 mr-4" />
                                )}
                                <span 
                                    className={`text-[14px] flex items-center gap-3.5 ${feature.included ? "text-gray-700" : "text-gray-400 "}`}
                                    style={{ fontFamily: 'var(--font-roboto)' }}
                                >
                                    {feature.text}
                                    <ToolTip 
                                        toolTipContent={feature.tooltip}
                                    />
                                </span>
                            </li>
                            ))}
                        </ul>
                        <div className="px-8 w-full">
                            <button 
                                className={`w-full text-[15px] text-gray-900 bg-[#f6f6f7] py-3 font-medium border-gray-100 cursor-pointer hover:bg-gray-200 transition-colors`}
                                style={{ fontFamily: 'var(--font-roboto)' }}
                                onClick={() => handleAction(() => router.push("/dashboard"))}
                            >
                                Get started for free
                            </button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative w-full h-full lg:max-w-[500px] border border-[var(--main-color)] bg-white rounded-2xl py-8 shadow-sm hover:shadow-md transition-all duration-300 h-full w-full">
                        <div className="min-w-[175px] flex justify-center items-center select-none absolute top-0 -translate-y-1/2 left-[50%] translate-x-[-50%] bg-[var(--main-color)] text-white py-1 rounded-full text-sm font-semibold">
                            {session?.user.plan === "pro" ? (
                                <>
                                    <Crown 
                                        className="mr-2" 
                                        width={18}
                                        height={18}
                                    />
                                    ACTIVE PLAN
                                </>
                            ) : (
                                <>
                                    <Medal
                                        className="mr-2" 
                                        width={18}
                                        height={18}
                                    />
                                    MOST POPULAR
                                </>
                            )}
                        </div>
                        <div className="mb-6 px-8">
                            <h3 
                                className="text-[36px] font-bold text-gray-900 text-center"
                            >
                                Pro
                            </h3>
                            <p 
                                className="text-[15px] text-neutral-500 text-center mx-auto w-full mt-1.5"
                                style={{ fontFamily: 'var(--font-roboto)' }}
                            >
                                For advanced resume needs
                            </p>
                            <p 
                                className="text-[53px] font-bold text-gray-900 mb-2 text-center w-full "
                            >
                                ${session?.user.plan === "pro" ? '0' : '20'}
                            </p>
                            <p 
                                className="text-[13px] text-neutral-500 text-center mx-auto w-full mt-1.5"
                                style={{ fontFamily: 'var(--font-roboto)' }}
                            >
                                Lifetime Access
                            </p>
                        </div>

                        <div 
                            className="border-y w-full p-5 text-[14px] text-neutral-500 text-center bg-[#f6f6f7] flex items-center justify-center gap-3"  
                            style={{ fontFamily: 'var(--font-roboto)' }}
                        >
                            Unlimited credits Included <ToolTip toolTipContent="Unlimited CVs for life" />
                        </div>

                        <ul className="flex flex-col gap-5.5 mb-8 px-8 mt-8">
                        {[
                            { text: "All templates available", tooltip: "Full template access" },
                            { text: "Download in PDF", tooltip: "Export as PDF" },
                            { text: "ATS optimized CVs", tooltip: "Resume scanner ready" },
                            { text: "Advanced customization", tooltip: "Full style control" },
                            { text: "Multiple file formats (PDF, PNG)", tooltip: "PDF and image export" },
                            { text: "AI content suggestions", tooltip: "Smart content help" },
                            { text: "Priority support", tooltip: "Fast-track support" }
                        ].map((feature, index) => (
                            <li 
                                key={index} 
                                className="flex items-center"
                            >
                                <Check className="h-5 w-5 text-[var(--main-color)] mr-4" />
                                <span 
                                    className={`text-[14px] flex items-center gap-3.5 text-gray-700`}
                                    style={{ fontFamily: 'var(--font-roboto)' }}
                                >
                                    {feature.text}
                                    <ToolTip 
                                        toolTipContent={feature.tooltip}
                                    />
                                </span>
                            </li>
                        ))}
                        </ul>

                        <div className="px-8 w-full">
                            <button 
                                className={`w-full text-[15px] text-white bg-[var(--main-color)] py-3 font-medium border-gray-100 cursor-pointer hover:bg-blue-800 transition-colors`}
                                style={{ fontFamily: 'var(--font-roboto)' }}
                                onClick={() => {
                                    if (!session?.user) {
                                        setShowSignIn(true)
                                        return
                                    }

                                    if (session?.user.plan === "pro") {
                                        router.push("/dashboard")
                                    } else {
                                        handleCheckout()
                                    }
                                }}
                                disabled={paymentLoading}
                            >
                                 {paymentLoading ? (
                                    <LoaderCircle className="animate-spin text-[1.25rem] mx-auto" />
                                    ) : (
                                    session?.user.plan === "pro" ? 
                                        (
                                            "Generate new CV"                 
                                        ) : (
                                            "Upgrade now"
                                        )
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
                {session?.user.plan !== "pro" && (
                    <button 
                        className="text-[0.825rem] text-neutral-500 mt-2 mx-auto flex items-center gap-3 font-[600] cursor-pointer hover:underline"
                        style={{ fontFamily: "var(--font-mono)" }}
                        onClick={() => setCreditsModalActive(true)}
                    >
                        Get extra credits – no plan needed
                        <ArrowRight 
                            width={15}
                            height={15}
                        />
                    </button>
                )}
            </section>
            {/* Templates Section */}
            <section 
                className="px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%] flex flex-col gap-[3.5rem] py-[4.75rem] bg-[var(--main-color)] text-white" 
                id="templates"
            > 
                <div className="flex flex-col gap-7 items-center justify-center text-center">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/5537/5537979.png " 
                        alt="target" 
                        className="w-17 h-17 select-none" 
                    />
                    <h2 className="text-5xl font-[700] max-w-sm">Proven resume templates</h2>
                    <p 
                        className="max-w-md leading-[26px] text-neutral-200 text-[0.95rem]"
                        style={{ fontFamily: 'var(--font-roboto)' }}

                    >
                        These resume templates are here because they work. Every one is tried and tested on real hiring managers
                    </p>
                </div>
                <div className="h-full w-full relative">
                    <div className="custom-swiper-button-prev text-black bg-blue-400 text-white p-2.5 rounded-full shadow absolute top-1/2 left-0 xl:-left-24 z-10 cursor-pointer">
                        <ChevronLeft 
                            width={29}
                            height={29}
                        />
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        className="w-full"
                        autoplay={{
                            delay: 9500,
                            disableOnInteraction: false,
                        }}
                        grabCursor={true}
                        navigation={{
                            nextEl: '.custom-swiper-button-next',
                            prevEl: '.custom-swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true
                        }}
                        breakpoints={{
                            0: {
                              slidesPerView: 1,
                            },
                            1000: {
                              slidesPerView: 3,
                            },
                          }}
                        scrollbar={{ draggable: true }}
                        loop={true} 
                    >
                        {templates.map((template) => (
                            <SwiperSlide
                                key={template.id}
                                className="flex flex-col gap-2.5 relative"
                            >
                                <img 
                                    src={template.thumbnail} 
                                    alt={template.title} 
                                    className="h-full max-h-[650px] lg:max-w-[100%] mx-auto select-none" 
                                />
                                {template.pro && (
                                    <div className="px-4 py-2 font-[500] text-sm rounded-[0.5rem] absolute top-4 right-4 bg-[var(--main-color)] text-white flex items-center gap-2.5">
                                        <Crown 
                                            width={15}
                                            height={15}
                                        />
                                        Pro
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>   
                    <div className="custom-swiper-button-next text-black bg-blue-400 text-white p-2.5 rounded-full shadow absolute top-1/2 right-0 xl:-right-24 z-10 cursor-pointer">
                        <ChevronRight 
                            width={29}
                            height={29}
                        />
                    </div>
                </div>                         
            </section>
            {/* FAQ Section */}
            <section
                id="faq" 
                className="py-[3rem] md:py-[6.35rem] bg-white overflow-hidden px-[2%] md:px-[5%] lg:px-[7%] xl:px-[14%]"
            >
                <div className="flex items-center justify-center text-center w-full max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center gap-5 w-full">
                        <div className="flex flex-col gap-2.5">
                            <h1 className="xl:max-w-lg mx-auto text-[50px] xl:text-[60px] font-[700] leading-[62px] text-neutral-700">Frequently Asked Questions</h1>
                            <p 
                                className="max-w-[520px] mx-auto leading-[28px] text-neutral-600 text-[0.945rem] mt-3.5"
                                style={{ fontFamily: 'var(--font-roboto)' }}

                            >
                                Have questions? We’ve got answers. Explore our most frequently asked questions below to find what you’re looking for
                            </p>
                        </div>
                        <dl className="space-y-[1rem] divide-y divide-gray-200 w-full text-start mt-3.5">
                            {faqs.map((faq, index) => (
                                <div key={index} className="pt-3 pb-6.5">
                                    <dt className="text-lg ">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="cursor-pointer text-left w-full flex justify-between items-start text-gray-400"
                                        >
                                        <span className="font-medium text-gray-900 hover:text-[var(--main-color)]">{faq.question}</span>
                                        <span className="ml-6 h-7 flex items-center">
                                            {openFaqIndex === index ? (
                                                <Minus className="h-6 w-6 text-[var(--main-color)]" />
                                            ) : (
                                                <Plus className="h-6 w-6 text-[var(--main-color)]" />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {openFaqIndex === index && (
                                    <dd className="mt-3.5 pr-12">
                                        <p 
                                            className="text-[0.9rem] text-gray-500 leading-[24px]"
                                            style={{ fontFamily: 'var(--font-roboto)' }}
                                        >
                                            {faq.answer}
                                        </p>
                                    </dd>
                                )}
                                </div>
                            ))}
                        </dl>
                        <p 
                            className="text-[0.8rem] text-neutral-500 mt-3 font-[600]"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Can’t find what you need yet? — {' '}
                            <a 
                                href="mailto:noreply@cvbuilder.monster" 
                                className="text-[var(--main-color)]"
                            >
                                Contact our support team
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            {/* Purchase credits modal */}
            {(session?.user.plan !== "pro") && (
                <CreditsPurchase
                    creditsModalActive={creditsModalActive}
                    setCreditsModalActive={setCreditsModalActive}
                    creditsPaymentLoading={creditsPaymentLoading}
                    setCreditsPaymentLoading={setCreditsPaymentLoading}
                />
            )} 
            {/* Footer */}
            <Footer padx="px-[1.25rem] md:px-[5%] lg:px-[7%] xl:px-[14%]" />
        </>
    )
}