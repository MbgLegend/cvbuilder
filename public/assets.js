import { Award, Briefcase, Clock, Download, FlaskConical, Gift, Lightbulb, Plus, Shield, Sparkles, Target, Zap } from "lucide-react"

export const features = [
  {
    icon: Zap,
    title: "Smart AI Writing",
    description: "Leverage advanced AI tools to receive intelligent content and skill suggestions, making resume building smoother and more effective.",
    color: "from-blue-500 to-indigo-500",
    image: '/assets/icons/idea.png'
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Boost your chances of landing interviews with content optimized to pass applicant tracking systems used by top employers.",
    color: "from-green-500 to-teal-500",
    image: '/assets/icons/optimization.png'
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Easily export your resume in PDF, Word, or plain text formats to suit various job application platforms and preferences.",
    color: "from-purple-500 to-pink-500",
    image: '/assets/icons/attachment.png'
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "We prioritize your privacy with encrypted data handling and never share your information with third parties or advertisers.",
    color: "from-orange-500 to-red-500",
    image: '/assets/icons/encrypted.png'
  },
  {
    icon: Gift,
    title: "Premium Templates",
    description: "Stand out with professionally designed resume templates tailored to showcase your experience, skills, and personality.",
    color: "from-indigo-500 to-purple-500",
    image: '/assets/icons/circle.png'
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Build a polished, job-ready resume in just minutes using our intuitive interface designed for speed and simplicity.",
    color: "from-pink-500 to-rose-500",
    image: '/assets/icons/clock.png'
  }
]

export const featuresPosters = [
  {
    name: "ATS Friendly",
    description: "Designed to pass automated filters and get your resume seen by real recruiters.",
    image: '/assets/images/atsCvs.png'
  },
  {
    name: "Simple UI",
    description: "Clean and intuitive interface that makes resume building fast and frustration-free.",
    image: '/assets/images/simpleUi.png'
  },
  {
    name: "AI Generation",
    description: "Generate personalized resumes with smart AI assistance tailored to your goals.",
    image: '/assets/images/genAi.png'
  }
]

export const templates = [
    {
      title: 'Visionary',
      id: 'visionary',
      description: 'Crafted for strategic thinkers and innovative leaders who thrive on transformation and forward-looking decisions.',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Lightbulb,
      preview: "/assets/images/visionary.svg",
      color: "from-purple-500 to-indigo-600",
      features: ["Strategic insights", "Thought leadership", "Clean minimal design"],
      thumbnail: "/assets/images/visionary.svg",
      pro: false
    },
    {
        title: 'Creative',
        id: 'creative',
        description: 'A modern and creative template perfect for design, marketing, and creative industries.',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        icon: Sparkles,
        preview: "/assets/images/creative.svg",
        color: "from-purple-500 to-purple-600",
        features: ["Modern design", "Custom sections", "Visual elements"],
        thumbnail: "/assets/images/creative.svg",
        pro: false
    },
    {
        title: 'Executive',
        id: 'executive',
        description: 'An elegant and sophisticated template designed for senior executives and leadership positions.',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        icon: Award,
        preview: "/assets/images/executive.svg",
        color: "from-green-500 to-green-600",
        features: ["Publication section", "Research focus", "Detailed structure"],
        thumbnail: "/assets/images/executive.svg",
        pro: false
    },
   {
        title: 'Professional',
        id: 'professional',
        description: 'A clean and professional template suitable for corporate positions and traditional industries.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2400',
        icon: Briefcase,
        preview: "/assets/images/professional.svg",
        color: "from-blue-500 to-blue-600",
        features: ["Clean layout", "ATS-friendly", "Professional fonts"],
        thumbnail: "/assets/images/professional.svg",
        pro: false
    },
    {
        title: 'Pinnacle',
        id: 'pinnacle',
        description: 'A polished and refined template ideal for high-ranking professionals showcasing corporate achievements and leadership milestones.',
        image: 'https://images.unsplash.com/photo-1591012911205-4d8b32195485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        icon: Briefcase,
        preview: "/assets/images/pinnacle.svg",
        color: "from-blue-600 to-cyan-500",
        features: ["Leadership summary", "Performance highlights", "Professional layout"],
        thumbnail: "/assets/images/pinnacle.svg",
        pro: false
    },
    {
        title: 'Summit',
        id: 'summit',
        description: 'Built for professionals in academia and science, this template focuses on publications, research, and advanced qualifications.',
        image: 'https://images.unsplash.com/photo-1581092334513-4c4c388c1785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        icon: FlaskConical,
        preview: "/assets/images/summit.svg",
        color: "from-green-600 to-teal-500",
        features: ["Academic profile", "Publications section", "Research achievements"],
        thumbnail: "/assets/images/summit.svg",
        pro: false
    }
]

