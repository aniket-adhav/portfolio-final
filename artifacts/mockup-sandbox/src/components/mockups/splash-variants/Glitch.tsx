import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>?";
const TARGET_LINE1 = "ANIKET";
const TARGET_LINE2 = "ADHAV";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function useScramble(target: string, startDelay: number, charDelay: number) {
  const [display, setDisplay] = useState(target.split("").map(() => randomChar()));
  const [settled, setSettled] = useState(Array(target.length).fill(false));

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Each character scrambles then settles in sequence
    target.split("").forEach((char, i) => {
      // Scramble interval for this char
      let count = 0;
      const scrambleStart = startDelay + i * charDelay;
      const scrambleDuration = 300 + Math.random() * 200;

      const start = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplay(prev => {
            const next = [...prev];
            next[i] = randomChar();
            return next;
          });
          count++;
          if (count * 40 >= scrambleDuration) {
            clearInterval(interval);
            setDisplay(prev => {
              const next = [...prev];
              next[i] = char;
              return next;
            });
            setSettled(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        }, 40);
      }, scrambleStart);

      timers.push(start);
    });

    return () => timers.forEach(clearTimeout);
  }, [target, startDelay, charDelay]);

  return { display, settled };
}

export function Glitch() {
  const [phase, setPhase] = useState<"scramble" | "done" | "exit">("scramble");
  const [exiting, setExiting] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const line1 = useScramble(TARGET_LINE1, 200, 120);
  const line2 = useScramble(TARGET_LINE2, 200 + TARGET_LINE1.length * 120 + 100, 140);

  const totalDuration =
    200 +
    TARGET_LINE1.length * 120 + 500 +
    TARGET_LINE2.length * 140 + 500;

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), totalDuration - 200);
    const t2 = setTimeout(() => setPhase("done"), totalDuration);
    const t3 = setTimeout(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, totalDuration + 400);
    const t4 = setTimeout(() => setExiting(true), totalDuration + 1000);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [totalDuration]);

  const line1AllSettled = line1.settled.every(Boolean);
  const line2AllSettled = line2.settled.every(Boolean);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      opacity: exiting ? 0 : 1,
      transition: "opacity 0.6s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.6; }
          94% { opacity: 1; }
          96% { opacity: 0.7; }
          97% { opacity: 1; }
        }
        @keyframes glitchLeft {
          0% { clip-path: inset(40% 0 60% 0); transform: translate(-8px, 0); }
          25% { clip-path: inset(10% 0 85% 0); transform: translate(8px, 0); }
          50% { clip-path: inset(70% 0 5% 0); transform: translate(-4px, 0); }
          75% { clip-path: inset(25% 0 65% 0); transform: translate(6px, 0); }
          100% { clip-path: inset(40% 0 60% 0); transform: translate(-8px, 0); }
        }
        @keyframes glitchRight {
          0% { clip-path: inset(60% 0 20% 0); transform: translate(8px, 0); }
          25% { clip-path: inset(20% 0 50% 0); transform: translate(-6px, 0); }
          50% { clip-path: inset(5% 0 70% 0); transform: translate(4px, 0); }
          75% { clip-path: inset(75% 0 10% 0); transform: translate(-8px, 0); }
          100% { clip-path: inset(60% 0 20% 0); transform: translate(8px, 0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>

      {/* Scanline overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 2px)",
        pointerEvents: "none",
        zIndex: 5,
        animation: "scanlines 2s linear infinite",
        backgroundSize: "100% 4px",
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        pointerEvents: "none",
        zIndex: 4,
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Main text block */}
      <div style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        animation: "flicker 4s infinite",
      }}>

        {/* Line 1 */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            lineHeight: 1,
            color: line1AllSettled ? "#fff" : "#00d4ff",
            transition: "color 0.3s ease",
            textShadow: line1AllSettled
              ? "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)"
              : "0 0 10px rgba(0,212,255,0.8)",
          }}>
            {line1.display.join("")}
          </div>

          {/* Glitch layers — only show after done */}
          {glitchActive && (
            <>
              <div style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: "#ff003c",
                opacity: 0.8,
                letterSpacing: "0.15em",
                animation: "glitchLeft 0.15s steps(2) forwards",
              }}>
                {TARGET_LINE1}
              </div>
              <div style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: "#00ff9f",
                opacity: 0.7,
                letterSpacing: "0.15em",
                animation: "glitchRight 0.15s steps(2) forwards",
              }}>
                {TARGET_LINE1}
              </div>
            </>
          )}
        </div>

        {/* Line 2 */}
        <div style={{ position: "relative", display: "block" }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            lineHeight: 1,
            color: line2AllSettled ? "#fff" : "#00d4ff",
            transition: "color 0.3s ease",
            textShadow: line2AllSettled
              ? "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)"
              : "0 0 10px rgba(0,212,255,0.8)",
          }}>
            {line2.display.join("")}
          </div>
          {glitchActive && (
            <>
              <div style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: "#ff003c",
                opacity: 0.8,
                letterSpacing: "0.15em",
                animation: "glitchLeft 0.12s steps(2) forwards",
              }}>
                {TARGET_LINE2}
              </div>
              <div style={{
                position: "absolute",
                inset: 0,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: "#00ff9f",
                opacity: 0.7,
                letterSpacing: "0.15em",
                animation: "glitchRight 0.12s steps(2) forwards",
              }}>
                {TARGET_LINE2}
              </div>
            </>
          )}
        </div>

        {/* Divider line */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
          margin: "20px auto",
          opacity: showSubtitle ? 1 : 0,
          width: showSubtitle ? "100%" : "0%",
          transition: "opacity 0.4s ease, width 0.5s ease",
        }} />

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.65rem, 1.3vw, 0.8rem)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "rgba(0,212,255,0.7)",
          opacity: showSubtitle ? 1 : 0,
          transition: "opacity 0.5s ease 0.2s",
        }}>
          Full Stack Developer
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(0,212,255,0.1)",
        zIndex: 10,
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
          width: phase === "done" ? "100%" : `${Math.round(
            ((line1.settled.filter(Boolean).length + line2.settled.filter(Boolean).length) /
              (TARGET_LINE1.length + TARGET_LINE2.length)) * 100
          )}%`,
          transition: "width 0.12s linear",
          boxShadow: "0 0 12px #00d4ff",
        }} />
      </div>
    </div>
  );
}
