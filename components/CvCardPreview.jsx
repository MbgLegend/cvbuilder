"use client"

import { Clock, Download, EllipsisVertical, FilePenLine, FileText, Images, LayoutTemplate, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { format } from "timeago.js"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { useReactToPrint } from "react-to-print"
import domtoimage from 'dom-to-image'
import { useRouter } from "next/navigation"
import RenderCV from "./RenderCv"

const CvCardPreview = ({ cv, setSelectedCvDelete }) => {
    const { data:session } = useSession()
    const containerRef = useRef(null)
    const contentRef = useRef(null)
    const printRef = useRef(null)
    const [scale, setScale] = useState(1)
    const [isHover, setIsHover] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter()
    const reactToPrintFn = useReactToPrint({ 
        contentRef: printRef,
        documentTitle: cv?.title
    })

    useEffect(() => {
        const calculateScale = () => {
            if (containerRef.current && contentRef.current) {
                const containerW = containerRef.current.clientWidth
                const contentW = contentRef.current.offsetWidth
                const widthScale = containerW / contentW

                setScale(widthScale)
            }
        }

        // Wait for DOM to render
        setTimeout(calculateScale, 0)
        window.addEventListener('resize', calculateScale)
        return () => window.removeEventListener('resize', calculateScale)
    }, [])

    const handlePngDownload = async () => {
        const element = printRef?.current

        try {
            const dataUrl = await domtoimage.toPng(element, {
                quality: 1, 
                width: 780, 
                height: element.scrollHeight,
                style: {
                    transform: 'none',
                    overflow: 'visible' 
                },
                scale: 0.25, 
            })
            const link = document.createElement('a')
            link.download = 'CV.png'
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error generating image:', error)
        }
    }

    return (
        <div
            key={`cv-${cv.id}`}
            className="relative bg-[#f4f4f4]/16 rounded-xl border flex flex-col px-3 pt-6 pb-3"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Card Header */}
            <div className="flex flex-col gap-1 w-full ">
                <h2 
                    className="text-[0.9rem] font-[700] text-center" 
                >
                    {cv.title}
                </h2>
                <div className="flex items-center gap-3 justify-center"  style={{ fontFamily: 'var(--font-mono)' }}>
                    <span className="text-[0.8rem] text-neutral-500 flex items-center gap-1.5">
                        <LayoutTemplate width={16} height={16} />
                        {cv.template}
                    </span>
                </div>
                <span 
                    className="flex justify-center items-center text-neutral-500 font-[500] text-[0.75rem] mt-0.5" 
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Modified {format(cv.updatedAt)}
                </span>
            </div>

            {/* CV Preview */}
            <button 
                ref={containerRef}
                className="relative w-full overflow-hidden flex justify-center items-start bg-white cursor-pointer mt-5 border-2 rounded-md text-start"
                style={{ height: '400px' }}
                onClick={() => router.push(`/dashboard/cv?cvId=${cv.id}`)}
            >
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center'
                    }}
                >
                    <div ref={contentRef}>
                        <RenderCV
                            cvTemplate={cv.template}
                            form={cv.data}
                            printRef={printRef}
                        />
                    </div>
                </div>
            </button>
            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`
                            absolute top-[11px] right-[11px] transition-opacity
                            ${(isHover || isDropdownOpen) ? "opacity-100" : "opacity-0 pointer-events-none"}
                        `}
                    >
                    <EllipsisVertical width={18} height={18} className="cursor-pointer" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 right-0 absolute">
                    <DropdownMenuItem
                        onClick={reactToPrintFn}
                    >
                        <FileText />
                        Download as PDF
                    </DropdownMenuItem>
                    {session?.user.plan === "pro" && (  
                        <DropdownMenuItem
                            onClick={handlePngDownload}
                        >
                            <Images />
                            Download as PNG
                        </DropdownMenuItem> 
                    )}
                    <DropdownMenuItem 
                        onClick={() => router.push("/dashboard/cv?cvId="+cv.id)}
                    >
                        <FilePenLine />
                        Edit resume
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className={"text-red-600"}
                        onClick={() => {
                            setSelectedCvDelete({
                                name: cv.title,
                                id: cv.id
                            })}}
                        >
                        <Trash />
                        Delete resume
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CvCardPreview