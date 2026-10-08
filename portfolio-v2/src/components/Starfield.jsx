import { useEffect, useRef } from "react";

// Full-screen canvas: twinkling stars with slow drift + scroll parallax, occasional shooting star
export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, stars, raf;
    let shooting = null;

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 4200);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 = far, 1 = near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.3 + depth * 1.2,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
          tint: Math.random() < 0.12 ? (Math.random() < 0.5 ? "167,139,250" : "103,232,249") : "255,255,255",
        };
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      for (const s of stars) {
        const y = (((s.y - scroll * s.depth * 0.15) % h) + h) % h;
        const x = reduce ? s.x : (s.x + t * 0.004 * s.depth) % w;
        const a = reduce ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint},${a * (0.4 + s.depth * 0.6)})`;
        ctx.fill();
      }

      if (!reduce) {
        if (!shooting && Math.random() < 0.004) {
          shooting = { x: Math.random() * w * 0.7 + w * 0.3, y: Math.random() * h * 0.4, life: 0 };
        }
        if (shooting) {
          const { x, y, life } = shooting;
          const len = 120;
          const px = x - life * 9, py = y + life * 4.5;
          const g = ctx.createLinearGradient(px, py, px + len, py - len / 2);
          const alpha = Math.max(0, 1 - life / 60);
          g.addColorStop(0, `rgba(255,255,255,${alpha})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + len, py - len / 2);
          ctx.stroke();
          shooting.life++;
          if (shooting.life > 60) shooting = null;
        }
        raf = requestAnimationFrame(draw);
      }
    };

    init();
    raf = requestAnimationFrame(draw);
    const onResize = () => {
      init();
      if (reduce) draw(0);
    };
    const onScroll = () => draw(0);
    window.addEventListener("resize", onResize);
    if (reduce) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
