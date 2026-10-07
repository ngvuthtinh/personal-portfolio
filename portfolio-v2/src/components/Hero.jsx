import { motion } from "framer-motion";
import { FiDownload, FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "../data";

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <motion.h1 {...fade(0.2)}>
            Hi, I'm<br />
            <span className="grad-text hero-name">{profile.short}</span>
          </motion.h1>
          <motion.p className="hero-role" {...fade(0.3)}>
            {profile.title}
          </motion.p>
          <motion.p className="hero-tagline" {...fade(0.4)}>
            {profile.tagline}
          </motion.p>
          <motion.p className="hero-summary" {...fade(0.5)}>
            {profile.summary}
          </motion.p>
          <motion.div className="hero-cta" {...fade(0.6)}>
            <a href={profile.cv} download className="btn btn-primary">
              <FiDownload /> Download CV
            </a>
            <a href="#work" className="btn">
              View work <FiArrowDown />
            </a>
          </motion.div>
          <motion.div className="hero-social" {...fade(0.7)}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><HiOutlineMail /></a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="avatar-orbit">
            <span className="ring ring-1"><i /></span>
            <span className="ring ring-2"><i /></span>
            <div className="sun">
              <img src="/avatar.png" alt={profile.name} />
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
