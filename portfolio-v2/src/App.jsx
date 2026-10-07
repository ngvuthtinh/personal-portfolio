import Starfield from "./components/Starfield";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "./data";

export default function App() {
  return (
    <>
      <Starfield />
      <div className="nebula" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Awards />
        <Education />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="footer-loc">
            <FiMapPin /> Based in {profile.location}
          </p>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`} aria-label="Email"><HiOutlineMail /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
