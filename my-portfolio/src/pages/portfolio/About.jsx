import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 md:px-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center ink-raised relative px-6"
      >
        <p className="text-2xl md:text-3xl italic leading-relaxed text-[#111] font-light">
          <span className="text-4xl md:text-5xl font-serif text-[#111] not-italic inline-block align-top mr-1">“</span>
          There is an idea of a software engineer, some kind of abstraction, but
          there is no real me, only an entity, something illusory.
          <br />
          <br />
          I build systems that are flawless, yet I am not there.
          <span className="text-4xl md:text-5xl font-serif text-[#111] not-italic inline-block align-bottom ml-1">”</span>
        </p>
      </motion.div>
    </section>
  );
}
