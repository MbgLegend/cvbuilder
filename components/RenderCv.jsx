import Creative from "./CVs/Creative"
import Executive from "./CVs/Executive"
import Pinnacle from "./CVs/Pinnacle"
import Professional from "./CVs/Professional"
import Summit from "./CVs/Summit"
import Visionary from "./CVs/Visionary"

const RenderCV = ({ cvTemplate, form, printRef, detailsRef, summaryRef, experienceRef, educationRef, skillsRef }) => {
    switch (cvTemplate) {
        case "professional":
            return <Professional 
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
        case "creative":
            return <Creative 
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
        case "executive":
            return <Executive 
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
        case "visionary":
            return <Visionary
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
        case "pinnacle":
            return <Pinnacle
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
        case "summit":
            return <Summit 
                cv={form} 
                printRef={printRef}
                detailsRef={detailsRef}
                summaryRef={summaryRef}
                experienceRef={experienceRef}
                educationRef={educationRef}
                skillsRef={skillsRef}
            />
    }
}

export default RenderCV