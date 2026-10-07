import { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data";

const links = [
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Awards", "#awards"],
  ["Education", "#education"],
  ["Tech Stack", "#skills"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 861px)");
    const onMq = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className={`nav ${open ? "is-open" : ""}`}>
      <div className="container nav-inner">
        <a className="logo" href="#top" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <nav className="nav-links" id="site-menu">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a href={profile.cv} download className="btn btn-sm">
            <FiDownload /> CV
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
