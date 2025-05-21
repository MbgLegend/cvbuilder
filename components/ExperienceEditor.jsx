"use client"

import { useSession } from "next-auth/react"
import Input from "./Input"
import { Brain, CheckCircle2, Loader, Plus, Trash } from "lucide-react"
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar,
} from'react-simple-wysiwyg'
import countries from "world-countries"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import TextEditor from "./TextEditor"

const AutocompleteSearch = dynamic(() => import('./Select'), {
    ssr: false,
})

const countryOptions = countries.map((country) => ({
    value: country.name.common,
    label: country.name.common,
    icon: (
        <img
            src={`https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`}
            alt={country.name.common}
            className="w-5 h-4 rounded-sm"
        />
    )
}))

export default function ExperienceEditor({ form, setForm, data, removeBtn, index, updatingCv, editorRef }) {
    const { data:session } = useSession()
    const [generatingSummary, setGeneratingSummary] = useState(false)
    const [generationError, setGenerationError] = useState(false)
    const [generatingSuccess, setGeneratingSuccess] = useState(false)

     useEffect(() => {
        if (generationError || generatingSuccess) {
            setTimeout(() => {
                setGenerationError(null)
                setGeneratingSuccess(null)
            }, [4000])
        }
    }, [generationError, generatingSuccess])

    const handleSummaryGeneration = async () => {
        if (generatingSummary || updatingCv) return
        
        setGeneratingSummary(true)
        try {
            const response = await fetch("/api/user/cv/ai/experience", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city: data.city,
                    companyName: data.companyName,
                    endDate: data.endDate,
                    positionTitle: data.positionTitle,
                    startDate: data.startDate,
                    state: data.state
                })    
            })
            const { summary, error } = await response.json()
            if (error) {
                setGenerationError(error)
            } else {
                setGeneratingSuccess("AI summary generated successfully")
                const updatedExperience = [...form.experience]
                updatedExperience[index] = {
                    ...updatedExperience[index],
                    summary
                }
            
                setForm({
                    ...form,
                    experience: updatedExperience
                })
            }
            setGeneratingSummary(false)
        } catch (error) {
            console.log("Error at handleSummaryGeneration:", error.message)
            setGeneratingSummary(false)
            setGenerationError(error.message)
        }
    }

    return (
        <div className="border border-t-4 border-t-[var(--main-color)] p-5 rounded-lg flex flex-col gap-5 relative">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <Input
                    label="Position Title"
                    type="text"
                    value={data?.positionTitle}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            positionTitle: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}    
                    placeholder="Junior front end web developer"                
                />
                <Input 
                    label="Company Name"
                    type="text"
                    value={data?.companyName}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            companyName: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}    
                    placeholder="LYC clothing"                    
                />
            </div>
            <div className="flex flex-col md:flex-row items-stretch gap-6">
                <div className="flex flex-col gap-2.5 w-full">
                    <label 
                        htmlFor="country" 
                        className="text-sm font-[500]"
                    >
                        Country
                    </label>
                    <AutocompleteSearch 
                        id="country"
                        value={countryOptions.find(opt => opt.value === data?.city)}
                        options={countryOptions}
                        onChange={(selectedOption) => {
                            const updatedExperience = [...form.experience]
                            updatedExperience[index] = {
                                ...updatedExperience[index],
                                city: selectedOption.value
                            }
                            setForm({
                                ...form,
                                experience: updatedExperience
                            })
                        }}          
                        placeholder="USA"              
                    />
                </div>
                <Input 
                    label="City"
                    type="text"
                    value={data?.state}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            state: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}          
                    placeholder="New York"    
                />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
                <Input
                    label="Start Date"
                    type="date"
                    value={data?.startDate}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            startDate: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}     
                />
                <Input 
                    label="End Date"
                    type="date"
                    value={data?.endDate}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            endDate: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}     
                />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center justify-between gap-4">
                    <label 
                        htmlFor="summary" 
                        className="text-sm font-[500]"
                    >
                        Professional Summary
                    </label>
                    {session?.user.plan === "pro" && (
                        <button 
                            className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10"
                            onClick={handleSummaryGeneration}
                            disabled={generatingSummary}
                        >
                            {generatingSummary ? (
                                <>
                                    <Loader width={15} height={15} className="animate-spin" />
                                    Generating summary...
                                </>
                            ) : (
                                <>
                                    <Brain width={15} height={15} />
                                    Generate using AI
                                </>
                            )}
                        </button>
                    )}
                </div>
                <TextEditor 
                    height={125}
                    value={data?.summary}
                    onChange={(e) => {
                        const updatedExperience = [...form.experience]
                        updatedExperience[index] = {
                            ...updatedExperience[index],
                            summary: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            experience: updatedExperience
                        })
                    }}
                />
            </div>
            {removeBtn && (
                <button 
                    className="cursor-pointer text-red-500 absolute top-4 right-4"
                    onClick={() => {
                        const filteredArray = form.experience?.filter((currentForm, currentIndex) => currentIndex !== index)
                        setForm({
                            ...form,
                            experience: filteredArray
                        })
                    }}
                >
                    <Trash width={16} height={16} />
                </button>
            )}
        </div>
    )
}