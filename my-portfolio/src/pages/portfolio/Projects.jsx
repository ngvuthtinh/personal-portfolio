import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Code2, Layers } from "lucide-react";

const projects = [
  {
    year: "2025",
    title: "E-Commerce Microservices",
    tags: "Next.js, Node.js, PostgreSQL, Docker",
    description:
      "Architected and migrated a monolithic legacy system into a scalable microservices architecture. Designed the core payment gateway integration, reducing transaction latency by 45% and ensuring zero downtime during peak traffic.",
    image: "https://placehold.co/800x500/e5e7eb/111111?text=Architecture+Diagram",
    link: "#",
    linkLabel: "View Case Study",
    reverse: false,
  },
  {
    year: "2026",
    title: "AI Logistics Optimizer",
    tags: "Python, FastAPI, Redis, React",
    description:
      "Developed a real-time routing algorithm API processing 10k+ requests/minute. The system utilizes machine learning models to predict traffic patterns and optimize delivery routes for a fleet of 500+ vehicles.",
    image: "https://placehold.co/800x500/e5e7eb/111111?text=AI+Dashboard",
    link: "#",
    linkLabel: "View GitHub",
    reverse: true,
  },
];

function ProjectCard({ project }) {
  const { year, title, tags, description, image, link, linkLabel, reverse } = project;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
    >
      <div className="w-full md:w-1/2">
        <div className="overflow-hidden border border-gray-300 p-1.5 sm:p-2 bg-white shadow-lg group">
          <img
            src={image}
            alt={title}
            className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <p className="text-xs sm:text-sm small-caps tracking-widest text-gray-600 mb-2 flex items-center gap-1.5 font-bold">
          <Calendar className="w-3.5 h-3.5 inline text-[#D4AF37]" />
          {year}
        </p>
        <h3 className="text-2xl sm:text-3xl small-caps tracking-bateman font-bold mb-3 md:mb-4 text-[#111]">{title}</h3>
        <p className="text-gray-700 italic text-xs sm:text-sm mb-4 pb-3 border-b border-gray-200 flex items-center gap-1.5 font-medium">
          <Code2 className="w-4 h-4 text-[#D4AF37] inline shrink-0" />
          {tags}
        </p>
        <p className="text-base sm:text-[1.15rem] leading-[1.7] text-[#111] mb-6 font-medium">{description}</p>
        <a
          href={link}
          className="inline-flex items-center gap-2 w-max text-xs sm:text-sm small-caps tracking-widest border border-black px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-black hover:text-white transition-colors group font-bold"
        >
          {linkLabel}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D4AF37]" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-t border-gray-300">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl small-caps tracking-bateman mb-12 sm:mb-16 inline-flex items-center gap-3 border-b-2 border-[#D4AF37] pb-2 text-[#111] font-bold"
      >
        <Layers className="w-6 h-6 text-[#D4AF37]" />
        Selected Works
      </motion.h2>

      <div className="space-y-20 sm:space-y-32">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
