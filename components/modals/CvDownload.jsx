import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Description, DialogOverlay } from "@radix-ui/react-dialog"
import { Download, File, ImageIcon, Info } from "lucide-react"
import { useSession } from "next-auth/react"
import { useReactToPrint } from "react-to-print"
import { toast } from "react-toastify"
import domtoimage from 'dom-to-image'

const CvDownload = ({ downloadModalActive, setDownloadModalActive, printRef }) => {
    const { data:session } = useSession()
    const reactToPrintFn = useReactToPrint({ 
        contentRef: printRef,
        documentTitle: "CV",
        onAfterPrint: () => {
            setDownloadModalActive(false)
        }
    })

    const downloadFormats = [
        {
            name: 'PDF Document',
            format: 'pdf',
            icon: File,
            description: 'Universal document format (Recommended)',
            color: 'bg-red-500',
            isPro: false,
            onClick: reactToPrintFn
        },
        ...(session?.user?.plan === "pro" ? [
            {
                name: 'PNG Image',
                format: 'png',
                icon: ImageIcon,
                description: 'High-quality image format',
                color: 'bg-green-500',
                isPro: true,
                onClick: async () => {
                    const element = printRef?.current
                    if (!element) {
                        toast.error("Could not download your CV")
                        return
                    }
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
                        setDownloadModalActive(false)
                    } catch (error) {
                        console.error('Error generating image:', error)
                    }
                }
            }
        ] : []),
    ]

    return (
        <Dialog open={downloadModalActive} onOpenChange={setDownloadModalActive}>
            <DialogOverlay className="fixed inset-0 backdrop-blur-[3px] bg-[#0000000a]" />
            <DialogContent className="p-0">
                <DialogHeader className="flex items-center gap-3.5 flex-row border-b-2 p-5">
                    <Download 
                        width={24}
                        height={24}
                    />
                    <DialogTitle className="text-[1.25rem] font-[700]">Download CV</DialogTitle>
                </DialogHeader>
                <div className="px-5 pt-0">
                    <Description className="hidden">Select preffered format</Description>
                    <span className="text-[0.905rem] text-neutral-500">Choose your preferred format to download the CV</span>
                    <div className="flex flex-col gap-3.5 mt-4.5">
                        {downloadFormats.map((item) => (
                            <button
                                key={item.format}
                                className="cursor-pointer w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                                style={session}
                                onClick={item.onClick}
                            >
                                <div className={`${item.color} p-3 rounded-lg`}>
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4 text-left">
                                    <h4 className="text-sm font-medium text-gray-900">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                                <Download className="w-5 h-5 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            ))}
                    </div>
                </div>
                <DialogFooter className="bg-neutral-50 p-5 rounded-b-xl">
                    <p className="text-[0.785rem] text-gray-500 flex items-center gap-3 w-full justify-center">
                        <Info
                            width={16}
                            height={16}
                        /> 
                        All formats contain the same information
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CvDownload