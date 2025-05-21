import DOMPurify from 'isomorphic-dompurify'
import { Linkedin, PanelTop } from 'lucide-react'

export default function Creative({ cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
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
                className="flex items-center justify-between gap-4 avoid-page-break pt-7" 
                ref={detailsRef}
                style={cv?.photo.trim().length > 0 ? { 
                    justifyContent: "space-between",
                    textAlign: "start"
                } : { 
                    justifyContent: "center" ,
                    textAlign: "center"
                }}
            >
                <div className="flex flex-col font-mono">
                    <h1 
                        className="font-[700]"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.header
                        }}
                    >
                        {cv?.firstName} {cv?.lastName}
                    </h1>
                    <h2 
                        className="font-[500]"
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.section
                        }}
                    >
                        {cv?.jobTitle}
                    </h2>
                    <span 
                        className="font-[500] mt-2"
                        style={{ 
                            color: cv?.colors?.primary,
                            fontSize: cv?.text?.subtitles
                        }}
                    >
                        {cv.country}{cv.city.trim().length > 0 && ', '}
                        {cv.city} 
                        {cv.email.trim().length > 0 && ' | '}
                        {cv.email}
                        {cv.phone && ' | '}
                        {cv.phone}
                    </span>
                    <div
                        className="mt-3 font-[500] flex items-center gap-3"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.body,
                            justifyContent: cv?.photo.trim().length > 0 ? 'start' : 'center'
                        }}
                    >
                        {cv.linkedin.trim().length > 0 && (
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
                        )}
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
                {cv?.photo.trim().length > 0 && (
                    <img 
                        src={cv?.photo}
                        alt="CV photo" 
                        className='w-[140px] h-[140px] rounded-[50%] object-cover'
                    />
                )}
            </div>
            {cv?.summary && (
                <div className='avoid-page-break'>
                    <h2 
                        className="text-md mt-8 mb-3 font-extrabold"
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.section
                        }}
                    >
                        Summary
                    </h2>
                    <hr 
                        className={`mb-4.5 border-2`} 
                        style={{ 
                            borderColor: cv?.colors?.line
                        }}
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
            {cv.experience.some(job =>
                job.companyName?.trim() ||
                job.positionTitle?.trim() ||
                job.startDate?.trim() ||
                job.endDate?.trim() ||
                job.description?.trim()
            ) &&(
                <div className='avoid-page-break'>
                    <h2 
                        className="mt-10 mb-3 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.section
                        }}
                        ref={experienceRef}
                    >
                        Experience
                    </h2>
                    <hr 
                        className={`mb-4.5 border-2`} 
                        style={{ 
                            borderColor: cv?.colors?.line
                        }}
                    />
                    <div className="flex flex-col gap-4.5 mt-3">
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
                                                day: "2-digit",
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
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <span 
                                    className={`text-[0.835rem] italic`}
                                    style={{ 
                                        fontSize: cv?.text?.subtitles,
                                        color: cv?.text?.primary
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
                <div className='avoid-page-break'>
                    <h2 
                        className="mt-10 mb-3 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.section
                        }}
                        ref={educationRef}
                    >
                        Education
                    </h2>
                    <hr 
                        className={`mb-4.5 border-2`} 
                        style={{ 
                            borderColor: cv?.colors?.line
                        }}
                    />
                    <div className="flex flex-col gap-4.5 mt-3">
                        {cv.education.map((edc, index) => (
                            <div
                                key={`education-${index+1}`}
                                className="flex flex-col gap-[1px]"
                            >
                                 <div className="flex items-center justify-between gap-4">
                                    <h1 className="text-[0.925rem] font-[600] w-full">
                                        {edc?.degree}{edc?.major.length > 0 && `, ${edc?.major}`}
                                    </h1>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {edc?.startDate && (
                                            <span className="text-xs font-medium">
                                            {new Date(edc?.startDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                            </span>
                                        )}
                                        {edc?.endDate && (
                                            <>
                                                -
                                                <span className="text-xs font-medium">
                                                    {new Date(edc?.endDate).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <span 
                                    className={`text-[0.835rem] italic`}
                                    style={cv.color ? { color: cv?.color } : { }}
                                >
                                    {edc?.universtyName}
                                </span>
                                <div 
                                    className="mt-2 leading-[1.5] prose prose-sm max-w-none"
                                    style={{ 
                                        color: cv?.colors?.body,
                                        fontSize: cv?.text?.body
                                    }}
                                    dangerouslySetInnerHTML={createMarkup(edc?.description)}
                                />
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
                        className="mt-10 mb-3 font-extrabold" 
                        style={{ 
                            color: cv?.colors?.body,
                            fontSize: cv?.text?.section
                        }}
                        ref={skillsRef}
                    >
                        Skills & Abilities
                    </h2>
                    <hr 
                        className={`mb-4.5 border-2`} 
                        style={{ 
                            borderColor: cv?.colors?.line
                        }}
                    />
                    <div className='grid grid-cols-3 gap-8 items-start'>
                        {cv.skills.map((skill, index) => (
                            <div 
                                className='flex items-center justify-between gap-2.5'
                                key={`skill-${index+1}`}
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
                                    <div className='flex items-center gap-2'>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full`}
                                                style={
                                                    i < skill.proficiency ? { backgroundColor: cv?.colors.primary } : { backgroundColor: '#d1d5dc' }
                                                }
                                            ></div>
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