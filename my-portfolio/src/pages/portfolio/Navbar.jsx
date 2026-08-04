import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar({ onResetIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onResetIntro) {
      onResetIntro();
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      style={{ backgroundColor: "rgba(248,246,240,0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-4">
        <a
          href="/"
          onClick={handleLogoClick}
          title="Back to 3D Intro Card"
          className="small-caps tracking-widest font-extrabold text-base md:text-lg flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer text-[#111]"
          style={{ textDecoration: "none" }}
        >
          Ng Vu Thanh Tinh
        </a>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 md:gap-8 text-sm small-caps tracking-widest font-bold text-[#111]">
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

      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-[#111] p-1 focus:outline-none"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F8F5F1] border-b border-gray-300 shadow-lg py-6 px-8 flex flex-col gap-4 text-base small-caps tracking-widest font-bold text-[#111]">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1.5 border-b border-gray-200/80"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
