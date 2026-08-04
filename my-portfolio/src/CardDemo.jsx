import { useState, useRef } from "react";

export default function CardDemo() {
  const [rotationCount, setRotationCount] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sceneRef = useRef(null);

  const menuItems = [
    { id: "home", label: "Front" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "tech", label: "Stack" },
    { id: "projects", label: "Projects" },
    { id: "activities", label: "Activities" },
    { id: "contact", label: "Contact" },
  ];

  const handleMouseMove = (e) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleCardClick = () => {
    const nextRotation = rotationCount + 1;
    const nextIndex = nextRotation % menuItems.length;
    setRotationCount(nextRotation);
    setActiveTab(menuItems[nextIndex].id);
  };

  const handleTabClick = (targetId) => {
    if (targetId === activeTab) return;
    const targetIndex = menuItems.findIndex((item) => item.id === targetId);
    const currentMod = rotationCount % menuItems.length;
    let diff = targetIndex - currentMod;
    if (diff < 0) diff += menuItems.length;
    const nextRotation = rotationCount + diff;
    setRotationCount(nextRotation);
    setActiveTab(targetId);
  };

  const renderBatemanHomeCard = () => (
    <div className="w-full h-full p-10 flex flex-col justify-between">
      <div className="flex justify-between items-start ink-raised">
        <div className="text-[1.15rem] tracking-wider mt-1">098 765 4321</div>
        <div className="text-right flex flex-col items-end">
          <div className="text-[1.35rem] small-caps tracking-bateman">Independent Developer</div>
          <div className="text-[0.75rem] small-caps tracking-widest mt-1">Software Engineering</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ink-raised -mt-4">
        <h1 className="text-[2.2rem] md:text-[2.5rem] small-caps tracking-bateman font-medium">Nguyen Vu Thanh Tinh</h1>
        <p className="mt-4 text-[1.1rem] md:text-[1.25rem] small-caps tracking-bateman">Software Engineer</p>
      </div>
      <div className="flex justify-center items-end pb-2 ink-raised">
        <p className="text-[0.9rem] small-caps tracking-widest text-center">
          123 Nguyen Van Cu, Ho Chi Minh City, VN 700000{" "}
          <span className="mx-2">GitHub</span> TINH-NVT{" "}
          <span className="mx-2">LinkedIn</span> IN/TINH-NVT
        </p>
      </div>
    </div>
  );

  const renderSectionContent = (tab) => {
    switch (tab) {
      case "about":
        return (
          <div className="flex flex-col items-center justify-center ink-raised w-full h-full p-10 md:p-16">
            <div className="w-3/4 text-center relative">
              <span className="text-6xl text-gray-400 font-serif leading-none absolute -ml-8 -mt-4">"</span>
              <p className="text-xl md:text-2xl italic leading-relaxed text-gray-800 relative z-10">
                There is an idea of a software engineer, some kind of abstraction, but there is no real me, only an entity, something illusory.
                <br /><br />I build systems that are flawless, yet I am not there.
              </p>
              <span className="text-6xl text-gray-400 font-serif leading-none absolute ml-2 mt-2">"</span>
            </div>
            <p className="mt-8 text-sm small-caps tracking-widest border-t border-gray-400 pt-2">— Tinh Nguyen —</p>
          </div>
        );
      case "education":
        return (
          <div className="flex flex-col items-center justify-center ink-raised w-full h-full p-10 md:p-16">
            <h2 className="text-2xl small-caps tracking-bateman border-b border-black pb-2 mb-10 inline-block">Education</h2>
            <div className="space-y-4 text-center">
              <p className="text-[1.4rem] small-caps tracking-bateman">International University - VNU HCMC</p>
              <p className="text-xl">Major: Computer Science</p>
              <p className="italic text-gray-700 text-lg">Expected Graduation: September 2027</p>
            </div>
          </div>
        );
      case "tech":
        return (
          <div className="flex flex-col items-center justify-center ink-raised w-full h-full p-10 md:p-16">
            <h2 className="text-2xl small-caps tracking-bateman border-b border-black pb-2 mb-8 inline-block">Technical Expertise</h2>
            <div className="w-full max-w-3xl grid grid-cols-2 gap-x-12 gap-y-6 text-left px-8">
              {[["Languages", "JavaScript, TypeScript, Python, C++, SQL"], ["Frameworks", "React.js, Next.js, Express, FastAPI, Tailwind"], ["Infrastructure", "Docker, AWS (EC2, S3), Nginx, CI/CD"], ["Databases", "PostgreSQL, MySQL, MongoDB, Redis"]].map(([title, content]) => (
                <div key={title}>
                  <p className="small-caps tracking-bateman text-lg font-bold mb-2 border-b border-gray-300 inline-block">{title}</p>
                  <p className="text-gray-800 text-lg">{content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="flex flex-col items-center ink-raised w-full h-full overflow-hidden p-10 md:p-14">
            <h2 className="text-2xl small-caps tracking-bateman border-b border-black pb-2 mb-6 inline-block">Selected Works</h2>
            <div className="flex w-full h-full gap-8 custom-scrollbar overflow-y-auto pb-4">
              <div className="w-5/12 flex items-start justify-center pt-2">
                <div className="p-2 bg-white border border-gray-300 shadow-md transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://placehold.co/400x280/e5e7eb/111111?text=Architecture+Preview" alt="Project" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
              <div className="w-7/12 text-left flex flex-col justify-start">
                <h3 className="text-[1.3rem] small-caps tracking-bateman font-bold">E-Commerce Microservices Revamp</h3>
                <p className="text-gray-600 italic text-sm mb-4">Next.js, Node.js, PostgreSQL, Docker</p>
                <p className="text-gray-800 text-[1.05rem] leading-relaxed mb-4">Architected and migrated a monolithic legacy system into a scalable microservices architecture, reducing transaction latency by 45%.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Implemented Redis caching for product catalogs.</li>
                  <li>Automated deployment pipeline via GitHub Actions.</li>
                </ul>
                <div className="mt-auto pt-4">
                  <a href="#" onClick={(e) => e.stopPropagation()} className="text-sm small-caps tracking-widest border-b border-black hover:text-gray-500 transition-colors">View Source Code</a>
                </div>
              </div>
            </div>
          </div>
        );
      case "activities":
        return (
          <div className="flex flex-col items-center justify-center ink-raised w-full h-full p-10 md:p-16">
            <h2 className="text-2xl small-caps tracking-bateman border-b border-black pb-2 mb-8 inline-block">Honors & Activities</h2>
            <div className="w-full max-w-2xl space-y-6 text-center">
              <div>
                <p className="font-bold text-xl small-caps tracking-bateman">Top Finalist - National Hackathon 2025</p>
                <p className="italic text-gray-600 mt-1">Lead Backend Developer</p>
                <p className="text-gray-800 text-lg mt-2">Developed an AI-driven logistics optimization API processing 10k+ requests/min under 48 hours.</p>
              </div>
              <div className="border-t border-gray-300 w-1/3 mx-auto my-3"></div>
              <div>
                <p className="font-bold text-xl small-caps tracking-bateman">Core Member - IT Club VNU</p>
                <p className="text-gray-800 text-lg mt-2">Organized coding bootcamps for 200+ freshmen and mentored juniors in Web Development.</p>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col items-center justify-center ink-raised w-full h-full p-10 md:p-16">
            <div className="border-4 border-double border-gray-400 p-8 md:p-10 text-center w-full max-w-2xl bg-white/30 backdrop-blur-sm">
              <h2 className="text-3xl small-caps tracking-bateman mb-6">Reservations & Inquiries</h2>
              <div className="space-y-3 mb-8">
                {[["Email.", "hello@tinhnguyen.dev"], ["Phone.", "+84 98 765 4321"], ["Office.", "Ho Chi Minh City, VN"]].map(([label, val]) => (
                  <p key={label} className="text-lg tracking-widest">
                    <span className="small-caps font-bold mr-4 text-gray-500">{label}</span>{val}
                  </p>
                ))}
              </div>
              <a href="#" onClick={(e) => e.stopPropagation()} className="inline-block border border-black px-6 py-3 small-caps tracking-bateman font-bold hover:bg-black hover:text-[#F8F6F0] transition-colors duration-500 shadow-sm">
                Extract Curriculum Vitae
              </a>
            </div>
          </div>
        );
      default:
        return renderBatemanHomeCard();
    }
  };

  const cardAngle = rotationCount * 180;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative select-none">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]"></div>

      <div
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-[900px] max-w-[95vw] h-[514px] max-h-[70vh] z-10"
        style={{ perspective: "2500px" }}
      >
        <div
          className="w-full h-full preserve-3d"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          <div
            onClick={handleCardClick}
            title="Click để lật sang trang tiếp theo"
            className="w-full h-full relative preserve-3d cursor-pointer shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8),_0_18px_36px_-18px_rgba(0,0,0,0.5)]"
            style={{ transformStyle: "preserve-3d", transform: `rotateY(${cardAngle}deg)`, transition: "transform 0.8s cubic-bezier(0.25,0.8,0.25,1)" }}
          >
            <div className="paper-texture absolute w-full h-full backface-hidden">
              <div className="w-full h-full">
                {activeTab === "home" ? renderBatemanHomeCard() : renderSectionContent(activeTab)}
              </div>
            </div>
            <div className="paper-texture absolute w-full h-full backface-hidden" style={{ transform: "rotateY(180deg)" }}>
              <div className="w-full h-full">
                {activeTab === "home" ? renderBatemanHomeCard() : renderSectionContent(activeTab)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 z-20 px-4">
        {menuItems.map((item, index) => (
          <div key={item.id} className="flex items-center gap-x-6">
            <button
              onClick={(e) => { e.stopPropagation(); handleTabClick(item.id); }}
              className={`small-caps tracking-[0.1em] text-sm transition-all duration-300 cursor-pointer ${activeTab === item.id ? "text-white font-semibold border-b border-white pb-0.5" : "text-gray-400 hover:text-white"
                }`}
            >
              {item.label}
            </button>
            {index < menuItems.length - 1 && <span className="text-gray-600">|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
