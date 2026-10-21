export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-production-ready-nextjs-portfolios",
    title: "Building Production-Ready Next.js Portfolios",
    excerpt:
      "How to structure a senior engineering portfolio with honest project evidence, secure APIs, and free-tier deployment constraints.",
    tags: ["Next.js", "Architecture", "Career"],
    publishedAt: "2026-09-15",
    readingMinutes: 7,
    featured: true,
    content: [
      "A portfolio for a senior software engineer should prove judgment, not just visual taste. That means verified projects, clear case studies, and APIs that behave like production systems.",
      "Start with a central configuration file for personal details. Keep projects in typed data modules so case studies stay consistent across pages, APIs, and the chatbot knowledge base.",
      "Prefer a single Next.js App Router deployment when free-tier cost matters. Route handlers can expose health, contact, projects, and chat endpoints without operating a second service on day one.",
      "Be strict about honesty. A Figma prototype is not a live product. A live storefront deserves a live link. Missing assets should be labeled instead of filled with stock imagery that misrepresents the work.",
      "Finally, ship with environment-based configuration: MongoDB when available, FAQ fallback for AI when keys are missing, and contact persistence even if SMTP is not configured yet.",
    ],
  },
  {
    slug: "api-security-basics-for-portfolio-backends",
    title: "API Security Basics for Portfolio Backends",
    excerpt:
      "Validation, rate limiting, honeypots, and honest error responses — the minimum bar for a public contact and chat API.",
    tags: ["Security", "Node.js", "APIs"],
    publishedAt: "2026-08-20",
    readingMinutes: 6,
    featured: true,
    content: [
      "Public forms attract spam. Treat every POST endpoint as untrusted input.",
      "Validate payloads with a schema library, reject oversized bodies, and apply lightweight rate limiting per IP. A honeypot field catches many automated submissions with almost no UX cost.",
      "Never expose SMTP credentials, AI keys, or database URIs to the browser. Keep secrets on the server and return generic errors to clients when providers fail.",
      "Honesty matters in API responses too. If email delivery fails, say the message was stored but email notification could not be sent. Do not claim success you cannot prove.",
    ],
  },
  {
    slug: "ai-chatbots-with-safe-fallbacks",
    title: "AI Chatbots with Safe Fallbacks",
    excerpt:
      "Provider abstractions and FAQ retrieval keep a portfolio assistant useful when free AI quotas are unavailable.",
    tags: ["AI", "Chatbots", "DX"],
    publishedAt: "2026-07-10",
    readingMinutes: 5,
    featured: false,
    content: [
      "An AI assistant on a portfolio should answer from approved facts: services, skills, verified projects, and contact details.",
      "Use a provider abstraction so Gemini, Groq, or another eligible API can be swapped through environment variables.",
      "When no API key is configured, retrieve answers from a structured knowledge file. This is enough for a focused personal site and avoids pretending an external model is online.",
      "Always identify the assistant as AI, keep rate limits tight, and push sensitive inquiries toward a real contact channel.",
    ],
  },
];

export function getBlogPosts() {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getFeaturedPosts() {
  return getBlogPosts().filter((p) => p.featured);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
