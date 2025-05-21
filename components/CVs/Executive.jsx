import DOMPurify from 'isomorphic-dompurify'
import { Linkedin, PanelTop } from 'lucide-react'

export default function Executive({ fixedWidth=true, minHeight=true, cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
     const createMarkup = (html) => {
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'p', 'br', 'a', 'span', 'u'],
            ALLOWED_ATTR: ['href', 'target'],
        })
        return { __html: cleanHTML }
    }

    return (
        <div 
            className="bg-white p-7 pt-0 select-none font-[roboto] h-full overflow-y-auto mx-auto no-scrollbar"
            style={{
                backgroundColor: cv?.colors.background,
                fontFamily: cv?.text?.font,
                ...(fixedWidth && minHeight ? { width: "750px", minHeight: "70vh" } : {})
            }}
            ref={printRef}
        >
            <div 
                className="flex items-center gap-5 pt-7 avoid-page-break"
                ref={detailsRef}
            >
                {cv?.photo.trim().length > 0 && (
                    <img 
                        src={cv?.photo}
                        alt={"Profile image"}
                        className="rounded-[1rem] w-[120px] h-[120px] object-cover" 
                    />
                )}
                <div className="flex flex-col">
                    <h1 
                       className="font-[700]"
                       style={{ 
                           color: cv?.colors?.primary,
                           fontSize: cv?.text?.header
                       }}
                    >
                        {cv?.firstName} {cv?.lastName}
                    </h1>
                    {cv?.jobTitle.trim().length > 0 && (
                        <h2 
                            className="font-[500]"
                            style={{ 
                                color: cv?.colors?.body,
                                fontSize: cv?.text?.section
                        }}
                        >
                            {cv?.jobTitle}
                        </h2>
                    )}
                    <span 
                        className="font-[500] mt-0.5 flex items-center gap-[5px] mt-1"
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.subtitles
                        }}
                    >
                        {cv?.city}{cv?.city.trim().length > 0 && ', '}{cv?.country}
                        {cv?.phone.trim().length > 0 && <span>•</span>}{`${cv?.phone}`}
                        {cv?.email.trim().length > 0 && <span>•</span>}{`${cv?.email}`}
                    </span>
                    <div
                        className="mt-1.5 font-[500] flex items-center gap-2.5"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.body
                        }}
                    >
                        <a 
                            href={cv.linkedin}
                            className="flex items-center gap-2.5 underline"
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
                                className="flex items-center gap-2.5 underline"
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
                </div>
            </div>
            {cv?.summary.trim().length > 0 && (
                <div className="avoid-page text-start">
                    <div 
                        className="w-full h-[3px] mt-5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <div 
                        className="mt-5 prose prose-sm max-w-none leading-[1.725]"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.body
                        }}
                        dangerouslySetInnerHTML={createMarkup(cv?.summary)}
                    />
                    <div 
                        className="w-full h-[3px] mt-5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                </div>
            )}
            {cv.experience.some(job =>
                job.companyName?.trim() ||
                job.positionTitle?.trim() ||
                job.startDate?.trim() ||
                job.endDate?.trim() ||
                job.description?.trim()
            ) && (
                <div className='avoid-page-break my-5'>
                     <h2 
                        className="font-extrabold" 
                        ref={experienceRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Previous Experience
                    </h2>
                    <div className="flex flex-col gap-5.5 mt-4">
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
                                        {job?.positionTitle}{job?.companyName.length > 0 && ` | ${job?.companyName}`}
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
                                {job?.summary.trim().length > 0 && (
                                    <div 
                                        className="mt-4 leading-[1.65] prose prose-sm max-w-none"
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
                <>
                    <div 
                        className="w-full h-[3px] mt-5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <div className='avoid-page-break mt-4.5'>
                        <h2 
                            className="font-extrabold" 
                            ref={educationRef}
                            style={{ 
                                color: cv?.colors?.primary,
                                fontSize: cv?.text?.section
                            }}
                        >
                            Education & Certificates
                        </h2>
                        <div className="flex flex-col gap-5.5 mt-4">
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
                                    {edc?.universtyName}
                                </span>
                                {edc?.description.trim().length > 0 && (
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
                </>
            )}
            {cv.skills.some(skill =>
                skill?.skillName.trim()
            ) && (
                <div className="avoid-page-break">
                    <div 
                        className="w-full h-[3px] mt-5"
                        style={{ backgroundColor: cv?.colors?.line }}
                    />
                    <h2 
                        className="font-extrabold mt-5" 
                        ref={skillsRef}
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Skills & Competencies
                    </h2>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
                        {cv.skills.map((skill, index) => (
                            <div 
                                key={`skill-${index+1}`}
                                className="flex items-center justify-between gap-5"
                            >
                                 <span
                                    style={{ 
                                        color: cv?.colors?.body,
                                        subtitles: cv?.text?.body
                                    }}
                                >
                                    {skill.skillName}
                                </span>
                                {skill.showProficiency && (
                                    <div className='flex items-center gap-1'>
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4`}
                                                style={{
                                                    color: cv?.colors?.primary,
                                                    opacity: index < skill.proficiency ? 1 : 0.4
                                                  }}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 14.31l-4.098 2.241a.875.875 0 0 1-1.277-.92l.786-4.593L.474 7.219a.875.875 0 0 1 .48-1.488l4.72-.686L9.53.828a.875.875 0 0 1 1.94 0l2.857 4.217 4.72.686a.875.875 0 0 1 .48 1.488l-3.537 3.732.786 4.593a.875.875 0 0 1-1.277.92L10 14.31z"
                                                />
                                            </svg>
                                        ))}
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