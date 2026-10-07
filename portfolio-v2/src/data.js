export const profile = {
  name: "Nguyen Vu Thanh Tinh",
  short: "Tinh Nguyen",
  title: "Software Engineer",
  location: "Ho Chi Minh City, Vietnam",
  email: "ngvuthtinh.work@gmail.com",
  github: "https://github.com/ngvuthtinh",
  linkedin: "https://www.linkedin.com/in/ngvuthtinh",
  cv: "/NguyenVuThanhTinh_Resume.pdf",
  tagline: "Software engineer focused on backend and real-time systems.",
  summary:
    "I build data-heavy management platforms, collaborative apps that sync live, and the APIs that hold them together.",
};

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "ZiniSoft Co., Ltd",
    period: "Jul 2026 — Present",
    project: "Kindie — kindergarten management platform",
    stack: ["Node.js (Sails.js)", "MongoDB", "React", "React Native", "GitLab"],
    points: [
      "Built the bulk Excel import for 10+ entity types (students, parents, classes, staff, menus, leave requests): a validate → preview → commit flow with row- and cell-level errors in the UI, and commits blocked until every error is resolved.",
      "Designed upsert matching on business keys that rejects ambiguous multi-match rows, with application-level rollback on failure.",
      "Implemented server-side sorting, filtering and pagination across ~20 list screens, including computed and cross-collection fields (invoice outstanding amount, student name).",
      "Delivered backend features, business-logic changes and UI fixes across the platform from the lead's requirements.",
    ],
  },
];

export const projects = [
  {
    name: "SalinAI",
    kind: "Agentic AI · IoT",
    blurb: "Agentic AI IoT system for smart agriculture",
    meta: "Team of 3 · Apr — May 2026",
    award: "2nd Runner-Up · GDGoC Hackathon Vietnam 2026",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Firebase", "LangChain.js", "Socket.io"],
    points: [
      "Designed a 4-agent pipeline (Researcher, Orchestrator, Planner, Evaluator) with LangChain.js that turns sensor data into irrigation and hardware-control decisions.",
      "Built a RAG pipeline on MongoDB Atlas Vector Search to ground irrigation guidance in retrieved technical documents instead of static rules.",
      "Added human-in-the-loop feedback memory (farmer feedback stored as lessons for later decisions), token-level reasoning streamed over Socket.io, and guardrails that block control actions in extreme weather.",
    ],
    link: "https://github.com/ngvuthtinh",
  },
  {
    name: "Taskora",
    kind: "Real-time · Full-stack",
    blurb: "Modern collaborative Kanban system",
    meta: "Personal project · Mar — Apr 2026",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    points: [
      { lead: "Seamless team sync", text: "A high-concurrency engine on Socket.io Rooms removes communication delays, so every board member sees UI updates instantly without refreshing." },
      { lead: "Optimized performance", text: "Cut API response time for complex card migrations by running database operations concurrently with Promise.all." },
      { lead: "Security architecture", text: "A security layer with JWT authentication and custom RBAC middleware manages granular workspace permissions." },
    ],
    link: "https://github.com/ngvuthtinh",
  },
];

export const education = {
  logo: "/iu-logo.webp",
  school: "International University",
  degree: "Bachelor of Science in Computer Science · Vietnam National University HCMC",
  period: "Sep 2023 — Sep 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Software Engineering",
    "Database Management",
    "Web Application Development",
    "Object-Oriented Analysis & Design",
  ],
};

export const awards = [
  {
    title: "Second Runner-Up — GDGoC Hackathon Vietnam 2026",
    tags: ["Agentic AI", "RAG", "IoT", "2026"],
    desc: "Built SalinAI, a multi-agent AI system that turns farm sensor data into irrigation decisions, and pitched it at the national finals.",
    image: "/gdgoc-hackathon-2026.webp",
    thumb: "/gdgoc-hackathon-2026-thumb.webp",
    caption: "Second Runner-Up at the GDGoC Hackathon Vietnam 2026 finals",
    link: "#work",
  },
  {
    title: "Academic Encouragement Scholarship",
    tags: ["International University", "VNU-HCMC", "Spring 2025"],
    desc: "Awarded for academic performance in the Computer Science program.",
  },
];
