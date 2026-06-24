import { useEffect, useRef, useState } from 'react';
import styles from './splash-screen.module.css';

const PANEL_COUNT = 5;

export function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      setLeaving(true);
      setTimeout(() => {
        if (!cancelled) {
          setDone(true);
          onDone?.();
        }
      }, 1200);
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (done) return null;

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
    </div>
  );
}
