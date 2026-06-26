import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'नमस्कार', lang: 'Marathi' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: '你好', lang: 'Chinese' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Привет', lang: 'Russian' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'Merhaba', lang: 'Turkish' },
  { text: 'Γεια σου', lang: 'Greek' },
  { text: 'שלום', lang: 'Hebrew' },
  { text: 'สวัสดี', lang: 'Thai' },
  { text: 'Xin chào', lang: 'Vietnamese' },
  { text: 'Ahoj', lang: 'Czech' },
  { text: 'Hello', lang: 'English' },
];

const WORD_DURATION = 210;

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
        setTimeout(onComplete, 700);
      }, WORD_DURATION + 100);
      return () => clearTimeout(t);
    }
  }, [index, onComplete]);

  const current = greetings[index];

  return (
    <div className={styles.overlay} data-exiting={exiting}>
      <div className={styles.content}>
        <span
          key={index}
          className={styles.word}
          lang={current.lang}
        >
          {current.text}
        </span>
        <span className={styles.lang}>{current.lang}</span>
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
