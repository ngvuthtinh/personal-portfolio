import {
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiC, SiNodedotjs, SiSailsdotjs, SiExpress,
  SiFastapi, SiSocketdotio, SiJsonwebtokens, SiReact, SiHtml5, SiCss, SiTailwindcss,
  SiLangchain, SiMongodb, SiMysql, SiPostgresql, SiRedis, SiFirebase,
  SiGit, SiGithub, SiGitlab, SiPostman, SiDocker,
} from "react-icons/si";
import { TbApi, TbBrandOpenai, TbBrandReactNative, TbDatabaseSearch, TbVector, TbRobot } from "react-icons/tb";

// Every category orbits on one ring of the 3D system (orbit = ring index, inner → outer)
export const categories = [
  {
    label: "Languages",
    orbit: 0,
    items: [
      { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { name: "Python", Icon: SiPython, color: "#ffd43b" },
      { name: "Java", Icon: SiOpenjdk, color: "#f89820" },
      { name: "C", Icon: SiC, color: "#a8b9cc" },
    ],
  },
  {
    label: "Backend",
    orbit: 1,
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Sails.js (Waterline)", Icon: SiSailsdotjs, color: "#14acc2" },
      { name: "Express.js", Icon: SiExpress, color: "#e6e6e6" },
      { name: "FastAPI", Icon: SiFastapi, color: "#05998b" },
      { name: "REST APIs", Icon: TbApi, color: "#a78bfa" },
      { name: "JWT / RBAC", Icon: SiJsonwebtokens, color: "#f472b6" },
      { name: "Socket.io", Icon: SiSocketdotio, color: "#e6e6e6" },
    ],
  },
  {
    label: "Frontend & Mobile",
    orbit: 1,
    items: [
      { name: "React.js", Icon: SiReact, color: "#61dafb" },
      { name: "React Native", Icon: TbBrandReactNative, color: "#61dafb" },
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", Icon: SiCss, color: "#2965f1" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
    ],
  },
  {
    label: "AI & LLM",
    orbit: 2,
    items: [
      { name: "LangChain.js", Icon: SiLangchain, color: "#7fc8a9" },
      { name: "OpenAI API", Icon: TbBrandOpenai, color: "#e5e7eb" },
      { name: "RAG", Icon: TbDatabaseSearch, color: "#67e8f9" },
      { name: "Vector Search", Icon: TbVector, color: "#a78bfa" },
      { name: "Agentic workflows", Icon: TbRobot, color: "#67e8f9" },
    ],
  },
  {
    label: "Databases",
    orbit: 2,
    items: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
      { name: "Redis", Icon: SiRedis, color: "#ff4438" },
      { name: "Firebase", Icon: SiFirebase, color: "#ffca28" },
    ],
  },
  {
    label: "DevOps & Tools",
    orbit: 3,
    items: [
      { name: "Docker", Icon: SiDocker, color: "#2496ed" },
      { name: "Git", Icon: SiGit, color: "#f05032" },
      { name: "GitHub", Icon: SiGithub, color: "#e6e6e6" },
      { name: "GitLab", Icon: SiGitlab, color: "#fc6d26" },
      { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
    ],
  },
];

// r = orbit radius (3D units); speed = rad/s (negative = reverse); tilt = [x, z] inclination
const rings = [
  { r: 2.6, speed: 0.36, tilt: [0.12, -0.08] },
  { r: 4.3, speed: -0.24, tilt: [-0.1, 0.14] },
  { r: 6.0, speed: 0.18, tilt: [0.06, 0.1] },
  { r: 7.5, speed: 0.15, tilt: [-0.05, -0.06] },
];

export const orbits = rings.map((ring, i) => ({
  ...ring,
  planets: categories.filter((c) => c.orbit === i).flatMap((c) => c.items),
}));
