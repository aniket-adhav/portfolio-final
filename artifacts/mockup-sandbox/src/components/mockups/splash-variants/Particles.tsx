import { useEffect, useRef, useState } from "react";

const INITIALS = ["A", "A"];

type Particle = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  delay: number;
  angle: number;
  speed: number;
};

const COLORS = [
  "#00d4ff", "#7c3aed", "#06b6d4", "#8b5cf6",
  "#a78bfa", "#22d3ee", "#0ea5e9", "#6366f1",
];

function generateBurstParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const radius = 80 + Math.random() * 120;
    return {
      id: i,
      x: 50 + Math.cos(angle) * (radius / 8),
      y: 50 + Math.sin(angle) * (radius / 8),
      tx: 50 + Math.cos(angle) * (radius + 40 + Math.random() * 60),
      ty: 50 + Math.sin(angle) * (radius + 40 + Math.random() * 60),
      size: 3 + Math.random() * 5,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.3,
      angle,
      speed: 0.6 + Math.random() * 0.4,
    };
  });
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [phase, setPhase] = useState<"gather" | "hold" | "burst" | "exit">("gather");
  const [exiting, setExiting] = useState(false);
  const particles = useRef<Particle[]>(generateBurstParticles(80));
  const [showInitials, setShowInitials] = useState(false);
  const [initialsScale, setInitialsScale] = useState(0.2);
  const [initialsOpacity, setInitialsOpacity] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;

    const GATHER_DUR = 900;
    const HOLD_DUR = 700;
    const BURST_DUR = 600;

    let phaseRef = "gather" as "gather" | "hold" | "burst" | "exit";
    let t0 = performance.now();

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * Math.max(0, Math.min(1, t));
    }
    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeIn(t: number) {
      return t * t * t;
    }

    const draw = (now: number) => {
      const elapsed = now - t0;
      ctx.clearRect(0, 0, W, H);

      // Dark bg gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.7);
      grad.addColorStop(0, "#13003a");
      grad.addColorStop(1, "#050010");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      let progress = 0;

      if (phaseRef === "gather") {
        progress = easeOut(Math.min(elapsed / GATHER_DUR, 1));
        particles.current.forEach(p => {
          const px = lerp(cx + Math.cos(p.angle) * 350, cx + Math.cos(p.angle) * 10, progress);
          const py = lerp(cy + Math.sin(p.angle) * 250, cy + Math.sin(p.angle) * 10, progress);
          const alpha = 0.4 + progress * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (0.5 + progress * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
          // Trail glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        if (elapsed >= GATHER_DUR) {
          phaseRef = "hold";
          setPhase("hold");
          setShowInitials(true);
          setTimeout(() => setInitialsScale(1), 50);
          setTimeout(() => setInitialsOpacity(1), 50);
          t0 = now;
        }
      } else if (phaseRef === "hold") {
        // Particles orbiting the center tightly
        const angle = (elapsed / 600) * Math.PI * 2;
        particles.current.forEach((p, i) => {
          const a = angle + (i / particles.current.length) * Math.PI * 2;
          const r = 10 + Math.sin(i * 1.7 + elapsed * 0.003) * 5;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;
          ctx.beginPath();
          ctx.arc(px, py, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "cc";
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        if (elapsed >= HOLD_DUR) {
          phaseRef = "burst";
          setPhase("burst");
          t0 = now;
        }
      } else if (phaseRef === "burst") {
        progress = easeIn(Math.min(elapsed / BURST_DUR, 1));
        particles.current.forEach(p => {
          const px = lerp(cx, cx + Math.cos(p.angle) * 500, progress);
          const py = lerp(cy, cy + Math.sin(p.angle) * 400, progress);
          const alpha = 1 - progress * 0.9;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 - progress * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.shadowBlur = 12 * (1 - progress);
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        if (elapsed >= BURST_DUR) {
          phaseRef = "exit";
          setPhase("exit");
          setExiting(true);
          t0 = now;
          cancelAnimationFrame(animRef.current);
          return;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050010",
      position: "relative",
      overflow: "hidden",
      opacity: exiting ? 0 : 1,
      transition: "opacity 0.7s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&display=swap');
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 20px #7c3aed88) drop-shadow(0 0 40px #00d4ff44); }
          50% { filter: drop-shadow(0 0 35px #7c3aedcc) drop-shadow(0 0 60px #00d4ff66); }
        }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Initials that appear when particles gather */}
      {showInitials && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          opacity: initialsOpacity,
          transform: `scale(${initialsScale})`,
          transition: "opacity 0.35s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(5rem, 12vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            background: "linear-gradient(135deg, #00d4ff, #7c3aed, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: phase === "hold" ? "pulseGlow 1.2s ease-in-out infinite" : "none",
            filter: phase === "hold" ? "drop-shadow(0 0 30px #7c3aed88)" : "none",
          }}>
            AA
          </div>
        </div>
      )}

      {/* Name + role that fades in during hold */}
      {(phase === "hold" || phase === "burst" || phase === "exit") && (
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          opacity: phase === "burst" ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(167,139,250,0.8)",
          }}>
            Aniket Adhav · Full Stack Developer
          </div>
        </div>
      )}
    </div>
  );
}
