import { AlertCircle, ArrowLeft, Bell, Briefcase, Clock, CreditCard, Eye, FileText, Globe, HelpCircle, Lock, MessageSquare, Scale, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function Tos() {
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
                            Terms of Service
                            <Scale className="text-[var(--main-color)] w-10 h-10" />
                        </h1>
                        <p className="text-gray-600">
                            Last updated: March 24, 2025
                        </p>
                        <div className="mt-4 flex items-center text-sm text-gray-600">
                            <AlertCircle className="h-5 w-5 text-[var(--main-color)] mr-3" />
                            Please read these terms carefully before using our service
                        </div>
                    </div>
                    {/* Body */}
                    <div className="prose prose-indigo max-w-none">
                    {[{
                            icon: Shield,
                            title: "1. Agreement to Terms",
                            content: "By accessing or using CV Builder, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, as well as all applicable laws and regulations of the UAE. If you do not agree to these terms, you must refrain from using our services. These terms establish a legally binding agreement between you and CV Builder regarding your rights and obligations when using our platform."
                        },
                        {
                            icon: Users,
                            title: "2. User Registration",
                            content: "To use CV Builder, you must be at least 18 years old or have the consent of a legal guardian. You are responsible for maintaining the security of your login credentials and ensuring that your account is used appropriately. CV Builder will not be held responsible for unauthorized access or misuse of your account."
                        },
                        {
                            icon: FileText,
                            title: "3. Content Ownership",
                            content: "All content you create using CV Builder remains your intellectual property. However, by using our service, you grant us a limited license to store, display, and process your data to provide you with our services. We do not claim ownership over your content and will not share it without your permission, except as required by UAE law."
                        },
                        {
                            icon: CreditCard,
                            title: "4. Subscription and Payments",
                            content: "All subscription fees are payable in advance, and refunds are not provided unless required by UAE consumer protection laws. Pricing may change with prior notice of 30 days. By subscribing, you authorize us to charge the applicable fees to your preferred payment method."
                        },
                        {
                            icon: Eye,
                            title: "5. Privacy and Data Protection",
                            content: "We collect and process your personal data in compliance with UAE data protection laws. By using our service, you consent to our Privacy Policy, which details how we store, use, and protect your personal information. We implement industry-standard security measures to safeguard your data but cannot guarantee absolute security."
                        },
                        {
                            icon: Bell,
                            title: "6. Service Modifications",
                            content: "We reserve the right to modify, suspend, or discontinue any feature of our service at any time. While we strive to maintain service availability, we are not liable for interruptions due to technical issues, maintenance, or unforeseen circumstances. We will notify users in advance of any significant changes."
                        },
                        {
                            icon: Scale,
                            title: "7. Acceptable Use",
                            content: "You agree to use CV Builder lawfully and ethically. Prohibited activities include hacking, spreading malware, engaging in fraudulent activities, or violating intellectual property rights. Any misuse of our platform may result in immediate termination of your account and legal consequences under UAE law."
                        },
                        {
                            icon: Globe,
                            title: "8. International Use",
                            content: "CV Builder is operated within the UAE. If you access our services from outside the UAE, you are responsible for ensuring compliance with your local laws. We make no representations regarding the availability or legality of our services outside the UAE."
                        },
                        {
                            icon: Zap,
                            title: "9. Service Performance",
                            content: "While we strive to provide uninterrupted access, CV Builder does not guarantee that the platform will always be available or error-free. Downtime may occur due to maintenance, network failures, or unforeseen events. We are not liable for any losses resulting from service disruptions."
                        },
                        {
                            icon: MessageSquare,
                            title: "10. Communication",
                            content: "By signing up, you consent to receive emails or notifications regarding your account, service updates, and promotional offers. You may opt out of promotional messages at any time, but essential account-related communications will continue."
                        },
                        {
                            icon: Lock,
                            title: "11. Account Security",
                            content: "You are responsible for protecting your account credentials and ensuring that your account is not misused. If you suspect unauthorized access, notify us immediately. We are not responsible for any loss or damage resulting from unauthorized use of your account."
                        },
                        {
                            icon: Clock,
                            title: "12. Termination",
                            content: "We reserve the right to suspend or terminate your access to our services if you violate these terms. In severe cases, legal action may be taken in accordance with UAE laws. If your account is terminated, you forfeit access to your stored data."
                        },
                        {
                            icon: HelpCircle,
                            title: "13. Support Services",
                            content: "Support is available based on your subscription level. While we strive to resolve issues promptly, response times may vary. Our team provides assistance for technical difficulties but is not responsible for third-party issues affecting service access."
                        },
                        {
                            icon: Briefcase,
                            title: "14. Professional Conduct",
                            content: "Users must maintain respectful and professional conduct on our platform. Harassment, discrimination, or any form of abuse will not be tolerated. We reserve the right to take appropriate actions against violators."
                        },
                        {
                            icon: Shield,
                            title: "15. Liability Limitations",
                            content: "To the maximum extent permitted by law, CV Builder shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. This platform is provided for educational purposes only, and we are not responsible for any financial, career, or personal losses incurred while using it."
                        }].map((section, index) => (
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