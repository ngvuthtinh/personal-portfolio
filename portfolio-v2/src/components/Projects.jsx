import { FiArrowUpRight, FiAward } from "react-icons/fi";
import Reveal, { SectionTitle } from "./Reveal";
import { projects } from "../data";

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionTitle index="02">Work</SectionTitle>
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="pcard" onMouseMove={spotlight}>
              <div className="pcard-head">
                <span className="pcard-kind">{p.kind}</span>
                <span className="pcard-meta">{p.meta}</span>
              </div>
              <h3 className="pcard-name">{p.name}</h3>
              {p.award && (
                <a href="#awards" className="pcard-award">
                  <FiAward /> {p.award}
                </a>
              )}
              <p className="pcard-blurb">{p.blurb}</p>
              <ul className="bullets">
                {p.points.map((pt) =>
                  typeof pt === "string" ? (
                    <li key={pt}>{pt}</li>
                  ) : (
                    <li key={pt.lead}>
                      <strong>{pt.lead}:</strong> {pt.text}
                    </li>
                  )
                )}
              </ul>
              <div className="chips">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noreferrer" className="pcard-link">
                View on GitHub <FiArrowUpRight />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
