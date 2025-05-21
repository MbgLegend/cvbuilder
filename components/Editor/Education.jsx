import { Plus } from "lucide-react"
import EducationEditor from "../EducationEditor"

export default function Education({ form, setForm, updatingCv }) {
    return (
        <>
            <div className="flex flex-col gap-5">
                {form?.education.length > 1 ? (
                    form?.education.map((education, index) => (
                        <EducationEditor 
                            form={form}
                            setForm={setForm}
                            key={`education-${index+1}`}
                            removeBtn={true}
                            data={education}
                            index={index}
                            updatingCv={updatingCv}
                        />
                    ))
                ) : (
                    <EducationEditor 
                        form={form}
                        setForm={setForm}
                        removeBtn={false}
                        data={form.education[0]}
                        index={0}
                        updatingCv={updatingCv}
                    />
                )}
                <button 
                    className="flex items-center gap-2.5 bg-[var(--main-color)]/5 text-[var(--main-color)] text-[0.775rem] cursor-pointer px-4 py-1.5 rounded-[0.5rem] font-[500] hover:bg-[var(--main-color)]/10 w-fit" 
                    onClick={() => {
                        setForm({
                          ...form,
                          education: [
                            ...form.education,
                            {
                                degree: '',
                                universtyName: '',
                                major: '',
                                startDate: '',
                                endDate: '',
                                description: ''
                            }
                          ]
                        })
                    }}                   
                >
                    <Plus />
                    Add more education
                </button>
            </div>
        </>
    )
}