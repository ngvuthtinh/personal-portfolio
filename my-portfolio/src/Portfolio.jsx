import { useState, useRef, useEffect } from "react";

export default function Portfolio() {
  const [phase, setPhase] = useState("intro"); // "intro" | "exploding" | "portfolio"
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const sceneRef = useRef(null);

  // Khi click vào thẻ intro: kích hoạt transition cinematic
  const handleIntroCardClick = () => {
    if (phase !== "intro") return;
    setPhase("exploding");

    // Sau 1s (thẻ đang lật & phóng to), bắt đầu fade portfolio vào
    setTimeout(() => {
      setPhase("portfolio");
      window.scrollTo(0, 0);
    }, 1400);
  };

  const handleMouseMove = (e) => {
    if (!sceneRef.current || phase !== "intro") return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotateX: ((y - centerY) / centerY) * -12,
      rotateY: ((x - centerX) / centerX) * 12,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Ngăn scroll khi đang ở intro
  useEffect(() => {
    if (phase !== "portfolio") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [phase]);

  return (
    <>
      {/* =============================================== */}
      {/* INTRO SCREEN: TẤM DANH THIẾP 3D                */}
      {/* =============================================== */}
      {phase !== "portfolio" && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(circle at 50% 50%, #2a2a2c 0%, #111111 100%)",
            opacity: phase === "exploding" ? 0 : 1,
            transition: phase === "exploding" ? "opacity 1.5s ease-in-out 0.5s, background-color 0.5s" : "none",
            backgroundColor: phase === "exploding" ? "#F8F6F0" : undefined,
          }}
        >
          {/* Ambient light overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

          {/* Scene 3D */}
          <div
            ref={sceneRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-[800px] max-w-[90vw] h-[457px] max-h-[60vh]"
            style={{ perspective: "2500px" }}
          >
            {/* Tilt wrapper */}
            <div
              className="w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25,0.8,0.25,1)",
              }}
            >
              {/* Tấm thẻ */}
              <div
                onClick={handleIntroCardClick}
                className="paper-texture w-full h-full cursor-pointer p-12 flex flex-col justify-between"
                style={{
                  boxShadow: "0 30px 60px -12px rgba(0,0,0,0.8), 0 18px 36px -18px rgba(0,0,0,0.5)",
                  transformOrigin: "center center",
                  transform: phase === "exploding"
                    ? "rotateY(180deg) scale(15)"
                    : "rotateY(0deg) scale(1)",
                  transition: phase === "exploding"
                    ? "transform 1.5s cubic-bezier(0.8,0,0.2,1)"
                    : "transform 0.3s ease",
                  opacity: phase === "exploding" ? 0 : 1,
                }}
              >
                {/* Top Row */}
                <div className="flex justify-between items-start ink-raised">
                  <div className="text-[1.2rem] tracking-wider mt-1">098 765 4321</div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-[1.4rem] small-caps tracking-bateman">Independent Developer</div>
                    <div className="text-[0.8rem] small-caps tracking-widest mt-1">Software Engineering</div>
                  </div>
                </div>

                {/* Center Row */}
                <div className="flex flex-col items-center justify-center ink-raised -mt-4">
                  <h1 className="text-[2.6rem] small-caps tracking-bateman font-medium">Nguyen Vu Thanh Tinh</h1>
                  <p className="mt-4 text-[1.2rem] small-caps tracking-bateman">Software Engineer</p>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-center items-end pb-2 ink-raised">
                  <p className="text-[0.9rem] small-caps tracking-widest text-center">
                    123 Nguyen Van Cu, Ho Chi Minh City, VN 700000
                    <span className="mx-3">·</span> GitHub: TINH-NVT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hint text */}
          <p
            className="mt-10 z-10 text-sm small-caps tracking-widest"
            style={{
              color: "rgba(255,255,255,0.5)",
              animation: "pulse 2s infinite",
              opacity: phase === "exploding" ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          >
            [ Click the card to view portfolio ]
          </p>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
          `}</style>
        </div>
      )}

      {/* =============================================== */}
      {/* MAIN PORTFOLIO: TRANG WEB CHÍNH                */}
      {/* =============================================== */}
      <div
        className="paper-texture min-h-screen"
        style={{
          backgroundColor: "#F8F6F0",
          color: "#111",
          fontFamily: "'EB Garamond', serif",
          opacity: phase === "portfolio" ? 1 : 0,
          visibility: phase === "portfolio" ? "visible" : "hidden",
          transition: "opacity 2s ease-in-out 0.5s",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Navigation */}
        <nav
          className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 py-6 px-12 flex justify-between items-center"
          style={{ backgroundColor: "rgba(248,246,240,0.92)", backdropFilter: "blur(8px)" }}
        >
          <div className="small-caps tracking-widest font-bold text-lg">T. Nguyen</div>
          <div className="flex gap-8 text-sm small-caps tracking-widest">
            {["about","projects","tech","activities","contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative group"
                style={{ textDecoration: "none", color: "#111" }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1).replace("tech","Expertise").replace("activities","Honors")}
                <span
                  className="absolute bottom-[-2px] left-0 h-[1px] bg-black"
                  style={{ width: 0, transition: "width 0.3s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.width = "100%"}
                  onMouseLeave={(e) => e.currentTarget.style.width = "0"}
                />
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-20">
          <h1 className="text-6xl md:text-8xl small-caps tracking-bateman ink-raised mb-6">Thanh Tinh</h1>
          <p className="text-xl md:text-2xl italic tracking-widest text-gray-700 max-w-2xl">
            Crafting flawless digital architectures.
          </p>
          <div className="w-16 h-[1px] bg-black my-12" />
        </section>

        {/* About / Quote */}
        <section id="about" className="py-24 px-8 md:px-24 max-w-6xl mx-auto">
          <div className="relative text-center ink-raised">
            <span className="text-8xl text-gray-300 font-serif leading-none absolute top-[-40px] left-[10%] opacity-50">"</span>
            <p className="text-3xl md:text-4xl italic leading-relaxed text-gray-800 relative z-10 font-light">
              There is an idea of a software engineer, some kind of abstraction, but there is no real me, only an entity, something illusory.
              <br /><br />
              I build systems that are flawless, yet I am not there.
            </p>
            <span className="text-8xl text-gray-300 font-serif leading-none absolute bottom-[-40px] right-[10%] opacity-50">"</span>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-8 md:px-24 max-w-7xl mx-auto border-t border-gray-300">
          <h2 className="text-3xl small-caps tracking-bateman mb-16 inline-block border-b-2 border-black pb-2">Selected Works</h2>
          <div className="space-y-32">
            {/* Project 1 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden border border-gray-300 p-2 bg-white shadow-lg group">
                  <img
                    src="https://placehold.co/800x500/e5e7eb/111111?text=Architecture+Diagram"
                    alt="Project 1"
                    className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-sm small-caps tracking-widest text-gray-500 mb-2">2025</p>
                <h3 className="text-3xl small-caps tracking-bateman font-bold mb-4">E-Commerce Microservices</h3>
                <p className="text-gray-600 italic text-sm mb-6 pb-4 border-b border-gray-200">Next.js, Node.js, PostgreSQL, Docker</p>
                <p className="text-lg leading-relaxed text-gray-800 mb-6">
                  Architected and migrated a monolithic legacy system into a scalable microservices architecture. Designed the core payment gateway integration, reducing transaction latency by 45% and ensuring zero downtime during peak traffic.
                </p>
                <a href="#" className="inline-block w-max text-sm small-caps tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
                  View Case Study
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden border border-gray-300 p-2 bg-white shadow-lg group">
                  <img
                    src="https://placehold.co/800x500/e5e7eb/111111?text=AI+Dashboard"
                    alt="Project 2"
                    className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-sm small-caps tracking-widest text-gray-500 mb-2">2026</p>
                <h3 className="text-3xl small-caps tracking-bateman font-bold mb-4">AI Logistics Optimizer</h3>
                <p className="text-gray-600 italic text-sm mb-6 pb-4 border-b border-gray-200">Python, FastAPI, Redis, React</p>
                <p className="text-lg leading-relaxed text-gray-800 mb-6">
                  Developed a real-time routing algorithm API processing 10k+ requests/minute. The system utilizes machine learning models to predict traffic patterns and optimize delivery routes for a fleet of 500+ vehicles.
                </p>
                <a href="#" className="inline-block w-max text-sm small-caps tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack & Education */}
        <section className="py-24 px-8 md:px-24 border-y border-gray-300" style={{ backgroundColor: "#EFECE5" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Education */}
            <div id="education">
              <h2 className="text-3xl small-caps tracking-bateman mb-12 inline-block border-b-2 border-black pb-2">Education</h2>
              <div className="mb-8">
                <h3 className="text-xl small-caps font-bold tracking-widest">International University - VNU HCMC</h3>
                <p className="text-lg mt-2 text-gray-800">Bachelor of Computer Science</p>
                <p className="italic text-gray-600 mt-1">Expected Graduation: September 2027</p>
              </div>
            </div>

            {/* Expertise */}
            <div id="tech">
              <h2 className="text-3xl small-caps tracking-bateman mb-12 inline-block border-b-2 border-black pb-2">Technical Expertise</h2>
              <div className="grid grid-cols-2 gap-8">
                {[
                  ["Languages", ["JavaScript / TypeScript", "Python", "C++", "SQL"]],
                  ["Frameworks", ["React.js & Next.js", "Node.js & Express", "FastAPI", "Tailwind CSS"]],
                  ["Infrastructure", ["Docker", "AWS (EC2, S3)", "Nginx"]],
                  ["Databases", ["PostgreSQL", "MySQL", "MongoDB & Redis"]],
                ].map(([cat, items]) => (
                  <div key={cat}>
                    <p className="small-caps tracking-bateman font-bold text-gray-500 mb-2">{cat}</p>
                    <ul className="text-lg space-y-1">
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Honors & Activities */}
        <section id="activities" className="py-24 px-8 md:px-24 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl small-caps tracking-bateman mb-16 inline-block border-b-2 border-black pb-2">Honors & Activities</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl small-caps font-bold tracking-widest">Top Finalist - National Hackathon 2025</h3>
              <p className="italic text-gray-600 mt-2">Lead Backend Developer</p>
              <p className="text-lg text-gray-800 mt-3 max-w-3xl mx-auto">Engineered a highly available logistics API under pressure within 48 hours, recognized by industry leaders for code architecture.</p>
            </div>
            <div className="w-16 h-[1px] bg-gray-400 mx-auto" />
            <div>
              <h3 className="text-2xl small-caps font-bold tracking-widest">Core Member - IT Club VNU</h3>
              <p className="italic text-gray-600 mt-2">Technical Mentor</p>
              <p className="text-lg text-gray-800 mt-3 max-w-3xl mx-auto">Organized coding bootcamps for 200+ freshmen and mentored juniors in full-stack web development methodologies.</p>
            </div>
          </div>
        </section>

        {/* Contact & Footer */}
        <section id="contact" className="py-32 px-8 text-center" style={{ backgroundColor: "#1a1a1a", color: "#F8F6F0" }}>
          <div className="max-w-3xl mx-auto border-4 border-double border-gray-600 p-16">
            <h2 className="text-4xl small-caps tracking-bateman mb-12" style={{ color: "white" }}>Reservations & Inquiries</h2>
            <div className="space-y-6 mb-16">
              {[["Email.", "hello@tinhnguyen.dev"],["Phone.", "+84 98 765 4321"],["Office.", "Ho Chi Minh City, VN"]].map(([label, val]) => (
                <p key={label} className="text-xl tracking-widest">
                  <span className="small-caps text-gray-400 mr-4">{label}</span>{val}
                </p>
              ))}
            </div>
            <a
              href="#"
              className="inline-block border px-8 py-4 small-caps tracking-widest text-lg transition-all duration-500"
              style={{ borderColor: "#F8F6F0" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8F6F0"; e.currentTarget.style.color = "#111"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#F8F6F0"; }}
            >
              Extract Curriculum Vitae
            </a>
          </div>
          <p className="mt-20 text-sm small-caps tracking-widest text-gray-500">
            © 2026 Nguyen Vu Thanh Tinh. Designed meticulously.
          </p>
        </section>
      </div>
    </>
  );
}
