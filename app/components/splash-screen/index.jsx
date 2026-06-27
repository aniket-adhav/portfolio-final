import { useEffect, useState, useRef } from 'react';
import styles from './splash-screen.module.css';

// Exact easing from the repo: cubic-bezier(0.43, 0.05, 0.17, 1)
function easeTransform(t) {
  // Approximate via polynomial - matches cubic-bezier(0.43, 0.05, 0.17, 1)
  return t < 0.5
    ? 2 * t * t * (2 - t)
    : 1 - Math.pow(1 - t, 3) * 0.18;
}

// Slot-machine column: virtualPos only ever increases → no backward animation
function SlotColumn({ virtualPos, numItems }) {
  const items = Array.from({ length: numItems }, (_, i) => i % 10);
  return (
    <div className={styles.col}>
      <div className={styles.reel} style={{ '--vp': virtualPos }}>
        {items.map((d, i) => (
          <span key={i} className={styles.digit}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  // phase: 'counting' | 'reveal' | 'exit'
  const [phase, setPhase] = useState('counting');
  const startRef = useRef(null);
  const rafRef  = useRef(null);

  // fullDuration from repo config = 2.0s
  const FULL_DURATION = 2000;
  const EXIT_DURATION = 1000;

  useEffect(() => {
    startRef.current = performance.now();

    function tick(now) {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / FULL_DURATION, 1);
      const eased = easeTransform(t);
      setProgress(eased * 100);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Show name (reveal phase) then exit
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, EXIT_DURATION);
          }, 800);
        }, 200);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete]);

  const pct = Math.floor(progress);

  // Virtual positions — monotonically increasing for each digit place
  // units:    pct       (0→100, needs 101 items)
  // tens:     floor(pct/10) (0→10, needs 11 items)
  // hundreds: floor(pct/100) (0→1, needs 2 items)
  const vH = Math.floor(pct / 100);
  const vT = Math.floor(pct / 10);
  const vU = pct;

  const isDone   = phase === 'reveal' || phase === 'exit';
  const isExit   = phase === 'exit';

  return (
    <div className={styles.overlay} data-exit={isExit}>

      {/* ── Centered counter + name ── */}
      <div className={styles.center}>

        {/* Slot-machine counter — hidden when name reveals */}
        <div className={styles.counter} data-hide={isDone}>
          <SlotColumn virtualPos={vH} numItems={2}   />
          <SlotColumn virtualPos={vT} numItems={11}  />
          <SlotColumn virtualPos={vU} numItems={101} />
          <span className={styles.pct}>%</span>
        </div>

        {/* Name + role — appear after 100% */}
        <div className={styles.nameWrap} data-show={isDone}>
          <p className={styles.name}>ANIKET ADHAV</p>
          <p className={styles.role}>Developer</p>
        </div>

      </div>

      {/* ── Bottom labels ── */}
      <span className={styles.labelBL}>© 2025</span>
      <span className={styles.labelBR} data-hide={isDone}>LOADING...</span>

    </div>
  );
}
