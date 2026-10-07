import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiX } from "react-icons/fi";
import Reveal, { SectionTitle } from "./Reveal";
import { awards } from "../data";

export default function Awards() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => e.key === "Escape" && setPhoto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo]);

  return (
    <section id="awards" className="section">
      <div className="container">
        <SectionTitle index="03">Awards &amp; Achievements</SectionTitle>

        <div className="award-rows">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} className="award-row">
              <span className="award-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="award-info">
                <h3 className="award-name">{a.title}</h3>
                <p className="award-tags">{a.tags.join(" · ")}</p>
                <p className="award-desc">{a.desc}</p>
              </div>
              {a.link && (
                <a href={a.link} className="award-arrow" aria-label="See related work">
                  <FiArrowRight />
                </a>
              )}
              {a.image && (
                <button type="button" className="award-thumb" onClick={() => setPhoto(a)} aria-label="View photo">
                  <img src={a.thumb ?? a.image} alt={a.caption} width="480" height="570" loading="lazy" decoding="async" />
                </button>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {photo && (
          <motion.div
            className="lightbox"
            onClick={() => setPhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.figure
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={photo.image} alt={photo.caption} />
              <figcaption>{photo.caption}</figcaption>
              <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setPhoto(null)}>
                <FiX />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
