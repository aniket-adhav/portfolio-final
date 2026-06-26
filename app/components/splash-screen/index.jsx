import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  { text: 'Hello',          lang: 'English',  code: 'en' },
  { text: 'नमस्कार',         lang: 'Marathi',  code: 'mr' },
  { text: 'নমস্কার',          lang: 'Bengali',  code: 'bn' },
  { text: 'வணக்கம்',         lang: 'Tamil',    code: 'ta' },
  { text: 'నమస్కారం',        lang: 'Telugu',   code: 'te' },
  { text: 'ನಮಸ್ಕಾರ',         lang: 'Kannada',  code: 'kn' },
  { text: 'નમસ્તે',           lang: 'Gujarati', code: 'gu' },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',    lang: 'Punjabi',  code: 'pa' },
  { text: 'नमस्ते',           lang: 'Hindi',    code: 'hi' },
];

const WORD_DURATION = 280;

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
        <div key={index} className={styles.clip}>
          <span className={styles.word} lang={current.code}>
            {current.text}
          </span>
        </div>
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
