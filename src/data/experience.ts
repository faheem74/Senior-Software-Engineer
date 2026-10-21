/**
 * Employment history sourced from Faheem_Bilal_Senior_Software_Engineer_Resume (Oct 2026).
 */
export interface ExperienceRole {
  id: string;
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

export const experienceSummary = {
  years: "8+",
  summary:
    "Senior Software Engineer specializing in full-stack, backend and cloud-based application development with the JavaScript/TypeScript ecosystem (React.js, Next.js, Angular, Node.js, NestJS, Express.js) across the MERN and MEAN stacks.",
};

export const experienceRoles: ExperienceRole[] = [
  {
    id: "codesthinker",
    company: "Codesthinker",
    title: "Full Stack Software Developer",
    period: "Jul 2023 – Present",
    bullets: [
      "Architect and develop scalable full-stack web applications with React.js, Next.js, Node.js (Express) and NestJS.",
      "Led end-to-end development of enterprise-grade platforms, including an Anesthesiology Board Preparation System and a Food Delivery Application.",
      "Design and implement RESTful APIs and GraphQL services for secure frontend–backend communication.",
      "Build and maintain microservices-based architecture for modularity and reliability.",
      "Work with MongoDB, PostgreSQL and MySQL — schema design, indexing, query optimization, and performance tuning.",
      "Deploy and manage cloud infrastructure on AWS (Lambda, EC2, S3, RDS).",
      "Implement Docker-based containerization and support CI/CD pipelines.",
      "Integrate Python-based AI/ML services and intelligent APIs.",
      "Deliver responsive UIs with Tailwind CSS, Material UI (MUI) and Bootstrap.",
    ],
  },
  {
    id: "codiea",
    company: "CODIEA",
    title: "Software Developer",
    period: "Dec 2022 – Jun 2023",
    bullets: [
      "Developed and maintained scalable web applications on the MERN stack.",
      "Designed and optimized relational and NoSQL databases with PostgreSQL and MongoDB.",
      "Built and integrated RESTful APIs and WebSocket-based real-time features.",
      "Developed responsive, SEO-optimized front-end interfaces with React.js and Next.js.",
      "Collaborated with UI/UX teams to turn designs into reusable front-end components.",
      "Participated across the full software development lifecycle.",
    ],
  },
];

export const engineeringLifecycle = [
  {
    step: "Requirements",
    detail: "Clarify goals, constraints, users, and success criteria before coding.",
  },
  {
    step: "Architecture",
    detail: "Choose boundaries, data models, and integration patterns that fit the problem.",
  },
  {
    step: "Development",
    detail: "Implement with typed contracts, reusable modules, and readable code.",
  },
  {
    step: "Testing",
    detail: "Validate critical paths, edge cases, and regressions before release.",
  },
  {
    step: "Deployment",
    detail: "Ship with environment-based config, HTTPS, and rollback awareness.",
  },
  {
    step: "Monitoring",
    detail: "Watch errors, latency, and usage signals after launch.",
  },
  {
    step: "Maintenance",
    detail: "Fix issues quickly and keep dependencies and security posture current.",
  },
  {
    step: "Improvement",
    detail: "Refactor hotspots and improve performance based on real evidence.",
  },
];
