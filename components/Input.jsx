import ToolTip from "./ToolTip"

export default function Input({ label, type, value, onChange, tooltip=false, toolTipContent, placeholder }) {
    return (
        <div className="flex flex-col gap-2.5 w-full">
            <div className="flex items-center gap-3.5">
                <label 
                    htmlFor={label} 
                    className="text-[0.785rem] font-[600] flex items-center gap-3.5 w-fit"
                    style={{ fontFamily: "var(--font-mono)" }}
                >
                    {label}
                </label>
                {tooltip && (
                    <ToolTip 
                        toolTipContent={toolTipContent}
                    />
                )}
            </div>
            <input 
                type={type} 
                className="w-full border rounded-sm p-3 text-[0.82rem] h-full font-[500]" 
                id={label}
                value={value}
                onChange={onChange}
                accept="image/*"
                multiple={false}
                style={{ fontFamily: "var(--font-mono)" }}
                placeholder={placeholder}
            />
        </div>
    )
}