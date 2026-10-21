export const siteConfig = {
  name: "Faheem Bilal",
  title:
    "Senior Software Engineer | Senior Full-Stack Developer | AI & Cloud Architect",
  roleNote: "COO, Codes Thinker — personal portfolio (independent brand)",
  headline: "Senior Software Engineer Building Scalable Digital Experiences.",
  description:
    "I build modern web and mobile applications, scalable backend systems, and AI-powered digital products that transform business requirements into reliable software solutions.",
  positioning:
    "Senior Software Engineer specializing in full-stack, backend and cloud-based application development with the JavaScript/TypeScript ecosystem across MERN and MEAN stacks — delivering production web applications, APIs, mobile clients, and AI integrations.",
  yearsExperience: "8+",
  email: "faheembilal7874@gmail.com",
  phone: "+923057874388",
  phoneTel: "tel:+923057874388",
  whatsapp: "+923057874388",
  whatsappUrl: "https://wa.me/923057874388",
  linkedin: "https://www.linkedin.com/in/faheem-bilal-dev/",
  resumeUrl: "/resume/faheem-bilal.pdf",
  profileImage: "/images/profile/faheem.png",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  /** Exactly five primary sections */
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/assistant", label: "AI Assistant" },
    { href: "/contact", label: "Contact" },
  ],
  highlights: [
    { label: "Years of Experience", value: "8+" },
    { label: "Focus", value: "Full-Stack" },
    { label: "Architecture", value: "APIs & Cloud" },
    { label: "Specialty", value: "AI Integration" },
    { label: "Platforms", value: "Web & Mobile" },
  ],
  primaryTechnologies: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Angular",
    "Node.js",
    "Express.js",
    "NestJS",
    "Python",
    "React Native",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "The Islamia University of Bahawalpur",
    years: "2017 – 2021",
  },
} as const;

export type SiteConfig = typeof siteConfig;
