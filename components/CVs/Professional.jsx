import { Linkedin, Mail, PanelTop, Phone } from "lucide-react"
import DOMPurify from 'isomorphic-dompurify'

export default function Professional({ fixedWidth=true, minHeight=true, cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
     const createMarkup = (html) => {
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'p', 'br', 'a', 'span', 'u'],
            ALLOWED_ATTR: ['href', 'target'],
        })
        return { __html: cleanHTML }
    }

    return (
        <div 
            className="select-none pb-6 h-full overflow-y-auto mx-auto no-scrollbar"
            style={{
                backgroundColor: cv?.colors.background,
                fontFamily: cv?.text?.font,
                ...(fixedWidth && minHeight ? { width: "750px", minHeight: "70vh" } : {})
            }}
            ref={printRef}
        >
            <div 
                className="w-full h-[22px]" 
                style={{ backgroundColor: cv?.colors?.line }}
            />
            <div 
                className="flex flex-col items-center pt-11.5 justify-center px-7 text-center avoid-page-break"
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
                <h3 
                    className="mt-1 font-[500]"
                    style={{ 
                        color: cv?.colors?.primary,
                        fontSize: cv?.text?.subtitles
                    }}
                >
                    {cv?.country}{cv.city.trim().length > 0 && ', '}
                    {cv?.city} 
                </h3>
                <div
                    className="mt-1.5 font-[500] flex items-center gap-2.5"
                    style={{ 
                        color: cv?.colors?.body,
                        fontSize: cv?.text?.body
                    }}
                >
                    <a 
                        href={cv.linkedin}
                        className="flex items-center gap-2.5"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Linkedin 
                            width={14}
                            height={14}
                        />
                        Linkedin profile
                    </a>
                    {cv.portfolio.trim().length > 0 && ' | '}
                    {cv.portfolio.trim().length > 0 && (
                        <a 
                            href={cv.portfolio}
                            className="flex items-center gap-2.5"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <PanelTop 
                                width={14}
                                height={14}
                            />
                            Portfolio website
                        </a>
                    )}
                </div>
                {(cv?.phone.trim().length > 0 || cv?.email.trim().length > 0) && (
                    <div 
                        className="mt-4.5 w-full"
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.subtitles
                        }}
                    >
                        <div className="flex items-center justify-between gap-4 w-full font-[500]">
                            <span className="flex items-center gap-1.5">
                                <Phone 
                                    width={14}
                                    height={14}
                                />
                                {cv?.phone}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Mail 
                                    width={14}
                                    height={14}
                                />
                                {cv?.email}
                            </span>
                        </div>
                    </div>
                )}
                {cv?.summary.trim().length > 0 && (
                    <div className="avoid-page text-start">
                        <div 
                            className="w-full h-[3px] mt-2.5"
                            style={{ backgroundColor: cv?.colors?.line }}
                        />
                        <div 
                            className="mt-2 prose prose-sm max-w-none leading-[1.6]"
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
            ) &&(
                <div className='avoid-page-break mx-7'>
                    <h2 
                        className="mt-9 mb-1.5 font-extrabold text-center" 
                        ref={experienceRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Professional Experience
                    </h2>
                    <div 
                        className="w-full h-[3px] my-2.5"
                        style={{ 
                            backgroundColor: cv?.colors?.line
                        }}
                    />
                    <div className="flex flex-col gap-5.5 mt-3">
                        {cv.experience.map((job, index) => (
                            <div
                                key={`experience-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h1 
                                        className="font-[600] w-full"
                                        style={{ 
                                            fontSize: cv?.text?.subtitles,
                                            color: cv?.colors?.body
                                        }}
                                    >
                                        {job?.positionTitle}{job?.companyName.length > 0 && `, ${job?.companyName}`}
                                    </h1>
                                    <div className="flex items-center gap-1.5 shrink-0">
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
                                </div>
                                <span 
                                    className={`italic`}
                                    style={{ 
                                        fontSize: cv?.text?.subtitles,
                                        color: cv?.colors?.primary
                                    }}
                                >
                                    {job?.city}
                                    {job?.state.length > 0 && (`, ${job?.state}`)}  
                                </span>
                                {job?.summary.length > 0 && (
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
                <div className='avoid-page-break mx-7'>
                    <h2 
                        className="mt-9 mb-1.5 font-extrabold text-center" 
                        ref={educationRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Education & Certificates
                    </h2>
                    <div 
                        className="w-full h-[3px] my-2.5"
                        style={{ 
                            backgroundColor: cv?.colors?.line,
                        }}
                    />
                    <div className="flex flex-col gap-5.5 mt-3">
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
                                        {edc?.degree}{edc?.major.length > 0 && `, ${edc?.major}`}
                                    </h1>
                                    <div className="flex items-center gap-1.5 shrink-0">
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
                                </div>
                                <span 
                                    className={` italic`}
                                    style={{ 
                                        fontSize: cv?.text?.subtitles,
                                        color: cv?.colors?.body
                                    }}
                                >
                                    {edc?.universtyName}{edc?.major.length > 0 && `, ${edc?.major}`}
                                </span>
                                {edc?.description.length > 0 && (
                                    <div 
                                        className="mt-2 leading-[1.5] prose prose-sm max-w-none"
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
                <div className="avoid-page-break mx-7">
                    <h2 
                        className="mt-9 mb-1.5 font-extrabold text-center" 
                        ref={skillsRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Skills & Competencies
                    </h2>
                    <div 
                        className="w-full h-[3px] my-2.5 mb-6"
                        style={{ 
                            backgroundColor: cv?.colors?.line,
                        }}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        {cv.skills.map((skill, index) => (
                            <div 
                                key={`skill-${index+1}`}
                                className="flex items-center justify-between gap-4"
                            >
                                <span
                                    style={{ 
                                        color: cv?.colors?.body,
                                        fontSize: cv?.text?.section
                                    }}
                                >
                                    {skill.skillName}
                                </span>
                                {skill.showProficiency && (
                                    <div className="w-[150px] h-[15px] bg-neutral-100 relative">
                                        <div 
                                            style={{ 
                                                backgroundColor: cv?.colors?.primary,
                                                width: `${(skill.proficiency / 5) * 150}px`
                                            }}
                                            className="absolute top-0 bottom-0 left-0"
                                        />
                                    </div>
                                )}
                               
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}