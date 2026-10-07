import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "", as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      {...rest}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
