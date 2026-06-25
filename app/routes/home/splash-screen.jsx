import { useEffect, useRef, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  { text: 'Hello', lang: 'en' },
  { text: 'नमस्कार', lang: 'mr' },
  { text: 'নমস্কার', lang: 'bn' },
  { text: 'வணக்கம்', lang: 'ta' },
  { text: 'నమస్కారం', lang: 'te' },
  { text: 'ನಮಸ್ಕಾರ', lang: 'kn' },
  { text: 'નમસ્તે', lang: 'gu' },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'pa' },
  { text: 'नमस्ते', lang: 'hi' },
];

const INTERVAL = 280;
const TOTAL_DURATION = 1800;
const PANEL_COUNT = 5;

export function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('idle');
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const navType = performance.getEntriesByType?.('navigation')[0]?.type;

    if (navType === 'reload') {
      setPhase('loader');
      const start = performance.now();
      const tick = now => {
        if (cancelled) return;
        const pct = Math.min(100, Math.round(((now - start) / TOTAL_DURATION) * 100));
        setPercent(pct);
        if (pct < 100) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            if (cancelled) return;
            setLeaving(true);
            setTimeout(() => {
              if (!cancelled) {
                setPhase('done');
                onDone?.();
              }
            }, 1200);
          }, 200);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        cancelled = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    } else {
      setPhase('greeting');
      let i = 0;
      const interval = setInterval(() => {
        if (cancelled) return;
        i++;
        if (i >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            if (cancelled) return;
            setLeaving(true);
            setTimeout(() => {
              if (!cancelled) {
                setPhase('done');
                onDone?.();
              }
            }, 1200);
          }, 500);
        } else {
          setIndex(i);
        }
      }, INTERVAL);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }
  }, []);

  if (phase === 'done') return null;

  const current = greetings[index];

  return (
    <div className={styles.splash} suppressHydrationWarning>
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <div
          key={i}
          className={styles.panel}
          data-leaving={leaving}
          style={{ '--i': i }}
        />
      ))}

      {phase === 'greeting' && (
        <div className={styles.center} data-leaving={leaving}>
          <div className={styles.clip} key={index}>
            <span className={styles.word} lang={current.lang}>{current.text}</span>
          </div>
        </div>
      )}

      {phase === 'loader' && (
        <div className={styles.center} data-leaving={leaving}>
          <div className={styles.clip} key="pct">
            <span className={styles.pct}>{percent}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
