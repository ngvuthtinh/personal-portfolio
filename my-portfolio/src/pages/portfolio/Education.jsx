import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 px-6 sm:px-12 md:px-24 bg-[#F4F0EC] border-t border-gray-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl small-caps tracking-bateman mb-8 inline-flex items-center justify-center gap-3 border-b-2 border-[#D4AF37] pb-2 text-[#111] font-bold">
            <GraduationCap className="w-6 sm:w-7 h-6 sm:h-7 text-[#D4AF37]" />
            Education
          </h2>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl small-caps font-bold tracking-widest text-[#111]">
              International University - VNU HCMC
            </h3>
            <p className="text-lg sm:text-xl text-gray-800 font-medium">Bachelor of Computer Science</p>
            <p className="italic text-[#D4AF37] font-normal text-base sm:text-lg mt-1">Expected Graduation: September 2027</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
