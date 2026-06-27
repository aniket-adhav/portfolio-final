import { useEffect, useState, useRef } from 'react';
import styles from './splash-screen.module.css';

const DURATION = 2200;
const EXIT_DURATION = 900;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function padNum(n) {
  return String(Math.floor(n)).padStart(3, '0');
}

export function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | counting | done | exiting
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const introDelay = setTimeout(() => {
      setPhase('counting');
      startRef.current = performance.now();

      function tick(now) {
        const elapsed = now - startRef.current;
        const t = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(t);
        setProgress(eased * 100);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setProgress(100);
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
              setPhase('exiting');
              setTimeout(onComplete, EXIT_DURATION);
            }, 400);
          }, 200);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(introDelay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const pct = Math.floor(progress);
  const isExiting = phase === 'exiting';
  const isStarted = phase !== 'idle';
  const isDone = phase === 'done' || phase === 'exiting';

  return (
    <div className={styles.overlay} data-exiting={isExiting}>
      <div className={styles.inner}>

        <div className={styles.topRow} data-visible={isStarted}>
          <span className={styles.label}>Portfolio</span>
          <span className={styles.label}>Loading</span>
        </div>

        <div className={styles.centerBlock}>
          <div className={styles.nameWrap} data-visible={isStarted}>
            <span className={styles.nameFirst}>ANIKET</span>
            <span className={styles.nameLast}>ADHAV</span>
          </div>
          <div className={styles.roleWrap} data-visible={isStarted}>
            <span className={styles.role}>Developer</span>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.progressLine}>
            <div
              className={styles.progressFill}
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <div className={styles.counterRow}>
            <span className={styles.counter} data-done={isDone}>
              {padNum(pct)}
            </span>
            <span className={styles.pct} data-done={isDone}>%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
