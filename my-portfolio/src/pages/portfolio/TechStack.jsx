import { motion } from "framer-motion";
import { GraduationCap, Cpu, Terminal, Layout, Server, Database } from "lucide-react";

const techCategories = [
  {
    label: "Languages",
    icon: Terminal,
    items: ["JavaScript / TypeScript", "Python", "C++", "SQL"],
  },
  {
    label: "Frameworks",
    icon: Layout,
    items: ["React.js & Next.js", "Node.js & Express", "FastAPI", "Tailwind CSS"],
  },
  {
    label: "Infrastructure",
    icon: Server,
    items: ["Docker", "AWS (EC2, S3)", "Nginx"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB & Redis"],
  },
];

export default function TechStack() {
  return (
    <section className="py-24 px-8 md:px-24 border-y border-gray-300" style={{ backgroundColor: "#EFECE5" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        {/* Education */}
        <motion.div
          id="education"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl small-caps tracking-bateman mb-12 inline-flex items-center gap-3 border-b-2 border-black pb-2">
            <GraduationCap className="w-7 h-7 text-gray-800" />
            Education
          </h2>
          <div className="mb-8">
            <h3 className="text-xl small-caps font-bold tracking-widest">
              International University - VNU HCMC
            </h3>
            <p className="text-lg mt-2 text-gray-800">Bachelor of Computer Science</p>
            <p className="italic text-gray-600 mt-1">Expected Graduation: September 2027</p>
          </div>
        </motion.div>

        {/* Expertise */}
        <motion.div
          id="tech"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl small-caps tracking-bateman mb-12 inline-flex items-center gap-3 border-b-2 border-black pb-2">
            <Cpu className="w-7 h-7 text-gray-800" />
            Technical Expertise
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {techCategories.map(({ label, icon: Icon, items }) => (
              <div key={label}>
                <p className="small-caps tracking-bateman font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-gray-700 inline" />
                  {label}
                </p>
                <ul className="text-lg space-y-1">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
