import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './splash-screen.module.css';

const FULL_DURATION = 2400;

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Each column shows exactly ONE digit — no CSS transition, instant snap.
// The "slot" effect comes from rAF updating many times per second, not CSS.
function Digit({ value }) {
  return (
    <div className={styles.col}>
      <div
        className={styles.reel}
        style={{ transform: `translateY(calc(${value % 10} * -1em))` }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map(d => (
          <span key={d} className={styles.digit}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function SplashScreen({ onComplete }) {
  const [ready,   setReady]   = useState(false);
  const [pct,     setPct]     = useState(0);
  const [phase,   setPhase]   = useState('counting');
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  // Block render until Six Caps is loaded — zero fallback-font flash
  useEffect(() => {
    if (typeof document === 'undefined') { setReady(true); return; }
    document.fonts.ready.then(() => setReady(true));
  }, []);

  const run = useCallback(() => {
    startRef.current = performance.now();
    function tick(now) {
      const t = Math.min((now - startRef.current) / FULL_DURATION, 1);
      setPct(Math.floor(easeInOut(t) * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPct(100);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 900);
          }, 850);
        }, 180);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete]);

  useEffect(() => { if (ready) return run(); }, [ready, run]);

  const h = Math.floor(pct / 100) % 10;
  const t = Math.floor(pct / 10)  % 10;
  const u = pct % 10;

  const isDone = phase === 'reveal' || phase === 'exit';
  const isExit = phase === 'exit';

  return (
    <div className={styles.overlay} data-exit={isExit}>
      <div className={styles.stage}>

        {/* Counter — three digit columns + % */}
        <div className={styles.counter} data-hide={isDone}>
          {pct >= 100 && <Digit value={h} />}
          <Digit value={t} />
          <Digit value={u} />
          <span className={styles.pct}>%</span>
        </div>

        {/* Name + role — appear after 100% */}
        <div className={styles.nameBlock} data-show={isDone}>
          <p className={styles.name}>ANIKET ADHAV</p>
          <p className={styles.role}>Developer</p>
        </div>

      </div>

      <span className={styles.labelBL}>© 2025</span>
      <span className={styles.labelBR} data-hide={isDone}>Loading</span>
    </div>
  );
}
