import { z } from "zod"

export const cvSchema = z.object({
    photo: z.string().trim().optional(),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    jobTitle: z.string().trim().optional(),
    country: z.string().trim().optional(),
    city: z.string().trim().optional(),
    phone: z.string().trim().optional().refine(
        val => !val || /^\d+$/.test(val),
        { message: "Phone number must contain only digits" }
    ),
    email: z.string().trim().optional(),
    summary: z.string().trim().optional(),
    linkedin: z.string().trim().optional(),
    portfolio: z.string().trim().optional(),
    experience: z.array(
        z.object({
            positionTitle: z.string().trim().optional(),
            companyName: z.string().trim().optional(),
            city: z.string().trim().optional(),
            state: z.string().trim().optional(),
            startDate: z.string().trim().optional(),
            endDate: z.string().trim().optional(),
            summary: z.string().trim().optional(),
        })
    ).optional(),

    education: z.array(
        z.object({
            universtyName: z.string().trim().optional(),
            degree: z.string().trim().optional(),
            major: z.string().trim().optional(),
            startDate: z.string().trim().optional(),
            endDate: z.string().trim().optional(),
            description: z.string().trim().optional(),
        })
    ).optional(),

    skills: z.array(
        z.object({
            skillName: z.string().trim().optional(),
            proficiency: z.number().min(0).max(5).optional(),
            showProficiency: z.boolean().optional().default(true)
        })
    ).optional(),

    colors: z.object({
        primary: z.string().optional().default("#3f3f40"),
        body: z.string().optional().default("#000"),
        background: z.string().optional().default("#ffffff"),
        line: z.string().optional().default("#2b2b2b"),
    }).optional().default({
        primary: "#3f3f40",
        body: "#000",
        background: "#ffffff",
        line: "#2b2b2b",
    }),

    text: z.object({
        font: z
          .enum(["sans-serif", "serif", "Roboto Serif", "Roboto", "Montserrat"])
          .default("serif"), 
        header: z
          .number()
          .min(15, "Header must be at least 15px")
          .max(50, "Header must be at most 50px")
          .default(36),
      
        section: z
          .number()
          .min(8, "Section title must be at least 8px")
          .max(35, "Section title must be at most 35px")
          .default(18), 
      
        subtitles: z
          .number()
          .min(8, "Subtitles must be at least 8px")
          .max(25, "Subtitles must be at most 25px")
          .default(15),
      
        body: z
          .number()
          .min(7, "Body text must be at least 7px")
          .max(20, "Body text must be at most 20px")
          .default(13),
      
        date: z
          .number()
          .min(6, "Date text must be at least 6px")
          .max(18, "Date text must be at most 18px")
          .default(12),
      })
})

export const cvPatchSchema = cvSchema.partial()