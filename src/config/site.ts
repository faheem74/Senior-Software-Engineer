export const siteConfig = {
  name: "Faheem Bilal",
  title: "Senior Software Engineer | AI & Cloud Architect",
  roleNote: "Personal portfolio of Faheem Bilal",
  headline: "Senior Software Engineer Building Scalable Digital Experiences.",
  description:
    "Explore Faheem Bilal's portfolio showcasing full-stack engineering, scalable backend systems, AI integrations, cloud architecture, and modern web applications.",
  positioning:
    "Senior Software Engineer and AI & Cloud Architect with 8+ years of experience building scalable web applications, intelligent AI-powered solutions, and reliable cloud systems. Experience spans frontend work at Core Codexa, full-stack delivery at Codings First, and ongoing full-stack engineering at Codesthinker.",
  philosophy:
    "I build reliable, scalable software by combining thoughtful architecture, clean code, practical problem-solving, and technology that delivers measurable business value.",
  yearsExperience: "8+",
  email: "faheembilal7874@gmail.com",
  phone: "+923057874388",
  phoneTel: "tel:+923057874388",
  whatsapp: "+923057874388",
  whatsappUrl: "https://wa.me/923057874388",
  linkedin: "https://www.linkedin.com/in/faheem-bilal-dev/",
  resumeUrl: "/resume/faheem-bilal.pdf",
  profileImage: "/images/profile/faheem-portrait.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  rotatingRoles: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "AI & Cloud Architect",
    "Backend Engineer",
    "Machine Learning Enthusiast",
  ],
  /** Separate pages — not a single long landing page */
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/services", label: "Services" },
    { href: "/experience", label: "Experience" },
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
    "AWS",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "The Islamia University of Bahawalpur",
    years: "2017 – 2021",
  },
} as const;

export type SiteConfig = typeof siteConfig;
