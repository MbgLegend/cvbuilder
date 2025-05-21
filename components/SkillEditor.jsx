"use client"

import { Plus, Trash, X } from "lucide-react"
import Input from "./Input"
import ToolTip from "./ToolTip"

const SkillEditor = ({ hovered, setHovered, index, skill, form, setForm, showDelete }) => {
    return (
        <div
            className="relative border rounded-[0.5rem] p-5 grid grid-cols-1 md:grid-cols-2 gap-8.5 items-start"
        >
            <Input 
                label="Skill Name"
                type="text"
                value={skill?.skillName}
                onChange={(e) => {
                    const updatedSkills = [...form.skills]
                    updatedSkills[index] = {
                        ...updatedSkills[index],
                        skillName: e.target.value
                    }
                
                    setForm({
                        ...form,
                        skills: updatedSkills
                    })
                }}  
                placeholder="JavaScript" 
            />
            {skill.showProficiency ? (
                <div className="flex flex-col gap-3.5">
                    <h2 
                        className="text-[0.785rem] font-[600] flex items-center gap-3.5"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Proficiency ({skill?.proficiency}/5)
                    </h2>
                    <div className="flex items-center gap-2.5">
                        {[0, 1, 2, 3, 4].map((box) => (
                            <div 
                                className="w-[22px] h-[22px] rounded-[0.25rem] bg-[var(--main-color)]/10 cursor-pointer hover:bg-[var(--main-color)]"
                                style={{
                                    backgroundColor:
                                        hovered.index === index
                                            ? hovered.box >= box
                                                ? '#1e54c2'
                                                : ''
                                            : form.skills[index].proficiency > box
                                                ? '#1e54c2'
                                                : '',
                                }}
                                key={`proficiency-${index + 1}-${box + 1}`}
                                onMouseEnter={() => setHovered({ index, box })}
                                onMouseLeave={() => setHovered({ index: null, box: null })}
                                onClick={() => {
                                    const updatedSkills = [...form.skills]
                                    if (updatedSkills[index].proficiency === (box+1)) {
                                        updatedSkills[index] = {
                                            ...updatedSkills[index],
                                            proficiency: box
                                        }
                                    } else {
                                        updatedSkills[index] = {
                                            ...updatedSkills[index],
                                            proficiency: box+1
                                        }
                                    }
                                
                                    setForm({
                                        ...form,
                                        skills: updatedSkills
                                    })
                                }}
                            />
                        ))}
                        <button 
                            className="ml-4 flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer p-2.5 rounded-[50%] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                            onClick={(e) => {
                                const updatedSkills = [...form.skills]
                                updatedSkills[index] = {
                                    ...updatedSkills[index],
                                    showProficiency: false
                                }
                            
                                setForm({
                                    ...form,
                                    skills: updatedSkills
                                })
                            }}  
                        >
                            <X 
                                width={15}
                                height={15}
                            />
                        </button>
                    </div>  
                </div>
            ) : (
                <div className="flex flex-col gap-4.5">
                    <h2 
                        className="text-[0.785rem] font-[600] flex items-center gap-3.5"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Skill Rating (Optional)
                        <ToolTip 
                            toolTipContent="Recommended for designer roles"
                        />
                    </h2>
                    <button
                        className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                        onClick={(e) => {
                            const updatedSkills = [...form.skills]
                            updatedSkills[index] = {
                                ...updatedSkills[index],
                                showProficiency: true
                            }
                        
                            setForm({
                                ...form,
                                skills: updatedSkills
                            })
                        }}  
                    >
                        <Plus />
                        Add Rating
                    </button>
                </div>
            )}
            {showDelete && (
                <button 
                    className="cursor-pointer text-red-500 bg-red-500/10 p-2 rounded-[50%] absolute top-4 right-4 hover:bg-red-500/20"
                    onClick={() => {
                        const filteredArray = form.skills?.filter((currentForm, currentIndex) => currentIndex !== index)
                        setForm({
                            ...form,
                            skills: filteredArray
                        })
                    }}
                >
                    <Trash width={15} height={15} />
                </button>
            )}
        </div>
    )
}

export default SkillEditor