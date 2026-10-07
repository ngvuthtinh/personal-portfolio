import { useEffect, useRef, useState } from "react";

// Scroll reveal driven by IntersectionObserver + CSS transitions (no JS animation frames).
// A timer fallback guarantees content never stays hidden if the observer never fires.
const FALLBACK_MS = 3000;

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    let observed = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        observed = true;
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    // The observer always reports once right after observe(); if it hasn't, it is stalled
    const timer = setTimeout(() => {
      if (!observed) setShown(true);
    }, FALLBACK_MS);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ ...style, "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({ index, children }) {
  return (
    <Reveal className="section-title">
      <span className="idx">{index}</span>
      <h2>{children}</h2>
      <span className="title-line" />
    </Reveal>
  );
}
