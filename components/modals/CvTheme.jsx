"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { templates } from "@/public/assets"
import { DialogOverlay } from "@radix-ui/react-dialog"
import { CircleCheckBig } from "lucide-react"
import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useSession } from "next-auth/react"
import RenderCV from "../RenderCv"
import { fonts } from "@/public/assets"

const ThemeCard = ({ template, cvTemplate, setCvTemplate }) => {
    const [isImgLoaded, setIsImgLoaded] = useState(false)

    return (
        <div 
            className="w-full h-full border-3 rounded-[0.5rem] cursor-pointer flex justify-center"  
            style={cvTemplate === template.id ? { borderColor: "var(--main-color)" } : {  }}
            onClick={() => {
                setCvTemplate(template.id)
            }}
        >
            <img 
                src={template.preview}
                alt={template.title}
                onLoad={() => setIsImgLoaded(true)}
                style={{ display: isImgLoaded ? 'inline-block' : 'none' }}
                className="aspect-[1/1.125] rounded-[0.5rem]"
            />
            <div 
                className="aspect-[1/1.125] w-full bg-neutral-50"
                style={{ display: isImgLoaded ? 'none' : 'block' }}
            />
        </div>
    )
}

const CvTheme = ({ themeModalActive, setThemeModalActive, cvTemplate, form, setForm, setCvTemplate }) => {
    const { data:session } = useSession()
    const [activeSection, setActiveSection] = useState("templates")

    const renderSection = () => {
        switch (activeSection) {
            case "templates":
                return (
                    <div className="flex flex-col gap-8.5">
                        <div className="flex flex-col gap-0.5">
                            <h2
                                className="text-[1.125rem] font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                CV Template
                            </h2>
                            <p 
                                className="text-[0.725rem] font-[500] text-muted-foreground leading-snug"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Pick a layout that reflects your profession and personal style
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {templates.map((template) => (
                                <ThemeCard 
                                    template={template}
                                    cvTemplate={cvTemplate}
                                    setCvTemplate={setCvTemplate}
                                    key={template.id}
                                />
                            ))}
                        </div>
                    </div>
                )

            case "colors":
                return (
                    <div className="flex flex-col gap-8.5">
                        <div className="flex flex-col gap-0.5">
                            <h2
                                className="text-[1.125rem] font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Color Theme
                            </h2>
                            <p 
                                className="text-[0.725rem] font-[500] text-muted-foreground leading-snug"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Customize your CV’s primary and text colors to match your personality
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
                            <div className="flex flex-col gap-3.5 border rounded-[0.5rem] p-3.5 shadow-lg">
                                <div className="flex items-center justify-between gap-3.5"  style={{ fontFamily: "var(--font-mono)" }}>
                                    <h3 
                                        className="font-[600] text-[0.85rem]"
                                    >
                                        Primary Color
                                    </h3>
                                    <span className="font-[600] text-[0.875rem]">{form.colors.primary}</span>
                                </div>
                                <HexColorPicker
                                    color={form.colors.primary}
                                    style={{ width: "100%", height: "265px" }}
                                    onChange={(newColor) => setForm({
                                        ...form,
                                        colors: { ...form.colors, primary: newColor } 
                                    })}
                                />
                            </div>
                            {session?.user.plan === "pro" && (
                                <>
                                    <div className="flex flex-col gap-3.5 border rounded-[0.5rem] p-3.5 shadow-lg">
                                        <div className="flex items-center justify-between gap-3.5"  style={{ fontFamily: "var(--font-mono)" }}>
                                            <h3 className="font-[600] text-[0.85rem]" style={{ fontFamily: "var(--font-mono)" }}>
                                                Text (Body) Color
                                            </h3>
                                            <span className="font-[600] text-[0.875rem]">{form.colors.body}</span>
                                        </div>
                                        <HexColorPicker
                                            color={form.colors.body}
                                            style={{ width: "100%", height: "265px" }}
                                            onChange={(newColor) => setForm({
                                                ...form,
                                                colors: { ...form.colors, body: newColor } 
                                            })}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3.5 border rounded-[0.5rem] p-3.5 shadow-lg">
                                        <div className="flex items-center justify-between gap-3.5"  style={{ fontFamily: "var(--font-mono)" }}>
                                            <h3 className="font-[600] text-[0.85rem]" style={{ fontFamily: "var(--font-mono)" }}>
                                                Background Color
                                            </h3>
                                            <span className="font-[600] text-[0.875rem]">{form.colors.background}</span>
                                        </div>
                                        <HexColorPicker
                                            color={form.colors.background}
                                            style={{ width: "100%", height: "265px" }}
                                            onChange={(newColor) => setForm({
                                                ...form,
                                                colors: { ...form.colors, background: newColor } 
                                            })}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="flex flex-col gap-3.5 border rounded-[0.5rem] p-3.5 shadow-lg">
                                <div className="flex items-center justify-between gap-3.5"  style={{ fontFamily: "var(--font-mono)" }}>
                                    <h3 
                                        className="font-[600] text-[0.85rem]"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        Line Accent Color
                                    </h3>
                                    <span className="font-[600] text-[0.875rem]">{form.colors.background}</span>
                                </div>
                                <HexColorPicker
                                    color={form.colors.line}
                                    style={{ width: "100%", height: "265px" }}
                                    onChange={(newColor) => setForm({
                                        ...form,
                                        colors: { ...form.colors, line: newColor } 
                                    })}
                                />
                            </div>
                        </div>    
                    </div>
                    
                )

            case "fonts":
                return (
                    <div className="flex flex-col gap-8.5">
                        <div className="flex flex-col gap-0.5">
                            <h2
                                className="text-[1.125rem] font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Font Style
                            </h2>
                            <p 
                                className="text-[0.725rem] font-[500] text-muted-foreground leading-snug"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Personalize your CV's font style to reflect your unique look and feel
                            </p>
                        </div>
                        <div className="flex flex-col gap-5.5">
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem]"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    Font Family
                                </h3>
                                <hr />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {fonts.map((font) => (
                                        <button
                                            className="border-2 rounded-[0.5rem] px-3 py-2 font-[500] text-[0.925rem] cursor-pointer hover:border-black"
                                            style={{ 
                                                fontFamily: font.fontFamily,
                                                borderColor: font.fontFamily === form.text.font ? "black" : ""
                                            }}
                                            key={font.label}
                                            onClick={() => setForm({
                                                ...form,
                                                text: { ...form.text, font: font.fontFamily } 
                                            })}
                                        >
                                            {font.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem] flex items-center justify-between"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <span>Header / Name</span>
                                    <span>{form.text.header}px</span>
                                </h3>
                                <hr />
                                <input 
                                    type="range"
                                    min={15}
                                    max={50}
                                    className="mt-2.5"
                                    value={form.text.header}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            text: { ...form.text, header: Number(e.target.value) } 
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem] flex items-center justify-between"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <span>Section Titles (e.g., Experience, Education)</span>
                                    <span>{form.text.section}px</span>
                                </h3>
                                <hr />
                                <input 
                                    type="range"
                                    min={8}
                                    max={35}
                                    className="mt-2.5"
                                    value={form.text.section}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            text: { ...form.text, section: Number(e.target.value) } 
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem] flex items-center justify-between"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <span>Subtitles (e.g., Job Title, School Name)</span>
                                    <span>{form.text.subtitles}px</span>
                                </h3>
                                <hr />
                                <input 
                                    type="range"
                                    min={8}
                                    max={25}
                                    className="mt-2.5"
                                    value={form.text.subtitles}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            text: { ...form.text, subtitles: Number(e.target.value) } 
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem] flex items-center justify-between"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <span>Body Text</span>
                                    <span>{form.text.body}px</span>
                                </h3>
                                <hr />
                                <input 
                                    type="range"
                                    min={7}
                                    max={20}
                                    className="mt-2.5"
                                    value={form.text.body}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            text: { ...form.text, body: Number(e.target.value) } 
                                        })
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 
                                    className="font-[600] text-[0.9rem] flex items-center justify-between"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    <span>Date/Location</span>
                                    <span>{form.text.date}px</span>
                                </h3>
                                <hr />
                                <input 
                                    type="range"
                                    min={6}
                                    max={18}
                                    className="mt-2.5"
                                    value={form.text.date}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            text: { ...form.text, date: Number(e.target.value) } 
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
        
            default:
                break
        }
    }

    return (
        <Dialog open={themeModalActive} onOpenChange={setThemeModalActive}>
            <DialogOverlay className="fixed inset-0 z-[1] backdrop-blur-[3px]" />
            <DialogContent className="!w-[95%] md:!w-[92%] !max-w-[100%] md:mx-auto bg-white rounded-lg shadow-lg !p-0 !animate-none !border-0 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !overflow-y-auto h-full max-h-[92vh] flex flex-col">
                <DialogHeader className="px-4 md:px-8 py-4.5 rounded-tr-lg rounded-tl-lg relative z-10 border-b h-fit">
                    <DialogTitle className="hidden">Change Theme</DialogTitle>
                    <h1 className="text-2xl font-[600]">Change Theme</h1>
                </DialogHeader>
                <div className="flex flex-col items-start gap-3.5 py-3.5 px-4 md:px-8 h-full w-full xl:overflow-y-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-strech lg:justify-between gap-3 w-full">
                        <div className="flex items-center gap-6">
                            <button 
                                className="w-[110px] text-[0.815rem] cursor-pointer text-[var(--main-color)] hover:text-[var(--main-color)]/75 font-[600] pb-3.5"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    borderBottom: activeSection === "templates" 
                                      ? "2px solid #1e54c2" 
                                      : "2px solid transparent"
                                }}
                                onClick={() => setActiveSection("templates")}
                            >
                                Templates   
                            </button>
                            <button 
                                className="w-[110px] text-[0.815rem] cursor-pointer text-[var(--main-color)] hover:text-[var(--main-color)]/75 font-[600] pb-3.5"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    borderBottom: activeSection === "colors" 
                                    ? "2px solid #1e54c2" 
                                    : "2px solid transparent"
                                }}
                                onClick={() => setActiveSection("colors")}
                            >
                                Color Theme
                            </button>
                            {session?.user.plan === "pro" && (
                                <button 
                                    className="w-[110px] text-[0.815rem] cursor-pointer text-[var(--main-color)] hover:text-[var(--main-color)]/75 font-[600] pb-3.5"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        borderBottom: activeSection === "fonts" 
                                        ? "2px solid #1e54c2" 
                                        : "2px solid transparent"
                                    }}
                                    onClick={() => setActiveSection("fonts")}
                                >
                                    Text Styling
                                </button>
                            )}
                        </div>
                        <div className="flex items-strech gap-3.5 h-full">
                            <button
                                className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                                onClick={() => setThemeModalActive(false)}
                            >
                                <CircleCheckBig 
                                    width={16}
                                    height={16}
                                />
                                Done
                            </button>
                        </div>
                    </div>
                    <article className="flex flex-col xl:flex-row items-start gap-6.5 flex-1 mt-3.5 w-full xl:overflow-hidden">
                        <div className="w-full xl:max-w-[550px] overflow-y-visible xl:overflow-y-auto xl:max-h-[70vh] no-scrollbar">
                            {renderSection()}
                        </div>
                        <div className="w-full flex justify-center items-start bg-neutral-100/50 border rounded-[0.5rem] h-full overflow-y-auto xl:max-h-[80vh] no-scrollbar">
                            <RenderCV 
                                cvTemplate={cvTemplate}
                                form={form}
                            />
                        </div>
                    </article>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CvTheme