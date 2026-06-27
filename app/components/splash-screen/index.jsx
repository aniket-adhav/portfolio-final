import { useEffect, useState, useRef } from 'react';
import styles from './splash-screen.module.css';

const LOAD_DURATION = 2600;
const EXIT_DURATION = 900;

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// Slot-machine digit column
// virtualPos = cumulative position that only ever increases (no backward scroll)
// numItems   = how many digits to render in the column (must be > virtualPos)
function SlotColumn({ virtualPos, numItems }) {
  const items = Array.from({ length: numItems }, (_, i) => i % 10);
  return (
    <div className={styles.slotOuter}>
      <div
        className={styles.slotInner}
        style={{ '--vp': virtualPos }}
      >
        {items.map((d, i) => (
          <span key={i} className={styles.slotDigit}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | done | exiting
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const boot = setTimeout(() => {
      startRef.current = performance.now();

      function tick(now) {
        const elapsed = now - startRef.current;
        const t = Math.min(elapsed / LOAD_DURATION, 1);
        const eased = easeInOutQuart(t);
        setProgress(eased * 100);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setProgress(100);
          // Show name for a moment, then exit
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
              setPhase('exiting');
              setTimeout(onComplete, EXIT_DURATION);
            }, 600);
          }, 300);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }, 80);

    return () => {
      clearTimeout(boot);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const pct = Math.floor(progress);

  // Virtual positions — only ever increase, so columns always scroll forward
  const virtH = Math.floor(pct / 100);           // 0→1      (needs 2 items)
  const virtT = Math.floor(pct / 10);             // 0→10     (needs 11 items)
  const virtU = pct;                              // 0→100    (needs 101 items)

  const isDone    = phase === 'done' || phase === 'exiting';
  const isExiting = phase === 'exiting';

  return (
    <div
      className={styles.overlay}
      data-exiting={isExiting}
      data-done={isDone}
    >
      {/* ── Centered counter ── */}
      <div className={styles.center}>
        <div className={styles.counter} data-done={isDone}>
          <SlotColumn virtualPos={virtH} numItems={2} />
          <SlotColumn virtualPos={virtT} numItems={11} />
          <SlotColumn virtualPos={virtU} numItems={101} />
          <span className={styles.pctMark}>%</span>
        </div>

        {/* ── Name & role (appear after 100%) ── */}
        <div className={styles.nameBlock} data-visible={isDone}>
          <p className={styles.name}>ANIKET ADHAV</p>
          <p className={styles.role}>Developer</p>
        </div>
      </div>

      {/* ── Bottom-left label (matches reference site's GitHub icon position) ── */}
      <div className={styles.bottomLeft}>
        <span className={styles.siteLabel}>© 2025</span>
      </div>

      {/* ── Bottom-right progress text ── */}
      <div className={styles.bottomRight} data-done={isDone}>
        <span className={styles.loadingLabel}>
          {isDone ? 'COMPLETE' : 'LOADING...'}
        </span>
      </div>
    </div>
  );
}
