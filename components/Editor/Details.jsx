"use client"

import Input from "../Input"
import countries from "world-countries"

import "react-phone-input-2/lib/style.css"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Trash, Upload, User } from "lucide-react"
import ToolTip from "../ToolTip"

const countryOptions = countries.map((country) => ({
    name: country.name.common,
    code: country.cca2.toLowerCase(),
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

const AutocompleteSearch = dynamic(() => import('../Select'), {
    ssr: false,
})

export default function Details({ setForm, form, showCvPhotoInput }) {
    const [isUploadLoading, setIsUploadLoading] = useState(false)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js"
        script.async = true
        document.body.appendChild(script)
    }, [])    

    const openCloudinaryWidget = () => {
        if (!window.cloudinary || isUploadLoading) return
        setIsUploadLoading(true)

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                cropping: true,
                multiple: false,
                folder: "cv-images",
                maxFileSize: 2000000,
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setForm({ ...form, photo: result.info.secure_url })
                } else if (error) {
                    console.error("Upload Widget Error:", error)
                }
            }
        )
    
        setIsUploadLoading(false)
        widget.open()
    }

    return (
        <>
            {showCvPhotoInput && (
                <div className="relative w-fit mx-auto">
                    <div className="relative w-[85px] h-[85px] rounded-[50%] cursor-pointer">
                        <div 
                            className="w-full h-full"
                            onClick={openCloudinaryWidget}
                            disabled={isUploadLoading}
                        >
                            {form?.photo.trim().length > 0 ? (
                                <img 
                                    src={form?.photo}
                                    alt="CV photo" 
                                    className="w-full h-full rounded-[50%] object-cover"
                                />
                            ) : (
                                <>
                                    <div 
                                        className="w-full h-full bg-[var(--main-color)]/10 text-[var(--main-color)] flex items-center justify-center rounded-[50%]"
                                    >
                                        <User 
                                            width={34}
                                            height={34}
                                        />
                                    </div>
                                    <div className="absolute w-[35px] h-[35px] rounded-[50%] bg-[var(--main-color)] absolute right-[-4px] bottom-[-4px] flex items-center justify-center">
                                        <Upload 
                                            className="text-neutral-100"
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        {form?.photo.trim().length > 0 && (
                            <button
                                className="absolute w-[35px] h-[35px] rounded-[50%] bg-red-600 absolute right-[-4px] bottom-[-4px] flex items-center justify-center cursor-pointer"
                                onClick={() => setForm({...form, photo: "" })}
                            >
                                <Trash 
                                    className="text-neutral-100"
                                    width={18}
                                    height={18}
                                />
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row items-start gap-6 mt-1.5">
                {/* First name */}
                <Input 
                    label="First name"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                    placeholder={"John"}
                />
                {/* Last name */}
                <Input 
                    label="Last name"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                    placeholder={"Doe"}
                />
            </div>
            <div className="flex flex-col md:flex-row items-strech gap-6">
                {/* Country */}
                <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex items-center gap-3">
                        <label 
                            htmlFor="Country" 
                            className="text-sm font-[500]"
                        >
                            Country
                        </label>
                        <ToolTip 
                            toolTipContent="Your current country of residence"
                        />
                    </div>
                    <AutocompleteSearch
                        id="Country"
                        value={countryOptions.find(opt => opt.value === form?.country)}
                        options={countryOptions}
                        onChange={(selectedOption) => {
                            setForm({
                                ...form,
                                country: selectedOption.value
                            })
                        }}
                        addIcon={true}      
                        placeholder={"USA"}               
                    />
                </div>
                {/* City */}
                <Input 
                    label="City"
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({...form, city: e.target.value})}
                    tooltip={true}
                    toolTipContent="Your current city of residence"
                    placeholder="New York"
                />
            </div>
            {/* Job title */}
            <Input 
                label="Job title"
                type="text"
                value={form.jobTitle}
                onChange={(e) => setForm({...form, jobTitle: e.target.value})}
                placeholder="Full stack web developer"
            />
            <div className="flex flex-col md:flex-row items-strech gap-6">
                {/* <div className="flex flex-col gap-2.5 w-full">
                    <label 
                        htmlFor="Phone" 
                        className="text-sm font-[500]"
                    >
                        Phone
                    </label>
                    <PhoneInput
                        country={selectedCountryCode}
                        inputStyle={{ 
                            width: "100%", 
                            paddingInline: "8px", 
                            paddingBlock: "6px" , 
                            paddingLeft: "50px", 
                            borderRadius: "6px", 
                            borderColor: 'oklch(0.922 0 0)',
                            fontSize: "0.875rem",
                            maxHeight: "100%",
                            height: "42px"
                        }}
                        value={form.phone}
                        onChange={(phone) => setForm({...form, phone})}
                    />
                </div> */}
                {/* Email */}
                <Input 
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="john@example.com"
                    tooltip={true}
                    toolTipContent="Valid email required"
                />
                {/* Phone */}
                <Input 
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, "")
                        setForm({ ...form, phone: onlyNums })
                    }}
                    placeholder="(264) 839-5387"
                    tooltip={true}
                    toolTipContent="Digits only, no dashes"
                />
            </div>
            <div className="flex flex-col md:flex-row items-strech gap-6">
                {/* Linkedin */}
                <Input 
                    label="Linkedin"
                    type="text"
                    value={form.linkedin}
                    onChange={(e) => setForm({...form, linkedin: e.target.value})}
                    placeholder="https://linkedin.com/username"
                />
                {/* Portfolio */}
                <Input 
                    label="Portfolio"
                    type="text"
                    value={form.portfolio}
                    onChange={(e) => setForm({...form, portfolio: e.target.value})}
                    placeholder="https://yourwebsite.com"
                    tooltip={true}
                    toolTipContent="Recommended for software engineers"
                />
            </div>
        </>
    )
}