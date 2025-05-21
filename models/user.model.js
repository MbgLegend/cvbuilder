import { Schema, model, models } from "mongoose"
import { v4 as uuidv4 } from "uuid"

const skillSchema = new Schema({
    skillName: { type: String, default: '' },
    proficiency: { type: Number, min: 1, max: 5, default: 1 },
    showProficiency: { type: Boolean, default: false }
}, { _id: false })

const experienceSchema = new Schema({
    positionTitle: { type: String, default: '' },
    companyName: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    summary: { type: String, default: '' }
}, { _id: false })

const educationSchema = new Schema({
    universtyName: { type: String, default: '' },
    degree: { type: String, default: '' },
    major: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    description: { type: String, default: '' }
}, { _id: false })

const CVSchema = new Schema(
    {
        id: {
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            default: ''
        },
        template: {
            type: String,
            required: [true, "Template is required"],
            enum: ['professional', 'creative', 'executive', 'visionary', 'pinnacle', 'summit'],
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        downloads: {
            type: Number,
            default: 0
        },
        data: {
            photo: {
                type: String,
            },
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            jobTitle: {
                type: String,
                default: ''
            },
            country: {
                type: String,
                default: ''
            },
            city: {
                type: String,
                default: ''
            },
            phone: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            },
            linkedin: {
                type: String,
                default: ''
            },
            portfolio: {
                type: String,
                default: ''
            },
            summary: {
                type: String,
                default: ''
            },
            skills: {
                type: [skillSchema],
                default: [
                  {
                    skillName: '',
                    proficiency: 1,
                    showProficiency: false
                  }
                ]
            },
            experience: {
                type: [experienceSchema],
                default: [
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
            },
            education: {
                type: [educationSchema],
                default: [
                  {
                    universtyName: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                  }
                ]
            },            
            colors: {
                primary: { type: String, default: "#3f3f40" },
                body: { type: String, default: "#000" },
                background:  { type: String, default: "#ffffff" },
                line: { type: String, default: "#2b2b2b" }
            },
            text: {
                font: { 
                    type: String, 
                    default: "serif",
                    enum: ["sans-serif", "serif", "Roboto Serif", "Roboto", "Montserrat"],
                },
                header: { 
                    type: Number, 
                    min: 15, 
                    max: 50, 
                    default: 36
                },
                section: { 
                    type: Number, 
                    min: 8, 
                    max: 35, 
                    default: 18
                },
                subtitles: {
                    type: Number, 
                    min: 8, 
                    max: 25, 
                    default: 15
                },
                body: {
                    type: Number, 
                    min: 7, 
                    max: 20, 
                    default: 13
                },
                date: {
                    type: Number, 
                    min: 6, 
                    max: 18, 
                    default: 12
                }
            }
        },
    },
    { timestamps: true }
)

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "Email already exists"],
            required: [true, "Email is required"]
        },
        fullName: {
            type: String,
            required: [true, "Username is required"]
        },
        image: {
            type: String,
            required: [true, "Image is required"]
        },
        plan: {
            type: String,
            enum: ["default", "pro"],
            default: "default"
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        generatedCVs: [CVSchema],
        credits: {
            type: Number,
            required: true,
            default: function () {
                return this.plan === "pro" ? null : 2;
            }
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
)

const User = models?.User || model("User", UserSchema)

export default User