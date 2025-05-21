import DOMPurify from 'isomorphic-dompurify'
import { Linkedin, Mail, PanelTop, Phone } from 'lucide-react'

export default function Visionary({ cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
    const createMarkup = (html) => {
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'p', 'br', 'a', 'span', 'u'],
            ALLOWED_ATTR: ['href', 'target'],
        })
        return { __html: cleanHTML }
    }
    return (
        <div 
            className="p-7 pt-0 select-none h-full overflow-y-auto min-h-[70vh] w-[750px] mx-auto no-scrollbar"
            style={{
                backgroundColor: cv?.colors.background,
                fontFamily: cv?.text?.font
            }}
            ref={printRef}
        >
            <div 
                className="flex flex-col items-center pt-10 justify-center text-center avoid-page-break"
                ref={detailsRef}
            >
                <h2 
                    className="font-[500]"
                    style={{ 
                        color: cv?.colors?.body,
                        fontSize: cv?.text?.section
                    }}
                >
                    {cv?.jobTitle}
                </h2>
                <h1 
                    className="font-[700]"
                    style={{ 
                        color: cv?.colors?.primary,
                        fontSize: cv?.text?.header
                    }}
                >
                    {cv?.firstName} {cv?.lastName}
                </h1>
                <h3 
                    className="font-[500]"
                    style={{ 
                        color: cv?.colors?.primary,
                        fontSize: cv?.text?.subtitles
                    }}
                >
                    {cv?.country}{cv.city.trim().length > 0 && ', '}
                    {cv?.city} 
                </h3>
                {(cv?.phone.trim().length > 0 || cv?.email.trim().length > 0 || cv.linkedin.trim().length > 0 || cv?.portfolio.trim().length > 0) && (
                    <div
                        className="mt-3 font-[500] flex items-center gap-2"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.body
                        }}
                    >
                        <span>
                            {cv?.email}
                        </span>
                        {cv.phone.trim().length > 0 && ' | '}
                        <span>
                            {cv?.phone}
                        </span>
                        {cv.linkedin.trim().length > 0 && ' | '}
                        <a 
                            href={cv.linkedin}
                            className="flex items-center gap-2.5 underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Linkedin
                        </a>
                        {cv.portfolio.trim().length > 0 && ' | '}
                        {cv.portfolio.trim().length > 0 && (
                            <a 
                                href={cv.portfolio}
                                className="flex items-center gap-2.5 underline"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Portfolio 
                            </a>
                        )}
                    </div>
                )}
            </div>
             {cv?.summary.trim().length > 0 && (
                <div className='flex flex-col avoid-page text-start'>
                    <div 
                        className="w-full h-[3px] mt-6.5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <h2 
                        className="font-extrabold uppercase mt-5" 
                        ref={experienceRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Summary
                    </h2>
                    <div 
                        className="prose prose-sm max-w-none leading-[1.45] mt-1.5 ml-5.5"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.body
                        }}
                        dangerouslySetInnerHTML={createMarkup(cv?.summary)}
                    />
                </div>
            )}
            {cv.experience.some(job =>
                job.companyName?.trim() ||
                job.positionTitle?.trim() ||
                job.startDate?.trim() ||
                job.endDate?.trim() ||
                job.description?.trim()
            ) &&(
                <div className='flex flex-col avoid-page text-start mt-0.5'>
                    <h2 
                        className="font-extrabold uppercase mt-5 text-start" 
                        ref={experienceRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Experience
                    </h2>
                    <div className="flex flex-col gap-4 mt-3.5 ml-5.5">
                        {cv.experience.map((job, index) => (
                            <div
                                key={`experience-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                <div className='flex flex-row gap-2 items-center'>
                                    <h3 
                                        className="font-[600]"
                                        style={{ 
                                            fontSize: cv?.text?.subtitles,
                                            color: cv?.colors?.body
                                        }}
                                    >
                                        {job?.positionTitle}
                                    </h3>
                                    {job?.startDate && (
                                        <span 
                                            className="font-medium"
                                            style={{ 
                                                fontSize: cv?.text?.date,
                                                color: cv?.colors?.body
                                            }}
                                        >
                                        {new Date(job?.startDate).toLocaleDateString("en-GB", {
                                            month: "short",
                                            year: "numeric",
                                        })}
                                        </span>
                                    )}
                                    {job?.endDate && (
                                        <>
                                            -
                                            <span 
                                                className="font-medium"
                                                style={{ 
                                                    fontSize: cv?.text?.date,
                                                    color: cv?.colors?.body
                                                }}
                                            >
                                                {new Date(job?.endDate).toLocaleDateString("en-GB", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span 
                                    style={{ 
                                        fontSize: cv?.text?.body,
                                        color: cv?.colors?.primary
                                    }}
                                >
                                    {job?.city}
                                    {job?.state.length > 0 && (`, ${job?.state}`)}  
                                    {job?.companyName.length > 0 && (` | ${job?.companyName}`)}  
                                </span>
                                {job?.summary.trim().length > 0 && (
                                    <div 
                                        className="mt-2 leading-[1.5] prose prose-sm max-w-none"
                                        style={{ 
                                            color: cv?.colors?.body,
                                            fontSize: cv?.text?.body
                                        }}
                                        dangerouslySetInnerHTML={createMarkup(job?.summary)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {cv.education.some(edc =>
                edc.degree?.trim() ||
                edc.universtyName?.trim() ||
                edc.startDate?.trim() ||
                edc.endDate?.trim() ||
                edc.description?.trim()
            ) && (
                <div className='flex flex-col avoid-page text-start mt-0.5'>
                    <h2 
                        className="font-extrabold uppercase mt-5 text-start" 
                        ref={educationRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Education
                    </h2>
                    <div className="flex flex-col gap-4 mt-3.5 ml-5.5">
                        {cv.education.map((edc, index) => (
                            <div
                                key={`education-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h1 
                                        className="font-[600] w-full"
                                        style={{ 
                                            color: cv?.colors?.primary,
                                            fontSize: cv?.text?.subtitles
                                        }}
                                    >
                                        {edc?.universtyName}{edc?.degree.length > 0 && ` — ${edc?.degree}`}{edc?.major.length > 0 && ` | ${edc?.major}`}
                                    </h1>
                                </div>
                                <div className='flex items-center gap-2.5'>
                                    {edc?.startDate && (
                                        <span 
                                            className="font-medium"
                                            style={{ 
                                                fontSize: cv?.text?.date,
                                                color: cv?.colors?.body
                                            }}
                                        >
                                        {new Date(edc?.startDate).toLocaleDateString("en-GB", {
                                            month: "short",
                                            year: "numeric",
                                        })}
                                        </span>
                                    )}
                                    {edc?.endDate && (
                                        <>
                                            -
                                            <span 
                                                className="font-medium"
                                                style={{ 
                                                    fontSize: cv?.text?.date,
                                                    color: cv?.colors?.body
                                                }}
                                            >
                                                {new Date(edc?.endDate).toLocaleDateString("en-GB", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </>
                                    )}
                                </div>
                                {edc?.description.length > 0 && (
                                    <div 
                                        className="leading-[1.5] prose prose-sm max-w-none"
                                        style={{ 
                                            color: cv?.colors?.body,
                                            fontSize: cv?.text?.body
                                        }}
                                        dangerouslySetInnerHTML={createMarkup(edc?.description)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {cv.skills.some(skill =>
                skill?.skillName.trim()
            ) && (
                <div className="avoid-page-break">
                    <h2 
                        className="font-extrabold uppercase mt-5 text-start" 
                        ref={skillsRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Skills
                    </h2>
                    <ul className="grid grid-cols-2 gap-5 mt-3.5 ml-5.5 list-disc list-inside">
                        {cv.skills.map((skill, index) => (
                            <li
                                key={`skill-${index + 1}`}
                                style={{
                                    color: cv?.colors?.body,
                                    fontSize: cv?.text?.subtitles
                                }}
                            >
                                {skill.skillName}
                                {skill.showProficiency && (
                                    ` (${skill.proficiency}/5)`
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}