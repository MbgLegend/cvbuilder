import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { DialogOverlay } from "@radix-ui/react-dialog"
import { CheckCircle, FileText, LoaderCircle } from "lucide-react"
import { templates } from "@/public/assets"

export const TitleModal = ({ titleModalActive, setTitleModalActive, setTitle, setSelectedTemplate, selectedTemplate, creatingCVLoading, title, handleCreateResume }) => {
    return (
        <Dialog open={titleModalActive} onOpenChange={setTitleModalActive}>
            <DialogOverlay className="fixed inset-0 z-[1] backdrop-blur-[3px]" />
            <DialogContent className="!w-[95%] lg:!w-full lg:!max-w-[800px] md:mx-auto bg-white rounded-lg shadow-lg !p-0 !animate-none !border-0 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !overflow-y-auto max-h-[95vh]">
                <DialogHeader className="bg-gradient-to-r from-[var(--main-color)] to-blue-500 px-8 py-12 text-white rounded-tr-lg rounded-tl-lg">
                    <DialogTitle className="hidden">Create New CV</DialogTitle>
                    <div className="mx-auto w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-center">
                        Create Your Professional CV
                    </h3>
                    <p className="text-indigo-100 text-center">
                        Choose a template and start building your career story
                    </p>
                </DialogHeader>
                <div className="px-6 py-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cv-title" className="block text-sm font-medium text-gray-700">
                            CV Title
                        </label>
                        <input
                            type="text"
                            id="cv-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Software Developer 2024"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-semibold text-gray-900">Choose a Template</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className={`border-2 relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 max-h-[350px] rounded-[0.5rem] ${
                                    selectedTemplate === template.id
                                    ? 'ring-2 ring-[var(--main-color)] shadow-lg'
                                    : 'hover:shadow-md'
                                }`}
                                onClick={() => setSelectedTemplate(template.id)}
                            >
                            {/* Preview Image */}
                            <div className="relative aspect-[3/4]">
                                <img
                                    src={template.preview}
                                    alt={template.name}
                                    className="w-full h-full rounded-[0.5rem] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent rounded-[0.5rem]"></div>
                            </div>

                            {/* Template Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div className="flex items-center mb-2">
                                    <template.icon className="h-5 w-5 mr-2" />
                                    <h5 className="font-semibold">{template.title}</h5>
                                </div>
                                <ul className="space-y-1">
                                {template.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-xs">
                                        <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>

                            {/* Selection Indicator */}
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2 bg-[var(--main-color)] text-white p-1 rounded-full">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <DialogFooter className={`px-8 pb-5`}>
                    <button
                        type="button"
                        className="cursor-pointer flex-1 p-3 text-[0.925rem] font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setTitleModalActive(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateResume}
                        type="submit"
                        className="cursor-pointer flex-1 p-3 text-[0.925rem] font-medium text-white bg-[var(--main-color)] rounded-lg hover:bg-[var(--main-color)]/90"
                    >
                        {creatingCVLoading ?
                            <LoaderCircle className="animate-spin mx-auto" />
                            :
                            'Create CV'
                        }
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}