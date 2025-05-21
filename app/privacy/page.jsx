import { ArrowLeft, Bell, Briefcase, Clock, CreditCard, Eye, FileText, Globe, HelpCircle, Lock, MessageSquare, Scale, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function Privacy() {
    return (
        <main className="bg-neutral-50 relative py-6">
            <section className="flex flex-col gap-2 mx-auto max-w-5xl px-[4%]">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-[var(--main-color)] hover:text-[var(--main-color)]/90 mb-4"
                >
                    <ArrowLeft className="mr-2.5 h-4 w-4" />
                    Back to Home
                </Link>
                <div className="min-h-screen bg-white shadow-xl rounded-3xl py-3.5 md:py-6 px-[3%] md:px-8">
                    {/* Header */}
                    <div className="bg-indigo-50 rounded-2xl p-8 mb-8 shadow-lg">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex gap-4 items-center justify-between">
                            Privacy Policy
                            <Shield className="text-[var(--main-color)] w-10 h-10" />
                        </h1>
                        <p className="text-gray-600">
                            Last updated: March 24, 2025
                        </p>
                        <div className="mt-4 flex items-center text-sm text-gray-600">
                            <Lock className="h-5 w-5 text-[var(--main-color)] mr-3" />
                            Your privacy is our top priority
                        </div>
                    </div>
                    {/* Body */}
                    <div className="prose prose-indigo max-w-none">
                        {[
                            {
                                icon: Shield,
                                title: "1. Agreement to Privacy Policy",
                                content: "By accessing or using CV Builder, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, storage, and processing of your data as described herein. If you do not agree, please refrain from using our services. This Privacy Policy complies with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection."
                            },
                            {
                                icon: Users,
                                title: "2. User Data Collection",
                                content: "We collect personal data necessary for providing our services, such as name, email, and CV content. We ensure compliance with UAE privacy laws and will not sell or share your personal information without explicit consent, except when legally required."
                            },
                            {
                                icon: FileText,
                                title: "3. Data Ownership and Rights",
                                content: "You retain full ownership of all CVs and documents created on our platform. We do not claim intellectual property rights over your content. Users have the right to request data deletion in accordance with UAE privacy regulations."
                            },
                            {
                                icon: CreditCard,
                                title: "4. Payment Information",
                                content: "Payments are securely processed through third-party payment providers compliant with UAE's Federal Electronic Transactions Law. We do not store credit card details but ensure all transactions adhere to the highest security standards."
                            },
                            {
                                icon: Eye,
                                title: "5. Data Security Measures",
                                content: "We implement strict security measures, including encryption and access control, to protect user data. While we strive to keep data secure, we cannot guarantee absolute security due to evolving cyber threats."
                            },
                            {
                                icon: Bell,
                                title: "6. Service Updates and Changes",
                                content: "We reserve the right to update this Privacy Policy periodically to reflect changes in UAE data protection laws or our practices. Users will be notified of significant changes."
                            },
                            {
                                icon: Scale,
                                title: "7. Legal Compliance and Responsibilities",
                                content: "We comply with UAE laws and cooperate with authorities when legally required. Users are responsible for ensuring that any information provided aligns with UAE regulations and ethical standards."
                            },
                            {
                                icon: Globe,
                                title: "8. International Data Transfers",
                                content: "CV Builder operates in accordance with UAE data transfer regulations. If data is transferred internationally, we ensure compliance with applicable UAE laws to protect user privacy."
                            },
                            {
                                icon: Zap,
                                title: "9. Service Availability and Performance",
                                content: "While we strive to maintain high availability, our services may experience downtime due to maintenance or unforeseen circumstances. We are not liable for any loss caused by service interruptions."
                            },
                            {
                                icon: MessageSquare,
                                title: "10. Communications and Marketing",
                                content: "By using our services, you consent to receiving updates and promotional emails. You can opt out at any time. We do not engage in spam or unsolicited marketing."
                            },
                            {
                                icon: Lock,
                                title: "11. User Responsibility for Account Security",
                                content: "Users must safeguard their login credentials. We are not responsible for unauthorized access due to weak passwords or security negligence."
                            },
                            {
                                icon: Clock,
                                title: "12. Termination of Services",
                                content: "We may terminate accounts for violations of this Privacy Policy, fraudulent activity, or other breaches of our terms. Users can request account deletion if they no longer wish to use our services."
                            },
                            {
                                icon: HelpCircle,
                                title: "13. Customer Support and Inquiries",
                                content: "For privacy-related concerns or inquiries, users can contact our support team through the official channels provided on our website."
                            },
                            {
                                icon: Briefcase,
                                title: "14. Ethical Use of Services",
                                content: "CV Builder is designed for professional and educational use. Misuse, including fraudulent CV creation or misleading content, is strictly prohibited."
                            },
                            {
                                icon: Shield,
                                title: "15. Disclaimer: Educational Purposes Only",
                                content: "CV Builder is an educational project aimed at providing insights into CV creation. We do not offer legal employment services, and users should independently verify CV accuracy before submitting to employers. We are not responsible for any job-related decisions based on CVs created using this platform."
                            }
                        ].map((section, index) => (
                            <section key={index} className={`mb-12`}>
                                <div className="flex items-center mb-6">
                                <section.icon className="h-6 w-6 text-indigo-600 mr-2" />
                                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                                </div>
                                <p className="text-gray-600">{section.content}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}