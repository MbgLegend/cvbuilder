import DOMPurify from 'isomorphic-dompurify'

export default function Pinnacle({ fixedWidth=true, minHeight=true, cv, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) {
     const createMarkup = (html) => {
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'p', 'br', 'a', 'span', 'u'],
            ALLOWED_ATTR: ['href', 'target'],
        })
        return { __html: cleanHTML }
    }

    const Header = ({ content, ref }) => {
        return (
            <h2 
                className="font-extrabold uppercase mt-5 relative w-fit" 
                ref={ref}
                style={{ 
                    color: cv?.colors?.primary,
                    fontSize: cv?.text?.section
                }}
            >
                {content}
                <div 
                    className="h-[2px] absolute left-0 -bottom-3"
                    style={{ backgroundColor: cv?.colors?.line, width: '40%' }}
                />
            </h2>
        )
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
                className="flex flex-col pt-8 avoid-page-break"
                ref={detailsRef}
            >
                <div className='flex items-center justify-between gap-4.5'>
                    <div>
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
                    </div>
                    {cv?.photo.trim().length > 0 && (
                        <img 
                            src={cv?.photo}
                            alt="CV photo" 
                            className='w-[110px] h-[110px] rounded-[50%] object-cover'
                        />
                    )}
                </div>
                <div 
                    className="w-full h-[2px] mt-6.5"
                    style={{ backgroundColor: cv?.colors?.line }}
                />
            </div>
            <div className='flex items-strech min-h-[70vh]'>
                <div 
                    className='flex flex-col border-r-[2px] shrink-0'
                    style={{ borderColor: cv?.colors?.line, width: '235px' }}
                >
                    <Header 
                        content="Details"
                    />
                    <div className='flex flex-col gap-1'>
                        {(cv?.country.trim().length > 0 || cv?.city.trim().length) && (
                            <>
                                <h4
                                    className="font-extrabold uppercase mt-8" 
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    Address
                                </h4>
                                <p
                                    className="font-[500]"
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    {cv.country}{cv.city.trim().length > 0 && ', '}
                                    {cv.city} 
                                </p>
                            </>
                        )}
                        {(cv?.phone.trim().length > 0) && (
                            <>
                                <h4
                                    className="font-extrabold uppercase mt-3.5" 
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    Phone
                                </h4>
                                <p
                                    className="font-[500]"
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    {cv?.phone}
                                </p>
                            </>
                        )}
                        {(cv?.email.trim().length > 0) && (
                            <>
                                <h4
                                    className="font-extrabold uppercase mt-3.5" 
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    Email
                                </h4>
                                <p
                                    className="font-[500]"
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    {cv?.email}
                                </p>
                            </>
                        )}
                        {(cv?.linkedin.trim().length > 0) && (
                            <>
                                <h4
                                    className="font-extrabold uppercase mt-3.5" 
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    linkedin
                                </h4>
                               <a 
                                    href={cv.linkedin}
                                    className="flex items-center gap-2.5 underline"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        color: cv?.colors?.body,
                                        fontSize: cv?.text?.body
                                    }}
                                >
                                    Linkedin
                                </a>
                            </>
                        )}
                        {(cv?.portfolio.trim().length > 0) && (
                            <>
                                <h4
                                    className="font-extrabold uppercase mt-3.5" 
                                    style={{ 
                                        color: cv?.colors?.primary,
                                        fontSize: cv?.text?.subtitles
                                    }}
                                >
                                    Portfolio
                                </h4>
                               <a 
                                    href={cv.portfolio}
                                    className="flex items-center gap-2.5 underline"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        color: cv?.colors?.body,
                                        fontSize: cv?.text?.body
                                    }}
                                >
                                    Portfolio
                                </a>
                            </>
                        )}
                    </div>
                    {cv.skills.some(skill =>
                        skill?.skillName.trim()
                    ) && (
                        <div className="flex flex-col gap-3.5">
                            <Header 
                                content='Skills'
                            />
                            <ul className="flex flex-col gap-4 list-disc list-inside mt-4.5">
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
                <div className='w-full flex flex-col gap-2.5 px-6'>
                    {cv?.summary.trim().length > 0 && (
                        <div className='flex flex-col avoid-page text-start'>
                            <Header 
                                content="Summary"
                            />
                            <div 
                                className="prose prose-sm max-w-none leading-[1.45] mt-7"
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
                    ) && (
                        <div className='flex flex-col text-start mt-0.5'>
                            <Header 
                                content="Experience"
                            />
                            <div className="flex flex-col gap-4 mt-6">
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
                        <div className='flex flex-col text-start mt-0.5'>
                            <Header 
                                content="Education"
                            />
                            <div className="flex flex-col gap-4 mt-6">
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
                </div>
            </div>
        </div>
    )
}