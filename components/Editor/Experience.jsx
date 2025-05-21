import { Plus } from "lucide-react"
import ExperienceEditor from "../ExperienceEditor"

export default function Experience({ form, setForm, updatingCv, editorRef }) {
    return (
        <>  
            <div className="flex flex-col gap-5">
                {form.experience.length > 1 ? (
                    form.experience.map((experience, index) => (
                        <ExperienceEditor 
                            form={form}
                            setForm={setForm}
                            key={`experience-${index+1}`}
                            removeBtn={true}
                            data={experience}
                            index={index}
                            updatingCv={updatingCv}
                            editorRef={editorRef}
                        />
                    ))
                ) : (
                    <ExperienceEditor 
                        form={form}
                        setForm={setForm}
                        removeBtn={false}
                        data={form.experience[0]}
                        index={0}
                        updatingCv={updatingCv}
                        editorRef={editorRef}
                    />
                )}
                <button 
                    className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit"
                    onClick={() => {
                        setForm({
                          ...form,
                          experience: [
                            ...form.experience,
                            {
                              positionTitle: '',
                              companyName: '',
                              city: '',
                              state: '',
                              startDate: '',
                              endDate: '',
                              summary: ''
                            }
                          ]
                        })
                    }}                      
                >
                    <Plus />
                    Add more experience
                </button>
            </div>
        </>
    )
}