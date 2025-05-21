import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { DialogOverlay } from "@radix-ui/react-dialog"
import { Delete, LoaderCircle } from "lucide-react"
import { toast } from "react-toastify"

const DeleteCV = ({ deleteModalActive, setDeleteModalActive, selectedCvDelete, deletingCv, setDeletingCv, setSortedCVs }) => {
    return (
        <Dialog open={deleteModalActive} onOpenChange={setDeleteModalActive}>
            <DialogOverlay className="fixed inset-0 z-[1] backdrop-blur-[3px]" />
            <DialogContent className="!w-[95%] lg:!w-full lg:!max-w-[600px] md:mx-auto bg-white rounded-lg shadow-lg !p-0 !animate-none !border-0 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !overflow-y-auto max-h-[70vh]">
                <DialogHeader className="px-8 pt-10 rounded-tr-lg rounded-tl-lg relative z-10">
                    <DialogTitle className="hidden">Are you sure you want to delete {deleteModalActive.name}?</DialogTitle>
                    <div className="mx-auto w-12 h-12 bg-neutral-200/40 rounded-xl flex items-center justify-center mb-2">
                        <Delete  className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-xl lg:text-[1.825rem] font-bold text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                        Are you sure you want to delete <span className="underline">{selectedCvDelete.name}</span>?
                    </h3>
                </DialogHeader>
                <p className="text-center text-[0.915rem] mt-2 text-neutral-600 px-8 pb-4 leading-[1.85]" style={{ fontFamily: 'var(--font-mono)' }}>
                    This action is permanent and cannot be undone. Deleting <strong>{deleteModalActive.name}</strong> will permanently remove it from your account.
                </p>
                <DialogFooter className={`px-8 flex flex-col md:flex-row gap-3 pb-7.5`}>
                    <button
                        type="button"
                        className="cursor-pointer flex-1 p-3 text-[0.925rem] font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setDeleteModalActive(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 p-3 text-[0.925rem] font-medium text-white rounded-lg bg-[var(--main-color)] hover:bg-[var(--main-color)]/92"
                        onClick={async () => {
                            if (deletingCv) return
                            if (selectedCvDelete.id.length === 0 || selectedCvDelete.name.length === 0) {
                                setDeleteModalActive(false)
                                return
                            }
                            
                            setDeletingCv(true)
                            try {
                                const response = await fetch("/api/user/cv", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        id: selectedCvDelete.id
                                    })
                                })
                                const { message, newArray, error } = await response.json()
                                if (error) {
                                    toast.error(error)
                                } else {
                                    toast.success(message)
                                    setSortedCVs(newArray)
                                }
                                setDeletingCv(false)
                            } catch (error) {
                                console.log("Error at delete cv handler:", error)
                                toast.error("Could not delete CV:", error.message)
                                setDeletingCv(false)
                            } finally {
                                setDeleteModalActive(false)
                            }
                        }}
                    >
                        {deletingCv ?
                            <LoaderCircle className="animate-spin mx-auto" />
                            :
                            'Delete CV'
                        }
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCV