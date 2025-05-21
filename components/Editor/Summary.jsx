"use client"

import { Brain, ChevronRight, Loader, Save } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
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
import TextEditor from "../TextEditor"
import ToolTip from "../ToolTip"

export default function Summary({ form, setForm, generatingSummary, handleSummaryGeneration }) {
    const { data:session } = useSession()
    const textareaRef = useRef(null)

    useEffect(() => {
        const textarea = textareaRef?.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [form.summary])

    return (
        <>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <label 
                            htmlFor="summary" 
                            className="text-sm font-[500]"
                        >
                            Professional Summary
                        </label>
                        <ToolTip 
                            toolTipContent="Include skills, tools, languages"
                        />
                    </div>
                    {session?.user.plan === "pro" && (
                        <button 
                            className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10"
                            onClick={handleSummaryGeneration}
                        >
                            {generatingSummary ? (
                                <>
                                    <Loader width={15} height={15} className="animate-spin" />
                                    Generating summary...
                                </>
                            ) : (
                                <>
                                    <Brain width={15} height={15}/>
                                    Generate using AI
                                </>
                            )}
                        </button>
                    )}
                </div>
                <TextEditor 
                    height={180}
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                />
            </div>
            {/* Tips Section */}
            <div className="bg-[var(--main-color)]/5 rounded-lg p-4 border border-[var(--main-color)]/20">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Writing Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Keep it concise and focused on your key strengths
                </li>
                <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Highlight your most relevant achievements
                </li>
                <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Tailor it to your target role or industry
                </li>
                </ul>
            </div>
        </>
    )
}