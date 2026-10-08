import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FiMove } from "react-icons/fi";
import Reveal, { SectionTitle } from "./Reveal";
import { categories } from "./techOrbits";

const loadUniverse = () => import("./TechUniverse");
const TechUniverse = lazy(loadUniverse);


export default function Skills() {
  const stage = useRef(null);
  const near = useInView(stage, { margin: "800px" });
  const [prefetched, setPrefetched] = useState(false);

  // Fetch and mount the 3D scene in the background once the page is idle, so it is
  // ready before the visitor scrolls down. It stays paused (no rendering) while off-screen.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => loadUniverse().then(() => setPrefetched(true)), { timeout: 4000 });
    return () => cancel(id);
  }, []);
  const visible = useInView(stage);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle index="05">Tech Stack</SectionTitle>
        <div className="tech">
          <Reveal className="tech-stage">
            <div ref={stage} className="tech-canvas">
              {(near || prefetched) && (
                <Suspense fallback={<div className="tech-loading">Loading universe…</div>}>
                  <TechUniverse active={visible} />
                </Suspense>
              )}
            </div>
            <p className="tech-hint">
              <FiMove />
              <span className="hint-desktop">Drag to rotate · scroll to zoom · hover a planet to pause</span>
              <span className="hint-touch">Swipe sideways to rotate · use + / − to zoom</span>
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
