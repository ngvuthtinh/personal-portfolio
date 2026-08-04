import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 md:px-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative text-center ink-raised"
      >
        <span className="text-8xl text-gray-300 font-serif leading-none absolute top-[-40px] left-[10%] opacity-50 select-none">
          "
        </span>
        <p className="text-3xl md:text-4xl italic leading-relaxed text-gray-800 relative z-10 font-light">
          There is an idea of a software engineer, some kind of abstraction, but
          there is no real me, only an entity, something illusory.
          <br />
          <br />I build systems that are flawless, yet I am not there.
        </p>
        <span className="text-8xl text-gray-300 font-serif leading-none absolute bottom-[-40px] right-[10%] opacity-50 select-none">
          "
        </span>
      </motion.div>
    </section>
  );
}
