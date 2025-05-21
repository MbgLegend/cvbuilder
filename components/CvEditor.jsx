"use client"

import { ArrowLeft, ArrowRight, ChevronRight, Download, Image as ImageIcon, Loader, PaintBucket, Save } from "lucide-react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { useRouter } from "next/navigation"
import Details from "./Editor/Details"
import Summary from "./Editor/Summary"
import Experience from "./Editor/Experience"
import { useEffect, useRef, useState } from "react"
import Education from "./Editor/Education"
import Skills from "./Editor/Skills"
import { toast } from "react-toastify"
import CvDownload from "./modals/CvDownload"
import CvTheme from "./modals/CvTheme"
import RenderCV from "./RenderCv"

const photoWillBeDisplayed = ["creative", "executive", 'pinnacle']

export default function CvEditor({ cvId, cv, CV_STEPS, step }) {
    const router = useRouter()
    const [form, setForm] = useState({...cv.data})
    const [cvTemplate, setCvTemplate] = useState(cv.template)
    const [updatingCv, setUpdatingCv] = useState(false)
    const [generatingSummary, setGeneratingSummary] = useState(false)
    const [downloadModalActive, setDownloadModalActive] = useState(false)
    const [themeModalActive, setThemeModalActive] = useState(false)
    const [header, setHeader] = useState({
        title: '',
        description: ''
    })
    // better ux
    const printRef = useRef(null)
    const editorRef = useRef(null)
    const prevExperienceLength = useRef(form.experience?.length || 0)
    const prevEducationLength = useRef(form.education?.length || 0)
    const detailsRef = useRef(null)
    const summaryRef = useRef(null)
    const experienceRef = useRef(null)
    const educationRef = useRef(null)
    const skillsRef = useRef(null)

    const handleCvUpdate = async () => {
        if (updatingCv || generatingSummary) return

        setUpdatingCv(true)
        try {
            const response = await fetch("/api/user/cv", {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: cvId,
                    data: {
                        ...form
                    },
                    template: cvTemplate
                })    
            })
            const { error } = await response.json()
            console.log(error)
            if (error) {
                toast.error(error)
            } else {
                toast.success("All updates saved successfully")
            }
            setUpdatingCv(false)
        } catch (error) {
            console.log("Error at handleCvUpdate:", error.message)
            setUpdatingCv(false)
            toast.error("Could not save all changes")
        }
    }

    const handleSummaryGeneration = async () => {
        if (generatingSummary || updatingCv) return
        
        setGeneratingSummary(true)
        try {
            const response = await fetch("/api/user/cv/ai/summary", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: form.firstName, 
                    lastName: form.lastName, 
                    jobTitle: form.jobTitle, 
                    Country: form.country, 
                    City: form.city, 
                    Phone: form.phone, 
                    Email : form.email
                })    
            })
            const { summary, error } = await response.json()
            if (error) {
                toast.error(error)
            } else {
                toast.success("AI summary generated")
                setForm({
                    ...form,
                    summary
                })
            }
            setGeneratingSummary(false)
        } catch (error) {
            console.log("Error at handleSummaryGeneration:", error.message)
            setGeneratingSummary(false)
        }
    }

    const handleNextStep = () => {
        const currentIndex = CV_STEPS.indexOf(step)
        if (currentIndex < CV_STEPS.length - 1) {
            const nextStep = CV_STEPS[currentIndex + 1]
            router.push(`/dashboard/cv?cvId=${cvId}&step=${nextStep}`)
        }
    }

    const handlePreviousStep = () => {
        const currentIndex = CV_STEPS.indexOf(step)
        if (currentIndex > 0) {
            const previousStep = CV_STEPS[currentIndex - 1]
            router.push(`/dashboard/cv?cvId=${cvId}&step=${previousStep}`)
        }
    }

    const renderEditor = () => {
        switch (step) {
            case "Details":
                return <Details 
                    cvId={cvId} 
                    form={form} 
                    setForm={setForm} 
                    handleCvUpdate={handleCvUpdate}
                    updatingCv={updatingCv}
                    showCvPhotoInput={
                        photoWillBeDisplayed.includes(cvTemplate)
                    }
                />
            case "Summary":
                return <Summary 
                    cvId={cvId}
                    form={form} 
                    setForm={setForm}
                    handleCvUpdate={handleCvUpdate}
                    updatingCv={updatingCv}
                    handleSummaryGeneration={handleSummaryGeneration}
                    generatingSummary={generatingSummary}
                />
            case "Experience":
                return <Experience 
                    cvId={cvId}
                    form={form} 
                    setForm={setForm}
                    handleCvUpdate={handleCvUpdate}
                    updatingCv={updatingCv}
                    editorRef={editorRef}
                />
            case "Education":
                return <Education 
                    form={form}
                    setForm={setForm}
                    updatingCv={updatingCv}
                    editorRef={editorRef}
                />
            case "Skills":
                return <Skills 
                    form={form}
                    setForm={setForm}
                    editorRef={editorRef}
                />
            default:
                router.push(`/dashboard/cv?cvId=${cvId}&step=Details`)
                break
        }
    }

    useEffect(() => {
        const headers = {
            Details: {
                title: 'Personal Information',
                description: 'Provide essential details such as contact information, location, and professional profiles.',
                ref: detailsRef
            },
            Summary: {
                title: 'Professional Summary',
                description: 'Highlight key skills, accomplishments, and career objectives concisely.',
                ref: summaryRef
            },
            Experience: {
                title: 'Work Experience',
                description: 'Detail your professional history, including job titles, companies, dates, and key responsibilities.',
                ref: experienceRef
            },
            Education: {
                title: 'Education Background',
                description: 'Outline your academic achievements, degrees earned, institutions attended, and relevant coursework.',
                ref: educationRef
            },
            Skills: {
                title: 'Technical & Soft Skills',
                description: 'List your technical and soft skills relevant to the job role, such as programming, or problem-solving.',
                ref: skillsRef
            }     
        }

        if (headers[step]) {
            setHeader(headers[step])

            const refCurrent = headers[step].ref?.current
            if (refCurrent && printRef?.current) {
                printRef.current.scrollTo({
                    top: refCurrent.offsetTop,
                    behavior: 'smooth'
                })
            }    
        } else {
            router.push(`/dashboard/cv?cvId=${cvId}&step=Details`)
        }
    }, [step])

    useEffect(() => {
        const currentLength = form.experience?.length || 0
    
        if (currentLength > prevExperienceLength.current && editorRef.current) {
          editorRef.current.scrollTop = editorRef.current.scrollHeight
        }
        prevExperienceLength.current = currentLength
    }, [form.experience])

    useEffect(() => {
        const currentLength = form.education?.length || 0
    
        if (currentLength > prevEducationLength.current && editorRef.current) {
          editorRef.current.scrollTop = editorRef.current.scrollHeight
        }
        prevEducationLength.current = currentLength
    }, [form.education])

    return (
        <>
            {/* Navbar */}
            <Navbar padx="px-[2%] md:px-[4%] lg:px-[5%]" />
            {/* CV Editor */}
            <section className="grid grid-cols-1 xl:grid-cols-2 items-strech min-h-[calc(100vh-55px)]">
                <div className="h-full border-b">
                    <div className="flex items-center gap-2 border-b px-[4%] xl:pl-[10.5%] overflow-x-auto overflow-y-hidden h-14">
                        {CV_STEPS.map((cv_step) => (
                            <button 
                                className={`text-[0.85rem] cursor-pointer flex items-start gap-2.5 hover:text-black font-[500]
                                    ${step === cv_step ? 'text-black ' : 'text-neutral-400'}
                                `}
                                key={`cv-editor-${cv_step}`}
                                onClick={() => router.push(`/dashboard/cv?cvId=${cvId}&step=${cv_step}`)}
                            >
                                {cv_step}
                                <ChevronRight 
                                    className="ml-2" 
                                    width={14} 
                                    style={{ visibility: CV_STEPS[CV_STEPS.length-1] !== cv_step ? 'visible' : 'hidden' }}
                                />
                            </button>
                        ))}
                    </div>
                    <main className="flex flex-col gap-5 py-[0.85rem] xl:max-h-[calc(100vh-64px-65px-55px)] overflow-y-auto no-scrollbar" ref={editorRef}>
                        <div className="border-b px-[4%] xl:pl-[10.5%] pb-6 flex flex-col">
                            <h1 className="text-2xl font-bold">{header.title}</h1>
                            <p className="text-sm text-neutral-500">{header.description}</p>
                            <div className="flex items-center gap-3.5 mt-1.5">
                                <button
                                    className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                                    onClick={() => setThemeModalActive(true)}
                                >
                                    <PaintBucket 
                                        width={16}
                                        height={16}
                                    />
                                    Change Theme
                                </button>
                                <button
                                    className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                                    onClick={() => {
                                        setDownloadModalActive(true)
                                    }}
                                >
                                    <Download 
                                        width={16}
                                        height={16}
                                    />
                                    Download
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 px-[4%] xl:pl-[10.5%]">
                            {renderEditor()}
                        </div>
                    </main>
                    <div className="md:h-[65px] px-[4%] xl:pl-[10.5%] pb-3.5 md:pb-0 flex items-center">
                        <div className="flex gap-3 items-strech w-full justify-end">
                            {step !== "Details" && (
                                <button 
                                    className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.825rem] cursor-pointer px-5 py-2.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10"
                                    type="button"
                                    onClick={handlePreviousStep}
                                >
                                    <ArrowLeft
                                        width={18}
                                        height={18}
                                    />
                                    Back
                                </button>
                            )}
                            <button
                                type="button"
                                className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.825rem] cursor-pointer px-5 py-2.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10"
                                onClick={handleCvUpdate}
                            >
                                {updatingCv ? (
                                    <Loader
                                        className="animate-spin mx-auto" 
                                        width={18}
                                        height={18} 
                                    />
                                ) : (
                                    <>
                                        <Save 
                                            width={18}
                                            height={18} 
                                        />
                                        <span className="hidden md:inline-block">Save Progress</span>
                                    </>
                                )}
                            </button>
                            {step !== "Skills" ? (
                                <button
                                    type="button"
                                    className="flex items-center gap-2.5 bg-[var(--main-color)] text-neutral-50 text-[0.825rem] cursor-pointer px-5 py-2.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/90"
                                    onClick={handleNextStep}
                                >
                                    Next Step
                                    <ArrowRight 
                                        width={18}
                                        height={18} 
                                    />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="flex items-center gap-2.5 bg-[var(--main-color)] text-neutral-50 text-[0.825rem] cursor-pointer px-5 py-2.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/90 w-fit"
                                    onClick={() => setDownloadModalActive(true)}
                                >
                                    Download
                                    <Download 
                                        className="ml-2"
                                        width={18}
                                        height={18} 
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <aside className="bg-neutral-100/50 border py-3 h-full px-[4%] xl:pr-[10.5%] overflow-x-auto overflow-y-auto max-h-[calc(100vh-55px)] relative">
                   <RenderCV 
                        cvTemplate={cvTemplate}
                        form={form}
                        printRef={printRef}
                        detailsRef={detailsRef}
                        summaryRef={summaryRef}
                        experienceRef={experienceRef}
                        educationRef={educationRef}
                        skillsRef={skillsRef}
                    />
                </aside>
            </section>
            {/* Theme Modal */}
            <CvTheme 
                themeModalActive={themeModalActive}
                setThemeModalActive={setThemeModalActive}
                cvTemplate={cvTemplate}
                form={form}
                setForm={setForm}
                setCvTemplate={setCvTemplate}
            />
            {/* Download Modal */}
            <CvDownload 
                downloadModalActive={downloadModalActive}
                setDownloadModalActive={setDownloadModalActive}
                printRef={printRef}
            />
            {/* Footer */}
            <Footer padx="px-[1.25rem] md:px-[4%] lg:px-[5%]" />
        </>
    )
}