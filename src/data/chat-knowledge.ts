import { siteConfig } from "@/config/site";
import { getVisibleProjects } from "@/data/projects";
import { services } from "@/data/services";
import { skillCategories } from "@/data/skills";
import { experienceRoles } from "@/data/experience";

export const suggestedQuestions = [
  "Who is Faheem Bilal?",
  "What services does he offer?",
  "What technologies does he work with?",
  "Can I view his published projects?",
  "Which mobile apps has he worked on?",
  "Does he develop AI-powered applications?",
  "Can he help with backend development?",
  "How can I contact him?",
];

export function buildKnowledgeBase(): string {
  const projects = getVisibleProjects()
    .map((p) => {
      const links = [
        p.liveUrl ? `Live: ${p.liveUrl}` : null,
        p.figmaUrl ? `Figma: ${p.figmaUrl}` : null,
        p.playStoreUrl ? `Play: ${p.playStoreUrl}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      return `- ${p.name} (${p.category}, status: ${p.status}): ${p.shortDescription}${links ? ` [${links}]` : ""}`;
    })
    .join("\n");

  const serviceList = services
    .map((s) => `- ${s.title}: ${s.items.join(", ")}`)
    .join("\n");

  const skills = skillCategories
    .map((c) => `- ${c.title}: ${c.skills.join(", ")}`)
    .join("\n");

  const experience = experienceRoles
    .map((r) => `- ${r.title} at ${r.company} (${r.period})`)
    .join("\n");

  return `
You are an AI assistant for ${siteConfig.name}'s personal portfolio website.
You are not Faheem personally. Identify yourself as an AI assistant.
Only use the approved facts below. Do not invent employers, awards, metrics, or unverified projects.
Do not present CodesThinker company branding as Faheem's personal brand.

PROFILE
Name: ${siteConfig.name}
Title: ${siteConfig.title}
Experience: ${siteConfig.yearsExperience} years
Positioning: ${siteConfig.positioning}
Email: ${siteConfig.email}
Phone: ${siteConfig.phone}
WhatsApp: ${siteConfig.whatsapp}
LinkedIn: ${siteConfig.linkedin}
Education: ${siteConfig.education.degree}, ${siteConfig.education.institution} (${siteConfig.education.years})

EXPERIENCE
${experience}

SERVICES
${serviceList}

SKILLS
${skills}

VERIFIED PROJECTS
${projects}

CONTACT
Prefer directing serious inquiries to /contact or email ${siteConfig.email}.
WhatsApp: ${siteConfig.whatsappUrl}
`.trim();
}

export interface FaqEntry {
  id: string;
  patterns: RegExp[];
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    id: "who",
    patterns: [/who is faheem/i, /about faheem/i, /tell me about/i],
    answer: `${siteConfig.name} is a ${siteConfig.title} with ${siteConfig.yearsExperience} years of experience. ${siteConfig.positioning}`,
  },
  {
    id: "services",
    patterns: [/services?/i, /what (do|can) (he|you) (offer|do)/i, /help with/i],
    answer: `Faheem offers full-stack development, backend APIs, frontend engineering, AI integrations, cloud/deployment support, React Native mobile work, e-commerce development, and improvement of existing applications. Visit /services or /contact.`,
  },
  {
    id: "tech",
    patterns: [/technolog/i, /stack/i, /skills?/i, /tools?/i],
    answer: `Primary technologies include ${siteConfig.primaryTechnologies.join(", ")}. See /skills for the full list from his resume.`,
  },
  {
    id: "projects",
    patterns: [/projects?/i, /portfolio/i, /published/i, /destinkpit/i, /live/i, /linkway/i],
    answer: `Verified projects include Destinkpit (live e-commerce), Linkway Rides, Tamakon School, Empower Zone, Al-Hafiz, Akoya, Pure Fitness Africa (Google Play), and Figma designs such as Fast Ride, STMCZ, Yes Time, and Health & Fitness. Explore /projects and /designs.`,
  },
  {
    id: "mobile",
    patterns: [/mobile/i, /react native/i, /apps?/i, /figma/i],
    answer: `Faheem works with React Native and mobile UI/UX in Figma. Pure Fitness Africa is listed on Google Play. Design prototypes include Fast Ride, STMCZ, Yes Time, Health & Fitness, and a multi-services app. See /designs.`,
  },
  {
    id: "ai",
    patterns: [/ai/i, /chatbot/i, /llm/i, /generative/i],
    answer: `Yes. Resume-verified work includes Python-based AI/ML services, Generative AI integrations, and API-based AI features.`,
  },
  {
    id: "backend",
    patterns: [/backend/i, /api/i, /nestjs/i, /node/i, /server/i],
    answer: `Yes. Backend work covers Node.js, Express.js, NestJS, REST and GraphQL APIs, auth, databases, microservices, Docker, and AWS.`,
  },
  {
    id: "experience",
    patterns: [/experience/i, /work history/i, /career/i, /codings first/i, /core codexa/i, /codesthinker/i],
    answer: `Faheem's timeline includes Full Stack Software Developer at Codesthinker (Jul 2023 to Present), Full Stack Developer at Codings First (Dec 2022 to Jun 2023), and Frontend Web Developer at Core Codexa (Sep 2022 to Nov 2022) with React.js and Next.js. See /experience.`,
  },
  {
    id: "contact",
    patterns: [/contact/i, /email/i, /whatsapp/i, /reach/i, /hire/i],
    answer: `Reach Faheem at ${siteConfig.email}, WhatsApp ${siteConfig.whatsapp}, LinkedIn ${siteConfig.linkedin}, or via /contact.`,
  },
];

export function answerFromFaq(message: string): string | null {
  for (const entry of faqEntries) {
    if (entry.patterns.some((p) => p.test(message))) {
      return entry.answer;
    }
  }
  return null;
}

export function defaultFaqFallback(message: string): string {
  const matched = answerFromFaq(message);
  if (matched) return matched;
  return `I can help with questions about Faheem's profile, experience, services, skills, verified projects, and contact details. Try a suggested question, or email ${siteConfig.email}.`;
}
