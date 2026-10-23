export type ProjectStatus =
  | "live"
  | "design-prototype"
  | "published-app"
  | "demo"
  | "reference";

export type ProjectCategory =
  | "Web Applications"
  | "Full-Stack Development"
  | "Mobile Applications"
  | "E-commerce"
  | "UI/UX and Figma"
  | "Education"
  | "Transport";

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  /** Show in main Projects grid */
  display: boolean;
  /** Show in UI/UX Designs section */
  isDesign: boolean;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  figmaUrl?: string;
  prototypeUrl?: string;
  playStoreUrl?: string;
  thumbnail: string;
  screenshots: { src: string; alt: string }[];
  businessContext?: string;
  problemStatement?: string;
  objectives?: string[];
  role?: string;
  designApproach?: string;
  architecture?: string;
  keyFeatures?: string[];
  challenges?: string[];
  solutions?: string[];
  testingApproach?: string;
  performanceNotes?: string;
  lessonsLearned?: string[];
  relatedSlugs?: string[];
  verifiedInformation: string[];
  sourceNotes?: string;
}

const thumb = (slug: string) => `/images/projects/${slug}/thumb.svg`;

export const projects: Project[] = [
  {
    id: "destinkpit",
    slug: "destinkpit",
    name: "Destinkpit — DESTINK PIT FRESH",
    shortDescription:
      "Live e-commerce storefront for a botanical armpit mist brand with product marketing and order CTAs.",
    overview:
      "Destinkpit is a production e-commerce website for DESTINK PIT FRESH. The public site presents product benefits, ingredients, gallery media, FAQ content, and order-oriented CTAs.",
    category: "E-commerce",
    status: "live",
    featured: true,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "E-commerce UI", "Responsive Design"],
    liveUrl: "https://destinkpit.shop/",
    thumbnail: thumb("destinkpit"),
    screenshots: [
      {
        src: thumb("destinkpit"),
        alt: "Destinkpit storefront visual placeholder",
      },
    ],
    role: "Personal / independently associated project (owner confirmation).",
    keyFeatures: [
      "Product marketing homepage",
      "Benefits and ingredient sections",
      "Cart and Order Now CTA",
      "FAQ and contact channels",
    ],
    relatedSlugs: ["linkway-rides", "akoya"],
    verifiedInformation: [
      "Live URL verified accessible",
      "Owner association confirmed by Faheem Bilal",
    ],
  },
  {
    id: "linkway-rides",
    slug: "linkway-rides",
    name: "Linkway Rides — Transport Booking Platform",
    shortDescription:
      "Responsive booking platform for UK coach, minibus, and airport transfer services.",
    overview:
      "Built a responsive, scalable booking platform where users browse vehicles and destinations, book rides online, and access customer support. Documented in the senior resume as a selected project.",
    category: "Transport",
    status: "live",
    featured: true,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "REST APIs", "Database Integration"],
    liveUrl: "https://linkwayrides.com/",
    thumbnail: thumb("linkway-rides"),
    screenshots: [
      { src: thumb("linkway-rides"), alt: "Linkway Rides visual placeholder" },
    ],
    role: "Full-stack software developer contribution while at Codesthinker (resume-listed selected project). Exact ownership of every feature is not claimed beyond documented delivery.",
    keyFeatures: [
      "Vehicle and destination browsing",
      "Online ride booking",
      "Secure login and registration",
      "User, vehicle, and review data integration",
      "Customer support and newsletter features",
    ],
    relatedSlugs: ["fast-ride", "destinkpit"],
    verifiedInformation: [
      "Listed on Faheem Bilal senior resume",
      "Live URL recovered via CodesThinker project listing: https://linkwayrides.com/",
    ],
    sourceNotes: "Research source: codesthinker.com/projects + resume",
  },
  {
    id: "tamakon",
    slug: "tamakon",
    name: "Al Tamakon Comprehensive School Website",
    shortDescription:
      "Full-stack bilingual (English/Arabic) school website with dynamic pages and authentication.",
    overview:
      "Designed and implemented frontend and backend architecture for a private school website, improving digital presence, parent engagement, and institutional communication.",
    category: "Education",
    status: "live",
    featured: true,
    display: true,
    isDesign: false,
    technologies: [
      "Full-Stack",
      "Bilingual RTL/LTR",
      "Authentication",
      "SEO",
    ],
    liveUrl: "https://tamakon.in/",
    thumbnail: thumb("tamakon"),
    screenshots: [
      { src: thumb("tamakon"), alt: "Tamakon school site visual placeholder" },
    ],
    role: "Resume-documented full-stack delivery for frontend and backend architecture.",
    keyFeatures: [
      "Dynamic pages (Services, Programs, Parent Survey, Testimonials, Contact, Login)",
      "Secure authentication and validated inquiry forms",
      "Bilingual RTL/LTR layouts",
      "Performance, SEO, accessibility, and responsiveness focus",
    ],
    relatedSlugs: ["al-hafiz", "empower-zone"],
    verifiedInformation: [
      "Listed on senior resume",
      "Live URL from CodesThinker listing: https://tamakon.in/",
    ],
  },
  {
    id: "empower-zone",
    slug: "empower-zone",
    name: "Empower Zone Consulting Website",
    shortDescription:
      "Bilingual responsive website for a New York benefits consulting firm.",
    overview:
      "Designed and developed a bilingual, responsive website helping families with SNAP, Medicaid, WIC and related benefits. Includes CTAs, success stories, service explanations, and contact integrations.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Responsive Web", "Bilingual UI", "Contact Integrations"],
    liveUrl: "https://empowerzone.us/",
    thumbnail: thumb("empower-zone"),
    screenshots: [
      { src: thumb("empower-zone"), alt: "Empower Zone visual placeholder" },
    ],
    role: "Resume-documented design and development contribution.",
    keyFeatures: [
      "Service explanations and success stories",
      "WhatsApp, email, and phone contact integrations",
      "Clear consultation CTAs",
    ],
    verifiedInformation: [
      "Listed on senior resume",
      "Live URL from CodesThinker: https://empowerzone.us/",
    ],
  },
  {
    id: "al-hafiz",
    slug: "al-hafiz",
    name: "Online Quran Learning Academy",
    shortDescription:
      "Online learning platform for one-on-one Quran and Tajweed lessons.",
    overview:
      "Developed an online learning platform offering one-on-one sessions with certified tutors, flexible scheduling, and courses from Noorani Qaida to advanced Tajweed, Hifz and Tafseer.",
    category: "Education",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "Arabic/English UI"],
    liveUrl: "https://a-hafiz.com/",
    thumbnail: thumb("al-hafiz"),
    screenshots: [
      { src: thumb("al-hafiz"), alt: "Al-Hafiz academy visual placeholder" },
    ],
    role: "Resume-documented development contribution.",
    keyFeatures: [
      "Arabic/English interface",
      "Free trial classes messaging",
      "Testimonials, FAQs, and support services",
    ],
    verifiedInformation: [
      "Listed on senior resume",
      "Live URL from CodesThinker: https://a-hafiz.com/",
    ],
  },
  {
    id: "akoya",
    slug: "akoya",
    name: "Akoya Premium Garment Care Website",
    shortDescription:
      "Luxury garment care platform with bilingual UI and service booking flow.",
    overview:
      "Designed and developed a luxury garment care platform presenting premium services, eco-friendly cleaning, couture preservation, and VIP membership features.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Responsive Web", "Bilingual UI", "Booking UX"],
    liveUrl: "https://akoyaluxureylaundry.com/",
    thumbnail: thumb("akoya"),
    screenshots: [
      { src: thumb("akoya"), alt: "Akoya garment care visual placeholder" },
    ],
    role: "Resume-documented design and development contribution.",
    keyFeatures: [
      "Arabic–English interface",
      "Service booking flow",
      "Fragrance selection and packaging add-ons",
    ],
    verifiedInformation: [
      "Listed on senior resume as Akoya Premium Garment Care",
      "Live URL from CodesThinker (Akoya Deluxe Cleaning): https://akoyaluxureylaundry.com/",
    ],
  },
  {
    id: "novietaa-plus",
    slug: "novietaa-plus",
    name: "Novietaa Plus",
    shortDescription:
      "Multilingual web app supporting English and Arabic (RTL) with Redux state management.",
    overview:
      "Built a multilingual web app supporting English and Arabic (RTL), with Redux for state management and a responsive UI.",
    category: "Full-Stack Development",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["React.js", "Tailwind CSS", "Redux"],
    liveUrl: "https://novietaaplus.com/",
    thumbnail: thumb("novietaa-plus"),
    screenshots: [
      { src: thumb("novietaa-plus"), alt: "Novietaa Plus visual placeholder" },
    ],
    role: "Resume-documented frontend contribution (React.js, Tailwind CSS, Redux).",
    verifiedInformation: [
      "Listed on senior resume",
      "Live URL from CodesThinker listing: https://novietaaplus.com/",
    ],
  },
  {
    id: "the-givers",
    slug: "the-givers",
    name: "The Givers Consulting",
    shortDescription:
      "Website for a consultancy and IT services company presenting global services.",
    overview:
      "Built a website for a consultancy and IT services company, presenting global services including mining and overseas employment.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "Responsive Design"],
    liveUrl: "https://thegiversconsulting.com/",
    thumbnail: thumb("the-givers"),
    screenshots: [
      { src: thumb("the-givers"), alt: "The Givers visual placeholder" },
    ],
    role: "Resume-documented website development contribution.",
    verifiedInformation: [
      "Listed on senior resume",
      "Live URL from CodesThinker: https://thegiversconsulting.com/",
    ],
  },
  {
    id: "pure-fitness-africa",
    slug: "pure-fitness-africa",
    name: "Pure Fitness Africa 3.0",
    shortDescription:
      "Published Android fitness app for Pure Fitness Africa members (Play Store).",
    overview:
      "Members use the app to access Pure Fitness Africa’s fitness services and support. Resume notes the Play listing states data is encrypted in transit and users can request data deletion.",
    category: "Mobile Applications",
    status: "published-app",
    featured: true,
    display: true,
    isDesign: false,
    technologies: ["Android", "Mobile Application"],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.initsng.purefitnessafrica4&hl=en",
    thumbnail: thumb("pure-fitness-africa"),
    screenshots: [
      {
        src: thumb("pure-fitness-africa"),
        alt: "Pure Fitness Africa app visual placeholder",
      },
    ],
    role: "Resume-listed live app / portfolio entry. Exact personal engineering scope beyond listing is not fabricated.",
    verifiedInformation: [
      "Listed on senior resume with Google Play link",
      "Also listed on CodesThinker App filter",
    ],
  },
  {
    id: "vista-menuhoster",
    slug: "vista-menuhoster",
    name: "Olive & Cedar Restaurant — MenuHoster Demo",
    shortDescription:
      "Responsive restaurant demo on MenuHoster with menu, gallery, reviews, and reservations.",
    overview:
      "Visitors browse the menu, gallery, reviews, and location pages, then order online or reserve a table. Orders and reservations are simulated in the demo.",
    category: "Web Applications",
    status: "demo",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["HTML5", "CSS3", "JavaScript", "MenuHoster"],
    liveUrl: "https://vista.menuhoster.com/",
    thumbnail: thumb("vista-menuhoster"),
    screenshots: [
      {
        src: thumb("vista-menuhoster"),
        alt: "MenuHoster restaurant demo visual placeholder",
      },
    ],
    role: "Resume-listed live website / demo entry.",
    verifiedInformation: [
      "Resume hyperlink: https://vista.menuhoster.com/",
    ],
  },
  {
    id: "turbo-car-wash",
    slug: "turbo-car-wash",
    name: "Turbo Car Wash Website",
    shortDescription:
      "Responsive multi-section car wash site adapted from the TemplatesJungle Turbo template.",
    overview:
      "A responsive, multi-section site presenting car wash services in a Bootstrap grid layout, adapted from the TemplatesJungle “Turbo” template.",
    category: "Web Applications",
    status: "demo",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["HTML5", "CSS3", "Bootstrap 5"],
    liveUrl: "https://demo.templatesjungle.com/turbo/",
    thumbnail: thumb("turbo-car-wash"),
    screenshots: [
      { src: thumb("turbo-car-wash"), alt: "Turbo car wash demo placeholder" },
    ],
    role: "Resume-listed template-based website entry.",
    verifiedInformation: [
      "Resume hyperlink: https://demo.templatesjungle.com/turbo/",
    ],
    sourceNotes:
      "Clearly labeled as template-based adaptation — not an original product claim.",
  },
  {
    id: "bmx-adventure",
    slug: "bmx-adventure",
    name: "BMX Adventure — E-Commerce Platform",
    shortDescription:
      "E-commerce site with admin CRM dashboard, JWT auth, SEO, and responsive design.",
    overview:
      "Developed an e-commerce site with an admin CRM dashboard, JWT authentication, SEO, and responsive design. Integrated AWS (EC2) for hosting and Cloudinary for media management.",
    category: "E-commerce",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS EC2",
      "Cloudinary",
    ],
    thumbnail: thumb("bmx-adventure"),
    screenshots: [
      { src: thumb("bmx-adventure"), alt: "BMX Adventure visual placeholder" },
    ],
    role: "Resume-documented full-stack e-commerce development.",
    keyFeatures: [
      "Admin CRM dashboard",
      "JWT authentication",
      "AWS EC2 hosting",
      "Cloudinary media management",
    ],
    verifiedInformation: [
      "Listed on senior resume with tech stack",
      "Public live URL not present in resume hyperlinks — Information Required",
    ],
  },
  {
    id: "fast-ride",
    slug: "fast-ride",
    name: "Fast Ride App",
    shortDescription:
      "Figma UI/UX for a ride-booking mobile app covering pickup, ride selection, and trip tracking.",
    overview:
      "Design follows the standard ride-booking journey: the rider sets pickup and drop-off points, selects a ride option, confirms the booking, and tracks the trip.",
    category: "UI/UX and Figma",
    status: "design-prototype",
    featured: true,
    display: true,
    isDesign: true,
    technologies: ["Figma", "Mobile UI Design"],
    figmaUrl:
      "https://www.figma.com/design/RnYdU4QSrYJrP69J10uomx/Fast-Ride-App",
    thumbnail: thumb("fast-ride"),
    screenshots: [
      { src: thumb("fast-ride"), alt: "Fast Ride Figma design placeholder" },
    ],
    role: "Resume-listed mobile app design (Figma).",
    verifiedInformation: [
      "Figma URL from resume hyperlink",
    ],
  },
  {
    id: "stmcz",
    slug: "stmcz",
    name: "STMCZ App",
    shortDescription:
      "Figma design defining screen layouts, navigation structure, and user flows for developer handoff.",
    overview:
      "Defines the app’s screen layouts, navigation structure, and user flows in a single design file for developer handoff.",
    category: "UI/UX and Figma",
    status: "design-prototype",
    featured: false,
    display: true,
    isDesign: true,
    technologies: ["Figma", "Mobile UI Design"],
    figmaUrl: "https://www.figma.com/design/1pfxigzeW9PSASxrcz1aO1/STMCZ-App",
    thumbnail: thumb("stmcz"),
    screenshots: [
      { src: thumb("stmcz"), alt: "STMCZ Figma design placeholder" },
    ],
    role: "Resume-listed mobile app design (Figma).",
    verifiedInformation: ["Figma URL from resume hyperlink"],
  },
  {
    id: "yes-time",
    slug: "yes-time",
    name: "Yes Time App",
    shortDescription:
      "Figma design mapping onboarding to core screens and user flows.",
    overview:
      "Maps the app’s interface structure and user flows from onboarding to core screens in a single design file.",
    category: "UI/UX and Figma",
    status: "design-prototype",
    featured: false,
    display: true,
    isDesign: true,
    technologies: ["Figma", "Mobile UI Design"],
    figmaUrl:
      "https://www.figma.com/design/OmwmUn3fZeUAmXc0ZuU4q9/Yes-Time-App?node-id=0-1",
    thumbnail: thumb("yes-time"),
    screenshots: [
      { src: thumb("yes-time"), alt: "Yes Time Figma design placeholder" },
    ],
    role: "Resume-listed mobile app design (Figma).",
    verifiedInformation: ["Figma URL from resume hyperlink"],
  },
  {
    id: "health-fitness",
    slug: "health-fitness",
    name: "Health & Fitness App",
    shortDescription:
      "Figma fitness-tracking flows for profile, workouts, activity, and progress views.",
    overview:
      "Organized around fitness-tracking flows: user profile, workouts, activity tracking, and progress views.",
    category: "UI/UX and Figma",
    status: "design-prototype",
    featured: false,
    display: true,
    isDesign: true,
    technologies: ["Figma", "Mobile UI Design"],
    figmaUrl:
      "https://www.figma.com/design/FW4blE1SyNDZFzZM8lyAeI/Health-fitness-app?node-id=0-1",
    thumbnail: thumb("health-fitness"),
    screenshots: [
      {
        src: thumb("health-fitness"),
        alt: "Health & Fitness Figma design placeholder",
      },
    ],
    role: "Resume-listed mobile app design (Figma).",
    verifiedInformation: ["Figma URL from resume hyperlink"],
  },
  {
    id: "multi-services-app",
    slug: "multi-services-app",
    name: "Multi-Services, Learning & Entertainment App",
    shortDescription:
      "Figma multi-module mobile app with unified navigation across service, learning, and entertainment.",
    overview:
      "A single app with service, learning, and entertainment modules reached through one unified navigation structure.",
    category: "UI/UX and Figma",
    status: "design-prototype",
    featured: false,
    display: true,
    isDesign: true,
    technologies: ["Figma", "Mobile UI Design"],
    figmaUrl:
      "https://www.figma.com/design/esDONn3zTA2VtHgTaWMt1D/Multi-Services-learning---entertainment-app",
    thumbnail: thumb("multi-services-app"),
    screenshots: [
      {
        src: thumb("multi-services-app"),
        alt: "Multi-services app Figma placeholder",
      },
    ],
    role: "Resume-listed multi-module mobile app design (Figma).",
    verifiedInformation: ["Figma URL from resume hyperlink"],
  },
  {
    id: "trend-car-care",
    slug: "trend-car-care",
    name: "Trend Car Care",
    shortDescription:
      "Responsive car-care / e-commerce style web experience with cart and service CTAs.",
    overview:
      "A CodesThinker-listed live web project focused on vehicle care services with a responsive storefront-style layout, cart flow, and admin-oriented commerce patterns.",
    category: "E-commerce",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "E-commerce UI", "Responsive Design"],
    liveUrl: "https://trendcarcare.com/",
    thumbnail: thumb("trend-car-care"),
    screenshots: [
      { src: thumb("trend-car-care"), alt: "Trend Car Care visual placeholder" },
    ],
    role: "Associated delivery via CodesThinker project portfolio (Faheem Bilal — Full Stack Software Developer).",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live URL: https://trendcarcare.com/",
    ],
    sourceNotes: "Source: codesthinker.com/projects",
  },
  {
    id: "glidesk",
    slug: "glidesk",
    name: "Glidesk — Workforce Management",
    shortDescription:
      "Workforce management web product for scheduling, attendance, and productivity monitoring.",
    overview:
      "Innovative workforce management solutions covering employee scheduling, attendance tracking, and productivity monitoring with modern web delivery.",
    category: "Web Applications",
    status: "live",
    featured: true,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "SaaS UI", "Responsive Design"],
    liveUrl: "https://glidesk.com/",
    thumbnail: thumb("glidesk"),
    screenshots: [{ src: thumb("glidesk"), alt: "Glidesk visual placeholder" }],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live URL: https://glidesk.com/",
    ],
  },
  {
    id: "softech",
    slug: "softech",
    name: "Softech Business Solutions",
    shortDescription:
      "Corporate website for software and technology services across business verticals.",
    overview:
      "Forward-thinking business services site presenting software and technology offerings for companies of all sizes.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "Corporate UI"],
    liveUrl: "https://www.softechbusinessservices.com/",
    thumbnail: thumb("softech"),
    screenshots: [{ src: thumb("softech"), alt: "Softech visual placeholder" }],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live URL: https://www.softechbusinessservices.com/",
    ],
  },
  {
    id: "nasa-teck",
    slug: "nasa-teck",
    name: "Nasa Teck Innovations IT Services",
    shortDescription:
      "Technology company website for Sky Innovations IT Services / Nasa Teck.",
    overview:
      "Corporate IT services presence for Nasa Teck Innovations, presenting digital solutions and company offerings.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Web Application", "Corporate UI"],
    liveUrl: "https://nasateck.com/",
    thumbnail: thumb("nasa-teck"),
    screenshots: [{ src: thumb("nasa-teck"), alt: "Nasa Teck visual placeholder" }],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live URL: https://nasateck.com/",
    ],
  },
  {
    id: "mobilia",
    slug: "mobilia",
    name: "Mobilia Consulting",
    shortDescription:
      "Corporate consulting site on Vercel focused on indirect spend optimization.",
    overview:
      "Professional corporate website for Mobilia Consulting, showcasing a data-driven approach to optimizing indirect spend and sustainable growth.",
    category: "Web Applications",
    status: "live",
    featured: true,
    display: true,
    isDesign: false,
    technologies: ["Next.js", "Vercel", "Corporate UI"],
    liveUrl: "https://mobilia-consulting-pi.vercel.app/",
    thumbnail: thumb("mobilia"),
    screenshots: [{ src: thumb("mobilia"), alt: "Mobilia visual placeholder" }],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live Vercel URL: https://mobilia-consulting-pi.vercel.app/",
    ],
  },
  {
    id: "az-enterprise",
    slug: "az-enterprise",
    name: "AZ Enterprise",
    shortDescription:
      "IT services website with digital solutions messaging and tech blogs (Vercel).",
    overview:
      "Modern IT services website delivering tailored digital solutions, tech blogs, and strategic guidance for digital growth.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Next.js", "Vercel", "Content UI"],
    liveUrl: "https://az-enterprizednbhd.vercel.app/",
    thumbnail: thumb("az-enterprise"),
    screenshots: [
      { src: thumb("az-enterprise"), alt: "AZ Enterprise visual placeholder" },
    ],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live Vercel URL: https://az-enterprizednbhd.vercel.app/",
    ],
  },
  {
    id: "health-point",
    slug: "health-point",
    name: "HealthPoint — Advanced Healthcare",
    shortDescription:
      "Healthcare Next.js site with services, doctors, and appointment-oriented UX (Vercel).",
    overview:
      "Modern healthcare and medical website featuring medical services, doctor profiles, appointment booking cues, and emergency support messaging.",
    category: "Web Applications",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["Next.js", "Vercel", "Healthcare UI"],
    liveUrl: "https://health-point-nextjs-pro.vercel.app/",
    thumbnail: thumb("health-point"),
    screenshots: [
      { src: thumb("health-point"), alt: "HealthPoint visual placeholder" },
    ],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live Vercel URL: https://health-point-nextjs-pro.vercel.app/",
    ],
  },
  {
    id: "ferm-living",
    slug: "ferm-living",
    name: "Ferm Living Accessories",
    shortDescription:
      "Scandinavian-inspired accessories e-commerce collection experience.",
    overview:
      "Modern e-commerce accessories presentation covering home décor categories with clean product storytelling and shopping UX patterns.",
    category: "E-commerce",
    status: "live",
    featured: false,
    display: true,
    isDesign: false,
    technologies: ["E-commerce UI", "Responsive Design"],
    liveUrl: "https://fermliving.com/collections/accessories",
    thumbnail: thumb("ferm-living"),
    screenshots: [
      { src: thumb("ferm-living"), alt: "Ferm Living visual placeholder" },
    ],
    role: "Associated delivery via CodesThinker project portfolio.",
    verifiedInformation: [
      "Listed on codesthinker.com/projects",
      "Live URL: https://fermliving.com/collections/accessories",
    ],
  },
];

export function getVisibleProjects() {
  return projects.filter((p) => p.display);
}

export function getFeaturedProjects() {
  return getVisibleProjects().filter((p) => p.featured);
}

export function getDesignProjects() {
  return getVisibleProjects().filter((p) => p.isDesign);
}

export function getProjectBySlug(slug: string) {
  return getVisibleProjects().find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project?.relatedSlugs?.length) return [];
  return project.relatedSlugs
    .map((s) => getProjectBySlug(s))
    .filter(Boolean) as Project[];
}

export function getProjectCategories() {
  return [...new Set(getVisibleProjects().map((p) => p.category))];
}
