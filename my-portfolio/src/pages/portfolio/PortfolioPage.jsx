import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import TechStack from "./TechStack";
import Activities from "./Activities";
import Contact from "./Contact";

export default function PortfolioPage({ skipIntro = false }) {
  // Kịch bản: "idle" | "flipping" | "scaling" | "fading" | "completed"
  const [phase, setPhase] = useState(skipIntro ? "completed" : "idle");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (phase !== "completed") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  const handleCardClick = () => {
    if (phase !== "idle") return;

    // Bước 3.1 - Lật mặt 180° (0ms -> 600ms)
    setPhase("flipping");

    // Bước 3.3 - Phóng to (Scale Up với cubic-bezier(0.76, 0, 0.24, 1) từ 600ms -> 1500ms)
    setTimeout(() => {
      setPhase("scaling");
    }, 600);

    // Bước 3.4 - Chuyển giao mượt mà Cross-fade (kích hoạt ở 1100ms khi scale đạt 90%)
    setTimeout(() => {
      setPhase("fading");
    }, 1100);

    // Bước 3.5 - Hoàn thiện Cleanup (chuyển sang relative, bật scroll thanh cuộn ở 1550ms)
    setTimeout(() => {
      setPhase("completed");
      window.scrollTo(0, 0);
    }, 1550);
  };

  const handleResetIntro = () => {
    window.scrollTo(0, 0);
    setPhase("idle");
  };

  const handleMouseMove = (e) => {
    if (!sceneRef.current || phase !== "idle") return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -8,
      rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 8,
    });
  };

  const getCardTransform = () => {
    if (phase === "idle") return "rotateY(0deg) scale(1)";
    if (phase === "flipping") return "rotateY(180deg) scale(1)";
    if (phase === "scaling" || phase === "fading") return "rotateY(180deg) scale(4.5)";
    return "rotateY(180deg) scale(4.5)";
  };

  return (
    <>
      {/* 1. TRANG PORTFOLIO CHÍNH (Render sẵn đằng sau ở Bước 1) */}
      <div
        className="paper-texture min-h-screen"
        style={{
          backgroundColor: "#F4F0EC",
          color: "#111111",
          fontFamily: "'EB Garamond', serif",
          position: phase === "completed" ? "relative" : "fixed",
          inset: 0,
          zIndex: phase === "fading" || phase === "completed" ? 50 : 1,
          opacity: phase === "fading" || phase === "completed" ? 1 : 0,
          pointerEvents: phase === "completed" ? "auto" : "none",
          transition: phase === "fading" ? "opacity 0.4s ease-in-out" : "none",
        }}
      >
        <Navbar onResetIntro={handleResetIntro} />
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Activities />
        <Contact />
      </div>

      {/* 2. INTRO SCREEN: NỀN MỜ KEM GIỐNG /DEMO (#F4F0EC) */}
      {phase !== "completed" && (
        <div
          id="intro-screen"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center select-none overflow-hidden"
          style={{
            backgroundColor: "#F4F0EC",
            opacity: phase === "fading" ? 0 : 1,
            transition: phase === "fading" ? "opacity 0.4s ease-in-out" : "none",
          }}
        >
          {/* Scene 3D Viewport chuẩn kích thước CardDemo (900px x 514px) */}
          <div
            ref={sceneRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setTilt({ rotateX: 0, rotateY: 0 });
            }}
            className="w-[900px] max-w-[95vw] h-[514px] max-h-[70vh] z-10"
            style={{ perspective: "2500px" }}
          >
            {/* Tilt Wrapper */}
            <div
              className="w-full h-full preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                transform: phase !== "idle" ? "rotateX(0deg) rotateY(0deg)" : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered && phase === "idle" ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
            >
              {/* TẤM DANH THIẾP 3D */}
              <div
                onClick={handleCardClick}
                className="w-full h-full cursor-pointer relative preserve-3d shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3),_0_10px_25px_-15px_rgba(0,0,0,0.2)]"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  transform: getCardTransform(),
                  transition: phase === "flipping"
                    ? "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)"
                    : phase === "scaling" || phase === "fading"
                    ? "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)"
                    : "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  backgroundColor: "#F4F0EC",
                  opacity: phase === "fading" ? 0 : 1,
                }}
              >
                {/* MẶT TRƯỚC: FONT GARAMOND CLASSICO SC */}
                <div className="paper-texture absolute w-full h-full backface-hidden rounded-sm card-font">
                  <div className="w-full h-full p-10 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex justify-between items-start ink-raised">
                      <div className="text-[1.25rem] tracking-[0.1em] mt-1">096 314 9280</div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-[1.4rem] tracking-[0.1em]">Software Engineering</div>
                        <div className="text-[0.8rem] tracking-widest mt-1">Backend Architecture</div>
                      </div>
                    </div>

                    {/* Center Row */}
                    <div className="flex flex-col items-center justify-center ink-raised -mt-4">
                      <h1 className="text-[2.4rem] md:text-[2.7rem] tracking-[0.15em] font-medium">Nguyen Vu Thanh TINH</h1>
                      <p className="mt-4 text-[1.2rem] md:text-[1.3rem] tracking-[0.1em]">Software Engineer</p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-center items-end pb-2 ink-raised">
                      <p className="text-[0.95rem] tracking-[0.08em] text-center">
                        Ho Chi Minh City, VN 700000{" "}
                        <span className="mx-2">Email</span> ngvuthtinh.work@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* MẶT SAU: KHÔNG CÓ NAVBAR HEADER, CHỈ CÓ NỘI DUNG NGHỆ THUẬT */}
                <div
                  className="paper-texture absolute w-full h-full backface-hidden rounded-sm card-font"
                  style={{ transform: "rotateY(180deg)", backgroundColor: "#F4F0EC" }}
                >
                  <div className="w-full h-full p-12 flex flex-col items-center justify-center text-center">
                    <h1 className="text-[2.8rem] md:text-[3.6rem] tracking-[0.15em] font-medium mb-4 text-[#111] ink-raised">
                      Thanh Tinh
                    </h1>
                    <p className="text-base md:text-xl italic tracking-widest text-gray-700 max-w-md">
                      Crafting flawless digital architectures.
                    </p>
                    <div className="w-16 h-[1px] bg-black mt-8 opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hint text cố định dưới thẻ */}
          {phase === "idle" && (
            <div className="mt-12 z-20 px-4 text-center">
              <p className="hint-text small-caps text-sm font-medium tracking-[0.25em] text-[#111]">
                [ Click the card to unveil ]
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
