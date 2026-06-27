import { useEffect, useState, useRef } from "react";

const NAME = "Aniket Adhav";
const ROLE = "Full Stack Developer";

export function Typewriter() {
  const [nameChars, setNameChars] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState<"typing" | "done" | "exit">("typing");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Type name chars one by one
    for (let i = 1; i <= NAME.length; i++) {
      timers.push(setTimeout(() => setNameChars(i), i * 70));
    }

    // After name is done, show line + role
    const afterName = NAME.length * 70 + 200;
    timers.push(setTimeout(() => setShowLine(true), afterName));
    timers.push(setTimeout(() => setShowRole(true), afterName + 180));
    timers.push(setTimeout(() => setPhase("done"), afterName + 700));
    timers.push(setTimeout(() => setExiting(true), afterName + 1600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Space Mono', monospace",
        position: "relative",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes expandLine {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>

      {/* Scanline effect */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(transparent, rgba(0,212,255,0.12), transparent)",
        animation: "scanline 3s linear infinite",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Corner decorations */}
      {["topLeft","topRight","bottomLeft","bottomRight"].map((corner) => (
        <div key={corner} style={{
          position: "absolute",
          width: 28, height: 28,
          ...(corner.includes("top") ? { top: 32 } : { bottom: 32 }),
          ...(corner.includes("Left") ? { left: 32 } : { right: 32 }),
          borderTop: corner.includes("top") ? "2px solid rgba(0,212,255,0.4)" : undefined,
          borderBottom: corner.includes("bottom") ? "2px solid rgba(0,212,255,0.4)" : undefined,
          borderLeft: corner.includes("Left") ? "2px solid rgba(0,212,255,0.4)" : undefined,
          borderRight: corner.includes("Right") ? "2px solid rgba(0,212,255,0.4)" : undefined,
        }} />
      ))}

      <div style={{ textAlign: "left", position: "relative", zIndex: 2 }}>
        {/* Prompt symbol */}
        <div style={{
          color: "rgba(0,212,255,0.6)",
          fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
          letterSpacing: "0.15em",
          marginBottom: 12,
          fontFamily: "'Space Mono', monospace",
        }}>
          ~/portfolio $
        </div>

        {/* Name being typed */}
        <div style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          fontFamily: "'Space Mono', monospace",
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}>
          <span>{NAME.slice(0, nameChars)}</span>
          {phase !== "done" && (
            <span style={{
              display: "inline-block",
              width: "0.55em",
              height: "1em",
              background: "#00d4ff",
              marginLeft: 3,
              animation: "cursorBlink 0.8s step-end infinite",
              verticalAlign: "text-bottom",
            }} />
          )}
        </div>

        {/* Accent line */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg, #00d4ff, transparent)",
          marginTop: 14,
          marginBottom: 14,
          width: showLine ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
        }} />

        {/* Role */}
        <div style={{
          fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
          color: "#00d4ff",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "'Space Mono', monospace",
          opacity: showRole ? 1 : 0,
          transform: showRole ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          {ROLE}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(255,255,255,0.06)",
      }}>
        <div style={{
          height: "100%",
          background: "#00d4ff",
          width: `${(nameChars / NAME.length) * 100}%`,
          transition: "width 0.07s linear",
          boxShadow: "0 0 8px #00d4ff",
        }} />
      </div>
    </div>
  );
}
