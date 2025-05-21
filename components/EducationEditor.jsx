"use client"

import { Plus, Trash } from "lucide-react"
import Input from "./Input"
import dynamic from "next/dynamic"
import TextEditor from "./TextEditor"

const degreeOptions = [
    { label: "High School Diploma", value: "High School Diploma" },
    { label: "GED (General Educational Development)", value: "GED (General Educational Development)" },
    { label: "Associate Degree (AA, AS, AAS)", value: "Associate Degree" },
    { label: "Bachelor's Degree (BA, BS, BFA, BBA)", value: "Bachelor's Degree" },
    { label: "Master's Degree (MA, MS, MBA, MFA, MEd, etc.)", value: "Master's Degree" },
    { label: "Doctorate Degree (Ph.D., Ed.D., DBA, etc.)", value: "Doctorate Degree" },
    { label: "Professional Degrees (MD, JD, DDS, DVM, etc.)", value: "Professional Degrees" },
    { label: "Certificate Program", value: "Certificate Program" },
    { label: "Diploma Programs (usually technical or vocational)", value: "Diploma Programs" },
    { label: "Trade School Certification", value: "Trade School Certification" },
    { label: "Vocational Training Certificate", value: "Vocational Training Certificate" },
    { label: "Postgraduate Certificate or Diploma", value: "Postgraduate Certificate or Diploma" },
    { label: "Online Course Completion Certificate (e.g., Coursera, edX, Udemy)", value: "Online Course Completion Certificate" },
    { label: "Bootcamp Certificate (e.g., coding bootcamps)", value: "Bootcamp Certificate" },
    { label: "Continuing Education Units (CEUs)", value: "Continuing Education Units" },
    { label: "Licensure or Accreditation (e.g., CPA, PMP, RN, etc.)", value: "Licensure or Accreditation" }
]  

const AutocompleteSearch = dynamic(() => import('./Select'), {
    ssr: false,
})

export default function EducationEditor({ form, setForm, data, index, removeBtn }) {
    return (
        <div className="border border-t-4 border-t-[var(--main-color)] p-5 rounded-lg flex flex-col gap-5 relative">
             <div className="flex flex-col gap-2.5 w-full">
                    <label 
                        htmlFor="degree" 
                        className="text-sm font-[500]"
                    >
                        Degree
                    </label>
                    <AutocompleteSearch 
                        id="degree"
                        value={degreeOptions.find(opt => opt.value === data?.degree)}
                        options={degreeOptions}
                        onChange={(selectedOption) => {
                            const updatedEducation = [...form.education]
                            updatedEducation[index] = {
                                ...updatedEducation[index],
                                degree: selectedOption.value
                            }
                            setForm({
                                ...form,
                                education: updatedEducation
                            })
                        }}                    
                        placeholder="Bachelor's Degree"    
                    />
                </div>
            <div className="flex flex-col md:flex-row items-strech gap-6">
                <Input 
                    label="Issuing Institution"
                    type="text"
                    value={data?.universtyName}
                    onChange={(e) => {
                        const updatedEducation = [...form.education]
                        updatedEducation[index] = {
                            ...updatedEducation[index],
                            universtyName: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            education: updatedEducation
                        })
                    }}   
                    tooltip={true}
                    toolTipContent="Universty, bootcamp, etc..."
                    placeholder="Stanford University"    
                />
                <Input 
                    label="Field of Study"
                    type="text"
                    value={data?.major}
                    onChange={(e) => {
                        const updatedEducation = [...form.education]
                        updatedEducation[index] = {
                            ...updatedEducation[index],
                            major: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            education: updatedEducation
                        })
                    }}   
                    tooltip={true}
                    toolTipContent="Computer science, Computer Engineering etc..."
                    placeholder="Computer science"    
                />
            </div>
            <div className="flex flex-col md:flex-row items-strech gap-6">
                <Input 
                    label="Start date"
                    type="date"
                    value={data?.startDate}
                    onChange={(e) => {
                        const updatedEducation = [...form.education]
                        updatedEducation[index] = {
                            ...updatedEducation[index],
                            startDate: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            education: updatedEducation
                        })
                    }}   
                />
                <Input 
                    label="End date"
                    type="date"
                    value={data?.endDate}
                    onChange={(e) => {
                        const updatedEducation = [...form.education]
                        updatedEducation[index] = {
                            ...updatedEducation[index],
                            endDate: e.target.value
                        }
                    
                        setForm({
                            ...form,
                            education: updatedEducation
                        })
                    }}   
                />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col gap-2.5 w-full">
                    <label 
                        htmlFor="description" 
                        className="text-sm font-[500]"
                    >
                        Description
                    </label>
                    <TextEditor 
                        height={110}
                        value={data?.description}
                        onChange={(e) => {
                            const updatedEducation = [...form.education]
                            updatedEducation[index] = {
                                ...updatedEducation[index],
                                description: e.target.value
                            }
                        
                            setForm({
                                ...form,
                                education: updatedEducation
                            })
                        }}   
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-3.5">
                {removeBtn && (
                    <button 
                        className="cursor-pointer text-red-500 absolute top-4 right-4"
                        onClick={() => {
                            const filteredArray = form.education?.filter((currentForm, currentIndex) => currentIndex !== index)
                            setForm({
                                ...form,
                                education: filteredArray
                            })
                        }}
                    >
                        <Trash width={16} height={16} />
                    </button>
                )}
            </div>
        </div>
    )
}