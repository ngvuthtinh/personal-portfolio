import { lazy, Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { FiMove } from "react-icons/fi";
import Reveal, { SectionTitle } from "./Reveal";
import { categories } from "./techOrbits";

const TechUniverse = lazy(() => import("./TechUniverse"));


export default function Skills() {
  const stage = useRef(null);
  const near = useInView(stage, { margin: "200px" });
  const visible = useInView(stage);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle index="05">Tech Stack</SectionTitle>
        <div className="tech">
          <Reveal className="tech-stage">
            <div ref={stage} className="tech-canvas">
              {near && (
                <Suspense fallback={<div className="tech-loading">Loading universe…</div>}>
                  <TechUniverse active={visible} />
                </Suspense>
              )}
            </div>
            <p className="tech-hint">
              <FiMove /> Drag to rotate · scroll or pinch to zoom · hover a planet to pause
            </p>
          </Reveal>

          <Reveal className="tech-legend" delay={0.1}>
            {categories.map((c) => (
              <div key={c.label} className="legend-group">
                <p className="legend-label">
                  <span className="legend-ring" style={{ "--i": c.orbit }} />
                  {c.label}
                  <em>orbit {c.orbit + 1}</em>
                </p>
                <div className="chips">
                  {c.items.map(({ name, Icon, color }) => (
                    <span key={name} className="chip-icon">
                      <Icon style={{ color }} /> {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
