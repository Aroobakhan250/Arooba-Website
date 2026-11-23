/**
 * Case-study copy for each project, keyed by `PROJECTS_DATA[].id`.
 *
 * Everything here is written from what each project actually does (see
 * portfolioData.ts). Add real, verified numbers to `results` when you have them
 * (e.g. "Load time down 40%") and optionally `liveUrl` / `githubUrl` on the
 * project itself, and the page will pick them up automatically.
 */
export interface CaseStudy {
  /** One-line summary shown under the title. */
  tagline: string;
  /** The business problem the client had. */
  challenge: string;
  /** How the system was designed and built to solve it. */
  solution: string;
  /** Key capabilities, shown as a checklist. */
  features: string[];
  /** What the client got. Qualitative until real metrics are added. */
  results: { label: string; value: string }[];
  /** Short list of what I personally delivered. */
  role: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "lumina-ai": {
    tagline: "One AI workspace for voice, vision and chat in 30+ languages.",
    challenge:
      "Businesses serving international customers needed an AI assistant that could talk, read images and listen in many languages, without stitching together separate tools for each one.",
    solution:
      "I built a SaaS platform on React and Python that routes every request through a unified engine using Gemini and OpenAI. Users get a personal workspace with chat history, while admins get a control center to manage users, models and usage.",
    features: [
      "Voice, vision and text chat in a single interface",
      "30+ supported languages",
      "Gemini and OpenAI engine integration with a central router",
      "Personal user workspaces and saved conversations",
      "Admin control center for users and platform settings",
    ],
    results: [
      { label: "Languages", value: "30+" },
      { label: "Input modes", value: "Voice, vision, chat" },
      { label: "AI engines", value: "Gemini + OpenAI" },
    ],
    role: ["Product architecture", "Frontend (React)", "Backend (Python)", "AI integration"],
  },
  "solaria-ai": {
    tagline: "A conversational chatbot platform with a full admin dashboard.",
    challenge:
      "The client wanted their own branded AI chatbot, not a shared widget, with control over how it answers and visibility into how people use it.",
    solution:
      "I delivered a full-stack platform: a clean chat workspace for users on React, a PHP backend wired to the OpenAI API, and an admin dashboard where the chatbot's behaviour can be tuned and usage reviewed.",
    features: [
      "Modern multi-conversation chat workspace",
      "OpenAI API integration with custom instructions",
      "Admin dashboard with usage analytics",
      "Controls for fine-tuning chatbot behaviour",
      "Secure user accounts and sessions",
    ],
    results: [
      { label: "Delivery", value: "End to end" },
      { label: "Stack", value: "React + PHP" },
      { label: "Admin control", value: "Included" },
    ],
    role: ["UI design", "Frontend (React)", "Backend (PHP)", "OpenAI API integration"],
  },
  "pacman-game": {
    tagline: "A Python game engine where ghosts find the shortest path to you.",
    challenge:
      "A classic maze game only feels alive if the enemies are smart. The goal was a game engine with believable AI opponents, not scripted movement.",
    solution:
      "I wrote a custom Python engine from scratch. Ghosts use pathfinding algorithms to chase the player along the shortest route, and the engine handles level progression, scoring and game state in real time.",
    features: [
      "Algorithmic ghost AI using shortest-path search",
      "Multi-level progression with rising difficulty",
      "Real-time scoring system",
      "Custom game loop, collision and rendering",
    ],
    results: [
      { label: "Language", value: "Python" },
      { label: "AI", value: "Pathfinding" },
      { label: "Levels", value: "Multi-level" },
    ],
    role: ["Game engine design", "Pathfinding algorithms", "Level and scoring logic"],
  },
  "ecommerce-platform": {
    tagline: "A complete online store with a merchant admin dashboard.",
    challenge:
      "The client needed to sell online with a smooth shopping experience for customers and a simple way for staff to manage products and orders.",
    solution:
      "I built a React storefront backed by PHP and MySQL. Shoppers can browse categories, save items to a wishlist, use the cart and sign in securely. Staff manage everything from an admin dashboard.",
    features: [
      "Category navigation and product catalog",
      "Shopping cart and wishlist",
      "Secure customer registration and login",
      "Admin dashboard for products, orders and customers",
      "Responsive layout for mobile shoppers",
    ],
    results: [
      { label: "Storefront", value: "Cart + wishlist" },
      { label: "Backend", value: "PHP + MySQL" },
      { label: "Admin", value: "Full dashboard" },
    ],
    role: ["UI design", "Frontend (React)", "Backend and database (PHP, MySQL)", "Admin panel"],
  },
  "hotel-management": {
    tagline: "A luxury resort website with a booking engine and management portal.",
    challenge:
      "A resort needed a website that feels as premium as the property, plus a system so staff could stop managing bookings, housekeeping and revenue by hand.",
    solution:
      "I built a guest-facing site with room browsing and live availability, connected to a management portal. Bookings flow straight into the staff side, where housekeeping and occupancy reports live.",
    features: [
      "Room catalog with live availability calendar",
      "Online room booking flow",
      "Housekeeping logs for staff",
      "Revenue and occupancy reports",
      "Management portal with role-based access",
    ],
    results: [
      { label: "Guest side", value: "Online booking" },
      { label: "Staff side", value: "Management portal" },
      { label: "Reporting", value: "Revenue + occupancy" },
    ],
    role: ["UI/UX design", "Frontend (Next.js)", "Backend and database", "Management portal"],
  },
  "ai-attendance": {
    tagline: "Attendance that logs itself the moment a face is recognised.",
    challenge:
      "Manual registers are slow and easy to fake. The client wanted attendance recorded automatically and reliably, without anyone signing in.",
    solution:
      "I built a computer vision system in Python and OpenCV that reads a live camera feed, recognises known faces and writes the person, timestamp and status to the database automatically.",
    features: [
      "Real-time face detection from a live camera feed",
      "Recognition of registered people",
      "Automatic attendance log with timestamp and status",
      "Database storage ready for reporting",
      "Designed to extend to IoT cameras",
    ],
    results: [
      { label: "Check-in", value: "Automatic" },
      { label: "Tech", value: "Python + OpenCV" },
      { label: "Logging", value: "Timestamped" },
    ],
    role: ["Computer vision pipeline", "Recognition logic", "Database design"],
  },
  "saas-client-dashboard": {
    tagline: "Clients, projects, tasks and invoices in one dashboard.",
    challenge:
      "Running client work across spreadsheets, chat and separate invoicing tools made it hard to see what was happening at any moment.",
    solution:
      "I created a single operational platform in React and TypeScript. Clients, projects, a Kanban task board and automated invoices live together, and role-based permissions control who sees what.",
    features: [
      "Client and project management",
      "Kanban task board",
      "Automated invoice generation",
      "Role-based permissions",
      "Client portal view",
    ],
    results: [
      { label: "Tools replaced", value: "One dashboard" },
      { label: "Stack", value: "React + TypeScript" },
      { label: "Access", value: "Role-based" },
    ],
    role: ["Product design", "Frontend (React, TypeScript)", "Permissions model"],
  },
  "restaurant-website": {
    tagline: "A culinary showcase with online ordering and table booking.",
    challenge:
      "The restaurant took reservations and orders by phone, which cost time and lost customers at busy hours.",
    solution:
      "I built an elegant React and Tailwind site with a categorised menu, a real-time table reservation engine and an ordering cart. An admin tracker lets staff see and manage incoming orders.",
    features: [
      "Interactive categorised menu",
      "Real-time table reservation engine",
      "Online food ordering cart",
      "Admin order tracker",
      "Responsive on every screen size",
    ],
    results: [
      { label: "Bookings", value: "Online, real time" },
      { label: "Ordering", value: "Built-in cart" },
      { label: "Staff view", value: "Order tracker" },
    ],
    role: ["UI design", "Frontend (React, Tailwind CSS)", "Reservation and ordering logic"],
  },
};
