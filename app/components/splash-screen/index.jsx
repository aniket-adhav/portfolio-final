import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './splash-screen.module.css';

const FIRST_NAME = 'ANIKET';
const LAST_NAME = 'ADHAV';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOAD_DURATION = 2400;
const EXIT_DELAY = 380;
const EXIT_DURATION = 1000;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function useScrambleLetters(word, isStarted) {
  const [display, setDisplay] = useState(() => word.split('').map(() => ''));
  const timersRef = useRef([]);

  useEffect(() => {
    if (!isStarted) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    word.split('').forEach((finalChar, i) => {
      const startDelay = i * 65;
      const scrambleDuration = 320;
      const intervalMs = 40;
      const frames = Math.floor(scrambleDuration / intervalMs);

      const t = setTimeout(() => {
        let frame = 0;
        const iv = setInterval(() => {
          frame++;
          const isDone = frame >= frames;
          const ch = isDone
            ? finalChar
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

          setDisplay(prev => {
            const next = [...prev];
            next[i] = ch;
            return next;
          });

          if (isDone) clearInterval(iv);
        }, intervalMs);

        timersRef.current.push(iv);
      }, startDelay);

      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(t => clearTimeout(t) || clearInterval(t));
  }, [isStarted, word]);

  return display;
}

export function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | running | done | exiting
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const isStarted = phase !== 'idle';
  const isDone = phase === 'done' || phase === 'exiting';
  const isExiting = phase === 'exiting';

  const firstLetters = useScrambleLetters(FIRST_NAME, isStarted);
  const lastLetters = useScrambleLetters(LAST_NAME, isStarted);

  useEffect(() => {
    const boot = setTimeout(() => {
      setPhase('running');
      startRef.current = performance.now();

      function tick(now) {
        const elapsed = now - startRef.current;
        const t = Math.min(elapsed / LOAD_DURATION, 1);
        const eased = easeInOutCubic(t);
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
            }, EXIT_DELAY);
          }, 260);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }, 120);

    return () => {
      clearTimeout(boot);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const pct = Math.floor(progress);
  const padded = String(pct).padStart(3, '0');

  return (
    <div className={styles.overlay} data-exiting={isExiting} data-done={isDone}>

      {/* Noise grain */}
      <div className={styles.grain} aria-hidden />

      {/* Scan line */}
      <div className={styles.scanLine} data-active={isStarted} aria-hidden />

      {/* Corner brackets */}
      <span className={styles.cornerTL} aria-hidden />
      <span className={styles.cornerTR} aria-hidden />
      <span className={styles.cornerBL} aria-hidden />
      <span className={styles.cornerBR} aria-hidden />

      {/* Top row */}
      <div className={styles.topRow} data-visible={isStarted}>
        <span className={styles.topLabel}>Portfolio</span>
        <div className={styles.topDivider} />
        <span className={styles.topLabel}>Loading</span>
      </div>

      {/* Center name */}
      <div className={styles.nameBlock} data-visible={isStarted}>
        <div className={styles.nameRow}>
          {firstLetters.map((ch, i) => (
            <span
              key={i}
              className={styles.nameLetter}
              style={{ '--i': i }}
              data-visible={isStarted}
            >
              {ch || '\u00A0'}
            </span>
          ))}
        </div>
        <div className={styles.nameRow}>
          {lastLetters.map((ch, i) => (
            <span
              key={i}
              className={styles.nameLetter}
              style={{ '--i': FIRST_NAME.length + i + 2 }}
              data-visible={isStarted}
            >
              {ch || '\u00A0'}
            </span>
          ))}
        </div>

        <div className={styles.roleRow} data-visible={isStarted}>
          {'Developer'.split('').map((ch, i) => (
            <span key={i} className={styles.roleLetter} style={{ '--i': i }}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Ghost counter in background */}
      <div className={styles.ghostCounter} aria-hidden>
        100
      </div>

      {/* Bottom */}
      <div className={styles.bottomBlock}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${progress / 100})` }}
          />
          <div
            className={styles.progressGlow}
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.bottomLabel} data-visible={isStarted}>
            Aniket Adhav · Full Stack Developer
          </span>
          <div className={styles.counter} data-done={isDone}>
            <span className={styles.digits}>{padded}</span>
            <span className={styles.pctSign}>%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
