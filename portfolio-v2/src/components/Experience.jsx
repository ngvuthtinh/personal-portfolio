import Reveal, { SectionTitle } from "./Reveal";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle index="01">Experience</SectionTitle>
        {experience.map((job) => (
          <Reveal key={job.company} className="job">
            <div className="job-meta">
              <p className="job-period">{job.period}</p>
              <h3 className="job-company">{job.company}</h3>
              <p className="job-role">{job.role}</p>
            </div>
            <div className="job-body">
              <p className="job-project">{job.project}</p>
              <div className="chips">
                {job.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <ul className="bullets">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
