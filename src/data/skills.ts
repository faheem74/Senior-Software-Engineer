export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

/** Skills verified from the senior resume (Oct 2026). */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Angular",
      "Redux",
      "Material UI (MUI)",
      "Tailwind CSS",
      "Bootstrap",
      "Sass",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Django",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Microservices",
      "JWT Auth",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Indexing",
      "Query Optimization",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    skills: [
      "AWS Lambda",
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "Docker",
      "CI/CD",
      "Vercel",
      "Render",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    skills: ["React Native", "Cross-platform mobile applications"],
  },
  {
    id: "ai",
    title: "AI / ML",
    skills: [
      "Generative AI integration",
      "Python AI/ML services",
      "API-based AI services",
      "Data processing",
    ],
  },
  {
    id: "engineering",
    title: "Engineering Practices",
    skills: [
      "Software Architecture",
      "System Design",
      "Debugging",
      "Testing",
      "Performance Optimization",
      "Third-party API integrations",
      "MERN & MEAN",
    ],
  },
];
