import { motion } from "framer-motion";
import { Trophy, Award, Users } from "lucide-react";

const activities = [
  {
    title: "Top Finalist - National Hackathon 2025",
    role: "Lead Backend Developer",
    icon: Award,
    description:
      "Engineered a highly available logistics API under pressure within 48 hours, recognized by industry leaders for code architecture.",
  },
  {
    title: "Core Member - IT Club VNU",
    role: "Technical Mentor",
    icon: Users,
    description:
      "Organized coding bootcamps for 200+ freshmen and mentored juniors in full-stack web development methodologies.",
  },
];

export default function Activities() {
  return (
    <section id="activities" className="py-24 px-8 md:px-24 max-w-5xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl small-caps tracking-bateman mb-16 inline-flex items-center gap-3 border-b-2 border-[#D4AF37] pb-2 text-[#111]"
      >
        <Trophy className="w-7 h-7 text-[#D4AF37]" />
        Honors & Activities
      </motion.h2>

      <div className="space-y-12">
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <h3 className="text-2xl small-caps font-bold tracking-widest flex items-center justify-center gap-2 text-[#111]">
                <Icon className="w-5 h-5 text-[#D4AF37] inline" />
                {act.title}
              </h3>
              <p className="italic text-[#D4AF37] font-medium mt-2">{act.role}</p>
              <p className="text-lg text-gray-800 mt-3 max-w-3xl mx-auto">{act.description}</p>
              {i < activities.length - 1 && (
                <div className="w-20 h-[1px] bg-[#D4AF37]/40 mx-auto mt-12" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
