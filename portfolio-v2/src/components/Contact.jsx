import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Reveal, { SectionTitle } from "./Reveal";
import { profile } from "../data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionTitle index="06">Contact</SectionTitle>
        <Reveal as="h3" className="contact-heading">
          Let's build something <span className="grad-text">together</span>.
        </Reveal>

        <Reveal className="contact-links" delay={0.1}>
          <button type="button" className="contact-link" onClick={copyEmail}>
            <HiOutlineMail className="cl-icon" />
            <span className="cl-text">
              <small>Email</small>
              {profile.email}
            </span>
            {copied ? <FiCheck className="cl-end ok" /> : <FiCopy className="cl-end" />}
          </button>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin className="cl-icon" />
            <span className="cl-text">
              <small>LinkedIn</small>
              in/ngvuthtinh
            </span>
            <FiArrowUpRight className="cl-end" />
          </a>
          <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
            <FaGithub className="cl-icon" />
            <span className="cl-text">
              <small>GitHub</small>
              ngvuthtinh
            </span>
            <FiArrowUpRight className="cl-end" />
          </a>
          <a className="contact-link" href={profile.cv} download>
            <FiDownload className="cl-icon" />
            <span className="cl-text">
              <small>Resume</small>
              Download CV (PDF)
            </span>
            <FiArrowUpRight className="cl-end" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
