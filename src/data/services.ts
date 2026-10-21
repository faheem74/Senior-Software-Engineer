export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    description:
      "End-to-end product delivery from requirements through production deployment.",
    items: ["Web apps", "SaaS platforms", "Admin dashboards", "API integrations"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Modern React, Next.js, and Angular interfaces with strong accessibility and performance.",
    items: ["Component architecture", "Responsive UI", "TypeScript", "Design systems"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Reliable Node.js, Express, and NestJS services designed for maintainability and scale.",
    items: ["Auth", "Business logic", "Background jobs", "Integrations"],
  },
  {
    id: "api",
    title: "API Development and Integration",
    description:
      "REST and GraphQL APIs with secure authentication and third-party system wiring.",
    items: ["REST", "JWT", "Webhooks", "External APIs"],
  },
  {
    id: "ai",
    title: "AI-Powered Application Development",
    description:
      "Practical generative AI features with server-side providers and verified knowledge boundaries.",
    items: ["LLM APIs", "Assistants", "Automation", "Safe fallbacks"],
  },
  {
    id: "cloud",
    title: "Cloud Architecture and Deployment",
    description:
      "AWS-oriented delivery, Vercel deployments, CI/CD, and production troubleshooting.",
    items: ["AWS", "Docker", "CI/CD", "Monitoring"],
  },
  {
    id: "database",
    title: "Database Design and Optimization",
    description:
      "MongoDB and relational modeling with indexing and query performance in mind.",
    items: ["Schema design", "Indexing", "Validation", "Query tuning"],
  },
  {
    id: "performance",
    title: "Application Performance Optimization",
    description:
      "Frontend and backend improvements that reduce latency and improve reliability.",
    items: ["Profiling", "Caching", "Bundle size", "API latency"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description:
      "Architecture reviews, delivery planning, and pragmatic engineering guidance.",
    items: ["Architecture", "Roadmaps", "Code reviews", "Production support"],
  },
];
