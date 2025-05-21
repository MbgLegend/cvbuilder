import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useAppContext } from "@/context/AppContext"
import { DialogOverlay } from "@radix-ui/react-dialog"
import { Coins, LoaderCircle, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"

const CreditsPurchase = ({ creditsModalActive, setCreditsModalActive, creditsPaymentLoading, setCreditsPaymentLoading }) => {
    const { setShowSignIn } = useAppContext()
    const { data:session, status } = useSession()

    const handleCreditPurchase = async () => {
        if (!session?.user) setShowSignIn(true)
        if (session?.user.plan === "pro") setTitleModalActive(true)
        if (creditsPaymentLoading || status === "loading") return

        setCreditsPaymentLoading(true)
        try {
            const response = await fetch("/api/user/credit/checkout", { method: "POST" })
            const { url, error } = await response.json()
            if (error) {
                toast.error(error)
            } else {
                window.location.href = url
            }
            setCreditsPaymentLoading(false)
        } catch (error) {
            console.log("Error at credit purchase handleCheckout:", creditsPaymentError)
            toast.error(error.message)
            setCreditsPaymentLoading(false)
        }
    }

    return (
        <Dialog open={creditsModalActive} onOpenChange={setCreditsModalActive}>
            <DialogOverlay className="fixed inset-0 z-[1] backdrop-blur-[3px]" />
            <DialogContent className="!w-[95%] lg:!w-full lg:!max-w-[575px] md:mx-auto bg-white rounded-lg shadow-lg !p-0 !animate-none !border-0 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !overflow-y-auto max-h-[70vh]">
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
                    <div className="absolute -right-10 -top-10 h-40 w-40 bg-indigo-100 rounded-full opacity-50"></div>
                </div>
                <DialogHeader className="px-8 pt-10 pb-3 rounded-tr-lg rounded-tl-lg relative z-10">
                    <DialogTitle className="hidden">Purchase Credits</DialogTitle>
                    <div className="mx-auto w-12 h-12 bg-neutral-200/40 rounded-xl flex items-center justify-center">
                        <Coins className="h-6.5 w-6.5 text-black" />
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-bold text-center">
                        Purchase Credits
                    </h3>
                    <p className="text-neutral-500 text-center text-[0.925rem] leading-[1.75] mt-0.5">
                        You Buy additional credits to unlock more features and enhance your CV-building experience
                    </p>
                </DialogHeader>
                <div 
                    className="z-10 relative rounded-lg border bg-white border-gray-200 p-3 group mx-8 mb-3"
                >
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Best Value
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-[var(--main-color)] mr-2" />
                            <span className="font-medium text-gray-900">1 Credit</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--main-color)]">$3.99</span>
                    </div>
                </div>
                <DialogFooter className={`px-8 flex flex-col md:flex-row gap-3 pb-8`}>
                    <button
                        type="button"
                        className="cursor-pointer flex-1 p-3.5 text-[0.9rem] font-medium bg-gray-100/90 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setCreditsModalActive(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreditPurchase}
                        type="submit"
                        className="cursor-pointer flex-1 p-3.5 text-[0.9rem] font-medium text-white bg-[var(--main-color)] rounded-lg hover:bg-[var(--main-color)]/90"
                    >
                        {creditsPaymentLoading ?
                            <LoaderCircle className="animate-spin mx-auto" />
                            :
                            'Purchase Credits'
                        }
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreditsPurchase