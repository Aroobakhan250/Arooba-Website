export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  /** Designed cover shown first on the card; hover cycles through `images`. */
  thumbnail?: string;
  images?: string[];
  category: "AI & Chatbots" | "E-Commerce & Management" | "Web Apps & Dashboards" | "Games & Automation";
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
  images?: [string, string];
}

export interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Programming";
  level?: string;
  iconType: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  companyOrPlatform: string;
  review: string;
  rating: number;
  avatar?: string;
}

export const PERSONAL_INFO = {
  name: "Arooba Alam Khan",
  title: "Full-Stack Software Engineer & Solutions Architect",
  headline: "Building Modern Websites, Intelligent Chatbots, SaaS Platforms & Custom Software",
  subtext:
    "I'm Arooba Alam Khan. I architect and deliver complete digital solutions for businesses, startups, and clients worldwide — from interactive animated websites, AI chatbots, and SaaS platforms to e-commerce, custom dashboards, and automated systems.",
  about:
    "Hi, I am Arooba Alam Khan, a Computer Engineer & Full-Stack Developer with 6+ years of real-world development experience. I develop comprehensive end-to-end applications: intuitive high-converting frontend interfaces, robust backend logic with secure APIs, scalable databases, and automated AI/scripting integrations.",
  education:
    "BS Computer Engineering, Sir Syed University of Engineering & Technology",
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Client Solutions Delivered", value: "25+" },
    { label: "Client Satisfaction", value: "100%" },
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/aroobaalamkhan/",
    upwork: "https://www.upwork.com/freelancers/~010648a482ca91f510",
    whatsapp: "https://wa.me/923702906879?text=Hi%20Arooba,%20I%20would%20like%20to%20discuss%20a%20project",
    email: "aroobaalamkhan250@gmail.com",
    businessEmail: "codevia.solutions.co@gmail.com",
  },
  closingLine: "Ready to launch your project? Let's discuss your requirements and turn your vision into a production-ready application.",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "custom-websites",
    title: "Every Kind of Website",
    description:
      "Modern, fast, and high-converting websites tailored to your brand — business showcases, agency sites, landing pages, and interactive web portals with 100% responsive layouts.",
    deliverables: ["Modern Responsive UI", "SEO & Performance Optimized", "Custom CMS & Contact Forms"],
    iconName: "Globe",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots & Virtual Assistants",
    description:
      "Custom AI chatbots trained on your business data using OpenAI / LLM APIs, multi-turn conversational bots, customer support assistants, and intelligent automated workflows.",
    deliverables: ["OpenAI / LLM Integration", "Knowledge Base Training", "Admin Control Dashboard"],
    iconName: "Bot",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "dashboards",
    title: "Admin Dashboards & Portals",
    description:
      "Feature-packed executive dashboards and customer portals with real-time data visualizers, analytics, role-based access control (RBAC), and user management.",
    deliverables: ["Real-time Analytics & Charts", "User Roles & Permissions", "Exportable Reports (PDF/Excel)"],
    iconName: "LayoutDashboard",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "saas-platforms",
    title: "SaaS Platforms & Web Applications",
    description:
      "Scalable Software-as-a-Service (SaaS) web applications built from scratch with subscription billing, multi-tenant architectures, user workspaces, and secure APIs.",
    deliverables: ["Authentication & User Spaces", "Subscription Management", "Cloud Scalable Architecture"],
    iconName: "Layers",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "ecommerce-stores",
    title: "Full-Stack E-Commerce Solutions",
    description:
      "End-to-end online stores with product catalogs, shopping carts, wishlist systems, secure payment gateway integrations, and comprehensive merchant admin dashboards.",
    deliverables: ["Payment Gateway Setup", "Order Tracking & Inventory", "Customer Accounts & Reviews"],
    iconName: "ShoppingCart",
    images: [
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "animated-websites",
    title: "Animated & Interactive Experiences",
    description:
      "Eye-catching modern animated websites with smooth scroll physics, 3D elements, micro-interactions, and Framer Motion effects that captivate visitors and boost retention.",
    deliverables: ["Framer Motion & Micro-interactions", "Smooth Scroll & Parallax", "Engaging Interactive Elements"],
    iconName: "Sparkles",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "games-bots",
    title: "Game-Based Apps & Intelligent Bots",
    description:
      "Interactive 2D game engines, pathfinding algorithms (A*, BFS/DFS), bot automation scripts, and gamified engagement tools built with Python, Canvas, and web technologies.",
    deliverables: ["AI Pathfinding & Logic", "Custom Algorithms & Mechanics", "Multi-level & Scoring Engines"],
    iconName: "Gamepad2",
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software & Automation",
    description:
      "Tailor-made full-stack software, management systems (schools, hotels, inventory), background scrapers, API integrations, and database schemas built for efficiency.",
    deliverables: ["Custom Backend REST APIs", "Database Architecture (MySQL/MongoDB)", "Automated Workflow Scripts"],
    iconName: "Cpu",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "lumina-ai",
    title: "Multilingual AI SaaS Platform",
    subtitle: "React.js & Python",
    description:
      "Next-generation multilingual AI platform supporting voice, vision, and chat in 30+ languages. Features comprehensive user workspaces, admin control center, and Gemini + OpenAI engine integration.",
    tags: ["React.js", "Python", "OpenAI / Gemini", "AI Vision", "SaaS Dashboard"],
    image: "/projects/lumina/a.png",
    thumbnail: "/projects/thumbnails/lumina-ai.png",
    images: [
      "/projects/lumina/a.png",
      "/projects/lumina/b.png",
      "/projects/lumina/c.png",
      "/projects/lumina/d.png",
      "/projects/lumina/e.png",
      "/projects/lumina/f.png",
      "/projects/lumina/g.mp4",
      "/projects/lumina/h.mp4",
      "/projects/lumina/i.png",
    ],
    category: "AI & Chatbots",
    featured: true,
  },
  {
    id: "solaria-ai",
    title: "AI Chatbot Platform",
    subtitle: "React.js | PHP | OpenAI API",
    description:
      "Full-stack conversational chatbot platform featuring modern user chat workspaces, custom fine-tuning, analytics, and an interactive admin dashboard.",
    tags: ["React.js", "PHP", "OpenAI API", "Chatbot", "Admin Control"],
    image: "/projects/solaria/1.png",
    thumbnail: "/projects/thumbnails/solaria-ai.png",
    images: [
      "/projects/solaria/1.png",
      "/projects/solaria/2.png",
      "/projects/solaria/3.png",
      "/projects/solaria/4.mp4",
      "/projects/solaria/5.mp4",
      "/projects/solaria/6.png",
      "/projects/solaria/7.png",
      "/projects/solaria/8.png",
    ],
    category: "AI & Chatbots",
    featured: true,
  },
  {
    id: "pacman-game",
    title: "AI Pathfinding Maze Game",
    subtitle: "Python Game Engine & Pathfinding | Custom Scripting",
    description:
      "Custom-built Python game engine with algorithmic AI ghost pathfinding (finding shortest routes), dynamic multi-level progression, and real-time score systems.",
    tags: ["Python", "Game Engine", "AI Pathfinding", "Algorithms", "Automation"],
    image: "/projects/pacman/1.png",
    thumbnail: "/projects/thumbnails/pacman-game.png",
    images: [
      "/projects/pacman/1.png",
      "/projects/pacman/2.png",
      "/projects/pacman/3.mp4",
    ],
    category: "Games & Automation",
    featured: true,
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "React.js, PHP & MySQL Database",
    description:
      "Comprehensive commercial online store with cart & wishlist, category navigation, secure customer login, and complete admin management dashboard.",
    tags: ["React.js", "PHP", "MySQL", "Cart & Wishlist", "Admin Dashboard"],
    image: "/projects/zyron/1.png",
    thumbnail: "/projects/thumbnails/ecommerce-platform.png",
    images: [
      "/projects/zyron/1.png",
      "/projects/zyron/2.png",
      "/projects/zyron/3.png",
      "/projects/zyron/4.png",
      "/projects/zyron/5.png",
      "/projects/zyron/6.png",
      "/projects/zyron/7.png",
      "/projects/zyron/8.png",
      "/projects/zyron/9.png",
      "/projects/zyron/10.png",
      "/projects/zyron/11.mp4",
      "/projects/zyron/11.png",
      "/projects/zyron/12.mp4",
    ],
    category: "E-Commerce & Management",
    featured: true,
  },
  {
    id: "hotel-management",
    title: "Hotel Booking & Management System",
    subtitle: "Saint-Tropez Luxury Resort & Booking Engine",
    description:
      "End-to-end hospitality solution featuring a guest-facing luxury website with room booking, live availability calendars, housekeeping logs, and revenue occupancy reports.",
    tags: ["Next.js", "Node.js / PHP", "MySQL", "Room Booking", "Management Portal"],
    image: "/projects/hotel/1.png",
    thumbnail: "/projects/thumbnails/hotel-management.png",
    images: [
      "/projects/hotel/1.png",
      "/projects/hotel/2.png",
      "/projects/hotel/3.png",
      "/projects/hotel/4.png",
      "/projects/hotel/5.png",
      "/projects/hotel/6.png",
      "/projects/hotel/7.png",
      "/projects/hotel/8.png",
      "/projects/hotel/9.png",
      "/projects/hotel/10.png",
      "/projects/hotel/11.png",
      "/projects/hotel/12.png",
      "/projects/hotel/13.png",
      "/projects/hotel/14.png",
      "/projects/hotel/15.png",
      "/projects/hotel/16.png",
      "/projects/hotel/17.png",
    ],
    category: "E-Commerce & Management",
    featured: true,
  },
  {
    id: "ai-attendance",
    title: "Face Recognition Attendance System",
    subtitle: "Python & Computer Vision (Real-Time)",
    description:
      "Real-time computer vision system that captures live camera feeds, detects recognized faces, and automatically logs attendance with timestamp and status to the database.",
    tags: ["Python", "OpenCV", "Computer Vision", "Face Recognition", "IoT Ready"],
    image: "/projects/attendance/1.png",
    thumbnail: "/projects/thumbnails/ai-attendance.png",
    images: [
      "/projects/attendance/1.png",
      "/projects/attendance/2.png",
      "/projects/attendance/3.mp4",
    ],
    category: "Games & Automation",
    featured: true,
  },
  {
    id: "saas-client-dashboard",
    title: "Client & Project Management Dashboard",
    subtitle: "Custom-built Admin Dashboard & Client Portal",
    description:
      "Complete operational platform to manage clients, active projects, Kanban tasks, automated invoices, and role-based permissions in one unified dashboard.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Invoicing", "Kanban Tasks"],
    image: "/projects/cms/1a.png",
    thumbnail: "/projects/thumbnails/saas-client-dashboard.png",
    images: [
      "/projects/cms/1a.png",
      "/projects/cms/1b.png",
      "/projects/cms/2.png",
      "/projects/cms/3.png",
      "/projects/cms/4.png",
      "/projects/cms/5.png",
      "/projects/cms/6.png",
      "/projects/cms/7.png",
    ],
    category: "Web Apps & Dashboards",
    featured: true,
  },
  {
    id: "restaurant-website",
    title: "Restaurant Ordering & Reservation Website",
    subtitle: "React.js & Tailwind CSS | Table Booking Engine",
    description:
      "High-end culinary showcase with interactive categorized menu, real-time table reservation engine, food ordering cart, and admin order tracker.",
    tags: ["React.js", "Tailwind CSS", "Table Booking", "Online Ordering", "Responsive"],
    image: "/projects/restaurant/1.png",
    thumbnail: "/projects/thumbnails/restaurant-website.png",
    images: [
      "/projects/restaurant/1.png",
      "/projects/restaurant/2.png",
      "/projects/restaurant/3.png",
      "/projects/restaurant/4.png",
      "/projects/restaurant/5.png",
      "/projects/restaurant/6.png",
      "/projects/restaurant/7.png",
      "/projects/restaurant/8.png",
      "/projects/restaurant/9.png",
      "/projects/restaurant/10.png",
      "/projects/restaurant/11.png",
    ],
    category: "Web Apps & Dashboards",
    featured: true,
  },
];

export const SKILLS_DATA: SkillItem[] = [
  { name: "Next.js", category: "Frontend", level: "Expert", iconType: "Globe" },
  { name: "React.js", category: "Frontend", level: "Expert", iconType: "Globe" },
  { name: "TypeScript", category: "Programming", level: "Advanced", iconType: "Code2" },
  { name: "JavaScript", category: "Programming", level: "Expert", iconType: "Code2" },
  { name: "Tailwind CSS", category: "Frontend", level: "Expert", iconType: "Globe" },
  { name: "Node.js", category: "Backend", level: "Advanced", iconType: "Server" },
  { name: "Python", category: "Programming", level: "Advanced", iconType: "Code2" },
  { name: "PHP", category: "Backend", level: "Advanced", iconType: "Server" },
  { name: "MySQL", category: "Database", level: "Advanced", iconType: "Database" },
  { name: "MongoDB", category: "Database", level: "Intermediate", iconType: "Database" },
  { name: "OpenAI API", category: "Backend", level: "Advanced", iconType: "Server" },
  { name: "REST APIs", category: "Backend", level: "Expert", iconType: "Server" },
  { name: "Framer Motion", category: "Frontend", level: "Advanced", iconType: "Globe" },
  { name: "Git & GitHub", category: "Programming", level: "Advanced", iconType: "Code2" },
  { name: "Computer Vision", category: "Programming", level: "Intermediate", iconType: "Code2" },
];

export const WORKFLOW_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Discovery & Architecture",
    description: "Deep dive into your exact business goals, user flow, feature list, and system design.",
  },
  {
    number: "02",
    title: "UI/UX & Interactive Design",
    description: "Designing modern, sleek, high-conversion interfaces tailored to your target audience.",
  },
  {
    number: "03",
    title: "Full-Stack Development",
    description: "Writing clean, scalable code with secure APIs, database modeling, and fast response times.",
  },
  {
    number: "04",
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing for responsiveness, cross-browser compatibility, security, and edge cases.",
  },
  {
    number: "05",
    title: "Launch & Continuous Support",
    description: "Live cloud deployment, domain setup, client walk-through, and reliable ongoing support.",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    clientName: "David Henderson",
    role: "Founder & CEO",
    companyOrPlatform: "SaaS Enterprise",
    review:
      "Arooba developed our AI-powered SaaS dashboard ahead of schedule. The architecture is clean, responsive, and handles thousands of active queries effortlessly. Highly recommended for any serious web application!",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Sara Al-Mansoor",
    role: "Operations Director",
    companyOrPlatform: "Hospitality Group",
    review:
      "The hotel management and booking system delivered by Arooba transformed our operations. Guests love the clean interface and our staff saves hours every day with the automated admin control.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Marcus Vance",
    role: "Product Lead",
    companyOrPlatform: "E-Commerce Brand",
    review:
      "From database design to frontend animations, Arooba was exceptionally thorough. Our online store's conversion rate increased by 35% right after launch.",
    rating: 5,
  },
];
