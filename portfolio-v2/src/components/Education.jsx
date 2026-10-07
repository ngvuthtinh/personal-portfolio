import Reveal, { SectionTitle } from "./Reveal";
import { education as edu } from "../data";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle index="04">Education</SectionTitle>
        <Reveal className="edu-row">
          <div className="edu-head">
            <img className="edu-logo" src={edu.logo} alt="International University logo" width="64" height="64" loading="lazy" />
            <h3 className="edu-school">{edu.school}</h3>
          </div>
          <p className="edu-period">{edu.period}</p>
          <p className="edu-degree">{edu.degree}</p>
        </Reveal>
      </div>
    </section>
  );
}
