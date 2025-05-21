import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

const ToolTip = ({ toolTipContent }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info
                        width={14}
                        height={14}
                        className="cursor-pointer"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {toolTipContent}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToolTip