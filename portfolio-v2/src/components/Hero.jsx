import { FiDownload, FiArrowDown } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "../data";

// Entrance uses pure CSS keyframes (see .enter in index.css): content is never stuck
// hidden if JS animation frames are throttled or delayed.
const enter = (delay) => ({ className: "enter", style: { "--d": `${delay}s` } });

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1 {...enter(0.1)}>
            Hi, I'm<br />
            <span className="grad-text hero-name">{profile.short}</span>
          </h1>
          <p className="hero-role enter" style={{ "--d": "0.2s" }}>
            {profile.title}
          </p>
          <p className="hero-tagline enter" style={{ "--d": "0.3s" }}>
            {profile.tagline}
          </p>
          <p className="hero-summary enter" style={{ "--d": "0.4s" }}>
            {profile.summary}
          </p>
          <div className="hero-cta enter" style={{ "--d": "0.5s" }}>
            <a href={profile.cv} download className="btn btn-primary">
              <FiDownload /> Download CV
            </a>
            <a href="#work" className="btn">
              View work <FiArrowDown />
            </a>
          </div>
          <div className="hero-social enter" style={{ "--d": "0.6s" }}>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><HiOutlineMail /></a>
          </div>
        </div>

        <div className="hero-visual enter-scale" style={{ "--d": "0.15s" }}>
          <div className="avatar-orbit">
            <span className="ring ring-1"><i /></span>
            <span className="ring ring-2"><i /></span>
            <div className="sun">
              <img src="/avatar.webp" alt={profile.name} width="450" height="450" fetchPriority="high" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
