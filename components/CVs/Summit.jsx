import { EarthIcon, Linkedin, Mail, PanelTop, Phone } from "lucide-react"
import DOMPurify from 'isomorphic-dompurify'

export default function Summit({ fixedWidth=true, minHeight=true, cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
     const createMarkup = (html) => {
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'p', 'br', 'a', 'span', 'u'],
            ALLOWED_ATTR: ['href', 'target'],
        })
        return { __html: cleanHTML }
    }

    return (
        <div 
            className="select-none p-7 h-full overflow-y-auto mx-auto no-scrollbar"
            style={{
                backgroundColor: cv?.colors.background,
                fontFamily: cv?.text?.font,
                ...(fixedWidth && minHeight ? { width: "750px", minHeight: "70vh" } : {})
            }}
            ref={printRef}
        >
            <div 
                className="flex flex-col avoid-page-break"
                ref={detailsRef}
            >
                 <h1 
                    className="font-[700]"
                    style={{ 
                        color: cv?.colors?.primary,
                        fontSize: cv?.text?.header
                    }}
                >
                    {cv?.firstName} {cv?.lastName}
                </h1>
                <h2 
                    className="font-[500]"
                    style={{ 
                        color: cv?.colors?.body,
                        fontSize: cv?.text?.section
                    }}
                >
                    {cv?.jobTitle}
                </h2>
                {(cv?.email.trim().length > 0 || cv?.country.trim().length > 0 || cv?.city.trim().length > 0 ) && (
                    <div className="flex items-center justify-between gap-6 mt-2">
                        <h3
                            className="font-[500]"
                            style={{ 
                                color: cv?.colors?.primary,
                                fontSize: cv?.text?.subtitles
                            }}
                        >
                            {cv.country}{cv.city.trim().length > 0 && ', '}
                            {cv.city} 
                        </h3>
                        <p
                            className="font-[500]"
                            style={{ 
                                color: cv?.colors?.primary,
                                fontSize: cv?.text?.subtitles
                            }}
                        >
                            {cv?.email}
                        </p>
                    </div>
                )}
                {(cv?.phone.trim().length > 0 || cv?.linkedin.trim().length > 0 || cv?.portfolio.trim().length > 0 ) && (
                    <div className="flex items-center justify-between gap-6 mt-3">
                        <p
                            className="font-[500] flex items-center gap-2.5"
                            style={{ 
                                color: cv?.colors?.primary,
                                fontSize: cv?.text?.subtitles
                            }}
                        >
                            <Phone 
                                width={15}
                                height={15}
                                style={{ 
                                    color: cv?.colors?.primary
                                }}
                            />
                            {cv?.phone}
                        </p>
                        {(cv?.linkedin.trim().length > 0) && (
                            <a 
                                href={cv.linkedin}
                                className="flex items-center gap-2.5"
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: cv?.colors?.body,
                                    fontSize: cv?.text?.body
                                }}
                            >
                                <Linkedin 
                                    width={15}
                                    height={15}
                                    style={{ 
                                        color: cv?.colors?.primary
                                    }}
                                />
                                Linkedin
                            </a>
                        )}
                        {(cv?.portfolio.trim().length > 0) && (
                            <a 
                                href={cv.portfolio}
                                className="flex items-center gap-2.5"
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: cv?.colors?.body,
                                    fontSize: cv?.text?.body
                                }}
                            >
                                <EarthIcon 
                                    width={15}
                                    height={15}
                                    style={{ 
                                        color: cv?.colors?.primary
                                    }}
                                />
                                Portfolio
                            </a>
                        )}
                    </div>
                )}
                {cv?.summary.trim().length > 0 && (
                    <div className="avoid-page text-start">
                        <h5
                            className="mt-5 mb-1.5 font-extrabold" 
                            style={{ 
                                color: cv?.colors?.primary,
                                fontSize: cv?.text?.section
                            }}
                        >
                            Summary
                        </h5>
                        <div 
                            className="w-full h-[2px] mt-2.5"
                            style={{ backgroundColor: cv?.colors?.line }}
                        />
                        <div 
                            className="mt-3.5 prose prose-sm max-w-none leading-[1.6]"
                            style={{ 
                                color: cv?.colors?.body,
                                fontSize: cv?.text?.body
                            }}
                            dangerouslySetInnerHTML={createMarkup(cv?.summary)}
                        />
                    </div>
                )}
            </div>
            {cv.experience.some(job =>
                job.companyName?.trim() ||
                job.positionTitle?.trim() ||
                job.startDate?.trim() ||
                job.endDate?.trim() ||
                job.description?.trim()
            ) && (
                <div 
                    className='flex flex-col avoid-page text-start mt-1'
                    ref={experienceRef}
                >
                    <h5
                        className="mt-5 mb-1 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Experience
                    </h5>
                    <div 
                        className="w-full h-[2px] mt-2.5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <div className="flex flex-col gap-4 mt-3.5">
                        {cv.experience.map((job, index) => (
                            <div
                                key={`experience-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                <h3 
                                    className="font-[600]"
                                    style={{ 
                                        fontSize: cv?.text?.subtitles,
                                        color: cv?.colors?.body
                                    }}
                                >
                                    {job?.positionTitle}
                                </h3>
                                <div className="flex items-center justify-between gap-3.5">
                                    <span 
                                        style={{ 
                                            fontSize: cv?.text?.body,
                                            color: cv?.colors?.primary
                                        }}
                                    >
                                        {job?.city}
                                        {job?.state.length > 0 && (`, ${job?.state}`)}  
                                        {job?.companyName.length > 0 && (`, ${job?.companyName}`)}  
                                    </span>
                                    <div className="flex gap-2 items-center">
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
                                                —
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
                                </div>
                                {job?.summary.trim().length > 0 && (
                                    <div 
                                        className="mt-1.5 leading-[1.5] prose prose-sm max-w-none"
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
                <div 
                    className='flex flex-col avoid-page text-start mt-0.5'
                    ref={educationRef}
                >
                    <h5
                        className="mt-5 mb-1 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Education
                    </h5>
                    <div 
                        className="w-full h-[2px] mt-2.5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <div className="flex flex-col gap-4 mt-3.5">
                        {cv.education.map((edc, index) => (
                            <div
                                key={`education-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                <div className="flex items-center justify-between gap-1.5">
                                    <h1 
                                        className="font-[600]"
                                        style={{ 
                                            color: cv?.colors?.primary,
                                            fontSize: cv?.text?.subtitles
                                        }}
                                    >
                                        {edc?.degree}{edc?.major.length > 0 && `, ${edc?.major}`}
                                    </h1>
                                    <div className="flex items-center gap-1.5">
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
                                                —
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
                                </div>
                               <h2
                                    style={{ 
                                        fontSize: cv?.text?.body,
                                        color: cv?.colors?.primary
                                    }}
                               >
                                    {edc?.universtyName}
                               </h2>
                               {edc?.description.length > 0 && (
                                    <div 
                                        className="leading-[1.5] prose prose-sm max-w-none mt-1"
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
                <div 
                    className='flex flex-col avoid-page text-start mt-0.5'
                    ref={skillsRef}
                >
                    <h5
                        className="mt-5 mb-1 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Skills & Technologies
                    </h5>
                    <div 
                        className="w-full h-[2px] mt-2.5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <ul className="flex flex-col gap-3 list-disc list-inside mt-4.5">
                        {cv.skills.map((skill, index) => (
                            <li
                                key={`skill-${index + 1}`}
                                style={{
                                    color: cv?.colors?.body,
                                    fontSize: cv?.text?.subtitles,
                                }}
                                className="font-[600]"
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