export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description:
      "End-to-end web products from product requirements to production deployment.",
    items: [
      "Business websites",
      "Web applications",
      "SaaS platforms",
      "Admin dashboards",
      "Customer portals",
      "API integrations",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Reliable APIs and server-side systems designed for maintainability and scale.",
    items: [
      "Node.js / Express.js / NestJS",
      "REST APIs",
      "Authentication & authorization",
      "Database design",
      "Background processing",
      "Webhooks & third-party integrations",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Modern, accessible interfaces with strong performance and clean component architecture.",
    items: [
      "React.js / Next.js / Angular",
      "TypeScript",
      "Responsive UI",
      "Accessibility",
      "Frontend optimization",
    ],
  },
  {
    id: "ai",
    title: "AI and Generative AI",
    description:
      "Practical AI features grounded in approved business data and secure server-side integrations.",
    items: [
      "AI chatbots",
      "LLM integrations",
      "AI-powered applications",
      "Intelligent search",
      "Document processing",
      "Business automation",
      "RAG when appropriate",
    ],
  },
  {
    id: "cloud",
    title: "Cloud and Deployment",
    description:
      "Deployment, observability, and cloud-oriented delivery for production workloads.",
    items: [
      "AWS architecture",
      "Application deployment",
      "CI/CD",
      "Docker",
      "Monitoring & logging",
      "Performance optimization",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Cross-platform mobile experiences with shared API-backed architecture.",
    items: [
      "React Native",
      "Cross-platform apps",
      "API integration",
      "Mobile UI implementation",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "Storefronts and commerce workflows focused on clarity, reliability, and conversion paths.",
    items: [
      "E-commerce development",
      "Product and catalog functionality",
      "Third-party API integrations",
      "Payment gateway integration where supported",
      "Backend administration",
      "Performance improvements",
    ],
  },
  {
    id: "improvement",
    title: "Existing Application Improvement",
    description:
      "Stabilize, refactor, and improve systems already in production.",
    items: [
      "Debugging & bug fixing",
      "Code refactoring",
      "Testing",
      "Performance improvements",
      "API troubleshooting",
      "Production issue resolution",
    ],
  },
];
