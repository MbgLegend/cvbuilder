"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import SkillEditor from "../SkillEditor"

export default function Skills({ form, setForm }) {
    const [hovered, setHovered] = useState({ index: null, box: null }) 

    return (
        <>
            <div className="flex flex-col gap-5">
                {form.skills.length > 1 ? (
                    form.skills.map((skill, index) => (
                        <SkillEditor 
                            hovered={hovered}
                            setHovered={setHovered}
                            skill={skill}
                            index={index}
                            form={form}
                            setForm={setForm}
                            key={`skill-${index+1}`}
                            showDelete={true}
                        />
                    ))
                ) : (
                    <SkillEditor 
                        hovered={hovered}
                        setHovered={setHovered}
                        skill={form.skills[0]}
                        index={0}
                        form={form}
                        setForm={setForm}
                        showDelete={false}
                    />
                )}
            </div>
            <button 
                className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                onClick={() => {
                    setForm({
                        ...form,
                        skills: [
                        ...form.skills,
                        {
                            skillName: '',
                            proficiency: 1
                        }
                        ]
                    })
                }}                      
            >
                <Plus />
                Add Skill
            </button>
        </>
    )
}