export const testimonials = [
  {
      quote: "CVMaster transformed my job search. The ATS-friendly templates and AI suggestions helped me land interviews at top tech companies.",
      name: "Sarah Johnson",
      role: "Senior Marketing Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "07 Mar 2024"
  },
  {
      quote: "The AI-powered features are incredible. It helped me highlight my achievements in ways I never thought of. Landed my dream job at Microsoft!",
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "05 Aug 2024"
  },
  {
      quote: "As a career coach, I recommend CVMaster to all my clients. The results speak for themselves - higher interview rates and faster job offers.",
      name: "Emily Rodriguez",
      role: "Career Development Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "11 Jan 2024"
  },
  {
      quote: "The one-time payment model is fantastic. No more monthly subscriptions, and the features are constantly being updated.",
      name: "James Wilson",
      role: "Business Analyst",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "12 Dec 2024"
  },
  {
      quote: "CVMaster's templates are so professional and modern. I received compliments from recruiters about my CV design!",
      name: "Lisa Zhang",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "07 Mar 2025"
  },
  {
      quote: "The export options and ATS optimization features are game-changers. Got calls from 80% of the companies I applied to!",
      name: "David Brown",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "15 Feb 2025"
  }
]

export const faqs = [
    {
      question: "What makes ResumeBuilder different from other CV builders?",
      answer: "ResumeBuilder stands out with its AI-powered content suggestions, ATS-friendly templates, and professional design options. Our platform is built with the latest industry standards and hiring practices in mind, ensuring your CV gets noticed by both human recruiters and applicant tracking systems."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Absolutely! All our templates are specifically designed and tested to be ATS (Applicant Tracking System) friendly. We use industry-standard formatting and layouts that ensure your CV can be properly parsed by any ATS while maintaining a professional and attractive appearance."
    },
    {
      question: "What formats can I download my CV in?",
      answer: "You can download your CV in multiple formats including PDF, DOCX, and TXT if you are a pro subscriber. However, if you are not a subscriber, you can only use PDF format. The PDF format ensures your CV looks exactly the same on any device, while DOCX allows for easy editing in Microsoft Word, and TXT is perfect for copying content into online application forms."
    },
    {
        question: "Is ResumeBuilder suitable for all industries?",
        answer: "Yes! ResumeBuilder offers a wide range of templates and customization options to suit professionals from all industries, whether you're in tech, finance, healthcare, or creative fields. Our AI-powered suggestions also tailor your CV content to match your specific career path."
    },
    {
      question: "Are ResumeBuilder CVs suitable for all countries?",
      answer: "Yes, ResumeBuilder's templates and formats are designed to be universally compatible, ensuring your CV looks professional and meets standard expectations globally."
    },
    {
      question: "Is it worth paying for a CV builder?",
      answer: "Absolutely! Investing in a CV builder like ResumeBuilder saves you time, ensures professional quality, and increases your chances of landing interviews by presenting your qualifications effectively."
    },
    {
      question: "Should I create different CVs for every job application?",
      answer: "It's generally recommended to tailor your CV for each job application to highlight relevant skills and experiences. ResumeBuilder makes this process easier with customizable templates and AI-powered content suggestions."
    },
    {
      question: "What does an ATS-friendly resume mean?",
      answer: "An ATS-friendly resume is formatted in a way that applicant tracking systems can easily read and parse. ResumeBuilder ensures your CV meets ATS requirements by using standard layouts and formatting that ATS systems can process effectively."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service and have created only one CV, you can contact our support team within 30 days of your purchase to request a full refund."
    }
]

