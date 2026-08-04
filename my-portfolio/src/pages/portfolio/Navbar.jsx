import { Link } from "react-router-dom";
import { IdCard } from "lucide-react";

export default function Navbar({ onResetIntro }) {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#tech", label: "Expertise" },
    { href: "#activities", label: "Honors" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onResetIntro) {
      onResetIntro();
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 py-4 px-8 md:px-12 flex justify-between items-center transition-all duration-300"
      style={{ backgroundColor: "rgba(248,246,240,0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-4">
        <a
          href="/"
          onClick={handleLogoClick}
          title="Back to 3D Intro Card"
          className="small-caps tracking-widest font-extrabold text-lg flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer text-[#111]"
          style={{ textDecoration: "none" }}
        >
          Ng Vu Thanh Tinh
        </a>
      </div>

      <div className="flex items-center gap-6 md:gap-8 text-sm small-caps tracking-widest font-bold text-[#111]">
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            style={{ textDecoration: "none", color: "#111", position: "relative" }}
            className="group cursor-pointer font-bold text-[#111] hover:text-black"
          >
            {label}
            <span
              style={{
                display: "block",
                position: "absolute",
                bottom: "-2px",
                left: 0,
                height: "1.5px",
                width: 0,
                backgroundColor: "#111",
                transition: "width 0.3s ease",
              }}
              className="group-hover:!w-full"
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
