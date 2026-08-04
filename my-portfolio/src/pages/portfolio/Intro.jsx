import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Code2, MapPin, Sparkles } from "lucide-react";

const GithubIcon = (props) => (
  <svg className="w-3.5 h-3.5 inline text-gray-700 fill-current" viewBox="0 0 24 24" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function Intro() {
  const [phase, setPhase] = useState("idle"); // "idle" | "exploding"
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCardClick = () => {
    if (phase !== "idle") return;

    // Xoay 1 lần đúng 180 độ ra mặt sau đồng thời phóng to mở màn hình
    setPhase("exploding");

    // Điều hướng mượt sang trang portfolio sau khi xoay lật 180 độ phóng to hoàn tất
    setTimeout(() => {
      navigate("/portfolio");
    }, 1250);
  };

  const handleMouseMove = (e) => {
    if (!sceneRef.current || phase !== "idle") return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      rotateX: ((y - rect.height / 2) / (rect.height / 2)) * -12,
      rotateY: ((x - rect.width / 2) / (rect.width / 2)) * 12,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{
        background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #e6e1d5 100%)",
        opacity: phase === "exploding" ? 0 : 1,
        transition: phase === "exploding" ? "opacity 1.25s ease-in-out 0.1s" : "none",
      }}
    >
      {/* Ambient light overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,0.8)_0%,_transparent_70%)]" />

      {/* Scene 3D */}
      <div
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTilt({ rotateX: 0, rotateY: 0 });
        }}
        className="relative z-10 w-[800px] max-w-[90vw] h-[457px] max-h-[60vh]"
        style={{ perspective: "2500px" }}
      >
        <div
          className="w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: phase === "idle" ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` : "rotateX(0deg) rotateY(0deg)",
            transition: isHovered && phase === "idle" ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25,0.8,0.25,1)",
          }}
        >
          {/* Tấm danh thiếp 3D 2 mặt vật lý */}
          <div
            onClick={handleCardClick}
            className="w-full h-full cursor-pointer relative preserve-3d"
            style={{
              transformStyle: "preserve-3d",
              transform: phase === "exploding" ? "rotateY(180deg) scale(20)" : "rotateY(0deg) scale(1)",
              transition: phase === "exploding"
                ? "transform 1.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.25s ease-in-out"
                : "transform 0.3s ease",
              opacity: phase === "exploding" ? 0 : 1,
            }}
          >
            {/* MẶT TRƯỚC (Có chữ danh thiếp Patrick Bateman) */}
            <div
              className="paper-texture absolute w-full h-full p-10 md:p-12 flex flex-col justify-between rounded-sm backface-hidden"
              style={{
                boxShadow: "0 25px 60px -10px rgba(0,0,0,0.18), 0 15px 30px -15px rgba(0,0,0,0.12)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start ink-raised">
                <div className="text-[1.15rem] tracking-wider mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-700 inline" />
                  096 314 9280
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-[1.35rem] small-caps tracking-bateman flex items-center gap-1.5 justify-end">
                    <Code2 className="w-4 h-4 text-gray-800 inline" />
                    Independent Developer
                  </div>
                  <div className="text-[0.78rem] small-caps tracking-widest mt-1 text-gray-700">
                    Software Engineering
                  </div>
                </div>
              </div>

              {/* Center Row */}
              <div className="flex flex-col items-center justify-center ink-raised -mt-2">
                <h1 className="text-[2.4rem] md:text-[2.7rem] small-caps tracking-bateman font-medium text-center">
                  Nguyen Vu Thanh Tinh
                </h1>
                <p className="mt-3 text-[1.15rem] md:text-[1.25rem] small-caps tracking-bateman text-gray-800">
                  Software Engineer
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-center items-end pb-2 ink-raised">
                <p className="text-[0.88rem] small-caps tracking-widest text-center flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 inline text-gray-700" />
                  123 Nguyen Van Cu, Ho Chi Minh City, VN
                  <span className="mx-2">&bull;</span>
                  <GithubIcon />
                  TINH-NVT
                </p>
              </div>
            </div>

            {/* MẶT SAU (Mặt giấy kem trắng tinh hoàn toàn không có chữ) */}
            <div
              className="paper-texture absolute w-full h-full rounded-sm backface-hidden"
              style={{
                boxShadow: "0 25px 60px -10px rgba(0,0,0,0.18), 0 15px 30px -15px rgba(0,0,0,0.12)",
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
          </div>
        </div>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-10 z-10 text-sm small-caps tracking-widest text-gray-700 font-semibold flex items-center gap-2"
        style={{
          opacity: phase !== "idle" ? 0 : undefined,
          transition: "opacity 0.3s",
        }}
      >
        <Sparkles className="w-4 h-4 text-gray-700" />
        [ Click the card to view portfolio ]
      </motion.p>
    </div>
  );
}
