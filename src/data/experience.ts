/**
 * Employment history for Faheem Bilal portfolio.
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
    "Senior Software Engineer with hands-on experience across frontend and full-stack development. Strong focus on React.js, Next.js, and end-to-end JavaScript/TypeScript delivery for production web products.",
};

export const experienceRoles: ExperienceRole[] = [
  {
    id: "codesthinker",
    company: "Codesthinker",
    title: "Full Stack Software Developer",
    period: "Jul 2023 – Present",
    bullets: [
      "Architect and develop scalable full-stack web applications with React.js, Next.js, Node.js (Express) and NestJS.",
      "Led end-to-end development of enterprise-grade platforms across product and client delivery.",
      "Design and implement RESTful APIs and GraphQL services for secure frontend and backend communication.",
      "Build and maintain microservices-based architecture for modularity and reliability.",
      "Work with MongoDB, PostgreSQL and MySQL including schema design, indexing, and performance tuning.",
      "Deploy and manage cloud infrastructure on AWS (Lambda, EC2, S3, RDS).",
      "Implement Docker-based containerization and support CI/CD pipelines.",
      "Integrate Python-based AI/ML services and intelligent APIs.",
      "Deliver responsive UIs with Tailwind CSS, Material UI (MUI) and Bootstrap.",
    ],
  },
  {
    id: "codings-first",
    company: "Codings First",
    title: "Full Stack Developer",
    period: "Dec 2022 – Jun 2023",
    bullets: [
      "Built and maintained scalable full-stack web applications using the MERN stack.",
      "Developed frontend interfaces in React.js and Next.js with responsive, SEO-aware layouts.",
      "Designed and integrated RESTful APIs with Node.js and Express for production features.",
      "Worked with PostgreSQL and MongoDB for relational and NoSQL data needs.",
      "Collaborated with design and product teams to ship reusable UI components.",
      "Supported the full development lifecycle from implementation through release.",
    ],
  },
  {
    id: "core-codexa",
    company: "Core Codexa",
    title: "Frontend Web Developer",
    period: "Sep 2022 – Nov 2022",
    bullets: [
      "Worked as a frontend web developer on React.js and Next.js product interfaces.",
      "Built responsive UI screens, component structures, and page flows for web applications.",
      "Translated design requirements into clean, maintainable frontend code.",
      "Improved usability and consistency across key user journeys on the web.",
      "Collaborated with the team on frontend delivery during a focused 3-month engagement.",
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