export const userPlan = {
  default: {
    type: 'Free',
    features: [
      { text: "All templates available", included: true, tooltip: "All 6 templates available" },
      { text: "Download in PDF", included: true, tooltip: "Export as PDF" },
      { text: "ATS optimized CVs", included: true, tooltip: "Resume scanner ready" },
      { text: "Save up to 2 CVs", included: true, tooltip: "Limited CV slots" },
    ],
    limitations: [
      { text: "Advanced customization", included: false, tooltip: "Basic customizations only" },
      { text: "Multiple file formats (PDF, PNG)", included: false, tooltip: "Pro feature only" },
      { text: "AI content suggestions", included: false, tooltip: "Upgrade to access" },
      { text: "Priority support", included: false, tooltip: "Support not included" }
    ]
  },
  pro: {
    type: 'Paid',
    features: [
      { text: "All templates available", included: true, tooltip: "Full template access" },
      { text: "Download in PDF", included: true, tooltip: "Export as PDF" },
      { text: "ATS optimized CVs", included: true, tooltip: "Resume scanner ready" },
      { text: "Save unlimited CVs", included: true, tooltip: "Unlimited CV slots" },
      { text: "Advanced customization", included: false, tooltip: "Basic customizations only" },
      { text: "Multiple file formats (PDF, PNG)", included: false, tooltip: "Different CV export formats" },
      { text: "AI content suggestions", included: true, tooltip: "Smart content help" },
      { text: "Priority support", included: true, tooltip: "Fast-track support" }
    ]
  }
}

export const dashboardProTips = [
  {
      title: "ATS-Friendly Format",
      description: "Ensure your CV passes through ATS systems with our optimized templates",
      icon: Award,
      action: "Learn more"
  },
  {
      title: "Keyword Optimization",
      description: "Use industry-specific keywords to increase visibility",
      icon: Target,
      action: "View guide"
  },
  {
      title: "Regular Updates",
      description: "Keep your CV current with your latest achievements",
      icon: Clock,
      action: "Set reminder"
  }
]

export const dashboardQuickActions = [
  { title: "Create a CV from scratch", icon: Plus, color: "text-green-600" },
  { title: "Use AI to enhance your CV", icon: Sparkles, color: "text-purple-600", badge: "Premium" },
  { title: "Import LinkedIn profile", icon: Briefcase, color: "text-blue-600" },
  { title: "Browse CV templates", icon: Target, color: "text-orange-600", badge: "New" }
]

export const candidatesHiredIn = [
  { logo: "/assets/images/amazon.webp", alt: 'Amazon' },
  { logo: "/assets/images/american-express.png", alt: 'American Express' },
  { logo: "/assets/images/apple.png", alt: 'Apple' },
  { logo: "/assets/images/facebook.png", alt: 'Facebook' },
  { logo: "/assets/images/google.png", alt: 'Google' },
  { logo: "/assets/images/netflix.png", alt: 'Netflix' },
]

export const fonts = [
    {
        label: "sans serif",
        fontFamily: "sans-serif"
    },
    {
        label: "serif",
        fontFamily: "serif"
    },
    {
        label: "roboto serif",
        fontFamily: "Roboto Serif"
    },
    {
        label: "roboto",
        fontFamily: "Roboto"
    },
    {
        label: "montserrat",
        fontFamily: "Montserrat"
    }
]