import { FileText, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/#templates" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reviews", href: "/#reviews" },
]

const companyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/tos" },
  { label: "About Us", href: "/#features" },
  { label: "Contact", href: "mailto:noreply@cvbuilder.monster" },
  { label: "Support", href: "/#faq" },
]

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer({ padx }) {
  return (
    <footer
      className={`bg-[#0f141e] ${padx} text-neutral-100 py-6`}
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      <div>
        <div className="py-12 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-[0.5rem] select-none mb-4.5 w-fit"
            >
              <FileText className="h-8 w-8 text-neutral-100" />
              <span className="ml-2 text-[1.125rem] md:text-xl font-bold text-neutral-200">
                ResumeBuilder
              </span>
            </Link>
            <p
              className="text-neutral-200 mb-7 max-w-md text-[0.85rem] font-[500] leading-[28px]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Create stunning, professional CVs that help you stand out and land
              your dream job. Our platform makes it easy.
            </p>
            <div className="flex items-center space-x-5">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-[var(--main-color)] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-300 mb-4 text-[1.55rem]">
              Product
            </h3>
            <ul className="space-y-4">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[0.885rem] text-neutral-200 hover:text-neutral-300 transition-colors font-[500]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-300 mb-4 text-[1.55rem]">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-[0.885rem] text-neutral-200 hover:text-neutral-300 transition-colors font-[500]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-neutral-500">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-neutral-200 text-[0.825rem] font-[600]">
              <span style={{ fontFamily: "var(--font-mono)" }}>
                © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-8">
              {["/privacy", "/tos"].map((href, i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-sm text-neutral-200 hover:text-neutral-300 transition-colors font-[500]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {href.includes("privacy") ? "Privacy" : "Terms"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}