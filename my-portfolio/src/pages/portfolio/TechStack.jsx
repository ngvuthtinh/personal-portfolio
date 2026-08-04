import { motion } from "framer-motion";
import { Cpu, Terminal, Layers, Database, Package } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiExpo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiVercel,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
} from "react-icons/si";
import { FaJava, FaGlobe } from "react-icons/fa";

const techCategories = [
  {
    label: "Languages",
    icon: Terminal,
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
    ],
  },
  {
    label: "Frameworks & Architecture",
    icon: Layers,
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Sails.js", icon: Layers },
      { name: "React.js", icon: SiReact },
      { name: "Expo", icon: SiExpo },
      { name: "REST API", icon: FaGlobe },
    ],
  },
  {
    label: "Databases, Cloud & DevOps",
    icon: Database,
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    label: "Developer Tools",
    icon: Package,
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "NPM", icon: SiNpm },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-8 md:px-24 border-t border-gray-300 bg-[#F4F0EC]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl small-caps tracking-bateman inline-flex items-center gap-3 border-b-2 border-[#D4AF37] pb-2 text-[#111]">
              <Cpu className="w-7 h-7 text-[#D4AF37]" />
              Technical Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {techCategories.map(({ label, icon: CategoryIcon, items }) => (
              <div key={label} className="flex flex-col">
                {/* Header nhóm công nghệ */}
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D4AF37]/40">
                  <CategoryIcon className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="small-caps tracking-bateman font-bold text-lg text-[#111]">
                    {label}
                  </h3>
                </div>

                {/* Danh sách Kĩ năng với Official Brand Icons từ react-icons */}
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-gray-300/80 bg-white/70 text-xs md:text-sm font-medium text-gray-900 shadow-2xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
                      >
                        <ItemIcon className="w-4 h-4 text-[#D4AF37]" />
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
