import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'नमस्कार', lang: 'Marathi' },
  { text: 'प्रणाम', lang: 'Hindi' },
  { text: 'राम राम', lang: 'Hindi' },
  { text: 'आदाब', lang: 'Hindi' },
  { text: 'जय हिंद', lang: 'Hindi' },
  { text: 'जय महाराष्ट्र', lang: 'Marathi' },
  { text: 'स्वागत आहे', lang: 'Marathi' },
  { text: 'नमन', lang: 'Hindi · Marathi' },
  { text: 'नमस्ते', lang: 'Hindi' },
];

const WORD_DURATION = 220;

export function SplashScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_DURATION);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 680);
      }, WORD_DURATION + 120);
      return () => clearTimeout(t);
    }
  }, [index, onComplete]);

  const current = greetings[index];

  return (
    <div className={styles.overlay} data-exiting={exiting}>
      <div className={styles.content}>
        <span key={index} className={styles.word} data-first={index === 0}>
          {current.text}
        </span>
        <span key={`lang-${index}`} className={styles.lang}>
          {current.lang}
        </span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{ '--progress': `${((index + 1) / greetings.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
