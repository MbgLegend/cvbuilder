import { createTransport } from "nodemailer"

if (
    !process.env.SMTP_SERVER ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_LOGIN ||
    !process.env.SMTP_PASSWORD
) {
    throw new Error("SMTP env values undefined")
}

const transporter = createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default transporter