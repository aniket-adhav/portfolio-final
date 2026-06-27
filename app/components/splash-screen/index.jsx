import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

/*
 * Matches BaseOpenning.vue from hisamikurita/hisamikurita-portfoliosite-v2022
 *
 * Exact structure (overflow:hidden columns, single-string vertical scroll):
 *   numFirst   = "01"                     – hundreds column (left: 0)
 *   numSecond  = "0123456789"              – tens column    (left: 14px)
 *   numThird   = "01234567890123456789"    – units column   (left: 28px)
 *   numForth   = "0"                       – static tens    (left: 14px, initially hidden)
 *   numFive    = "0"                       – static units   (left: 28px, initially hidden)
 *   numPercent = "%"
 *
 * CSS animations replace GSAP — no React state changes mid-animation
 * → eliminates the "100 glitch" caused by component re-mount.
 *
 * Timings from config.client.js:
 *   NumSecond / NumThird : duration 2.98s, delay 0.58s  → ends at 3.56s
 *   NumFirst (hundreds)  : duration 0.28s, delay 3.44s  → ends at 3.72s
 *   fadeOut second/third : delay 3.54s (just before they stop)
 *   fadeIn  forth/five   : delay 3.54s
 */

export function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('counting');

  useEffect(() => {
    const timers = [];
    const schedule = (fn, ms) => timers.push(setTimeout(fn, ms));

    document.fonts.ready.then(() => {
      schedule(() => setPhase('show100'), 3800);
      schedule(() => setPhase('reveal'),  4500);
      schedule(() => setPhase('exit'),    5400);
      schedule(onComplete,               6350);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const counterVisible = phase === 'counting' || phase === 'show100';
  const isReveal       = phase === 'reveal' || phase === 'exit';
  const isExit         = phase === 'exit';

  return (
    <div className={styles.overlay} data-exit={isExit}>

      {/* Loading progress line — bottom edge, grows left→right in sync with counter */}
      <div className={styles.progressLine} />

      {/* Counter — all spans always mounted; CSS handles the 0→100 transition */}
      <div className={styles.counterWrap} data-hide={!counterVisible}>
        <div className={styles.numContainer}>
          <span className={styles.numFirst}>01</span>
          <span className={styles.numSecond}>0123456789</span>
          <span className={styles.numThird}>01234567890123456789</span>
          <span className={styles.numForth}>0</span>
          <span className={styles.numFive}>0</span>
          <span className={styles.numPercent}>%</span>
        </div>
      </div>

      {/*
       * 100-point sweep lines — from BaseOpenning.vue openning-circle-line-01/02
       * Line 01 starts off-screen above and sweeps DOWN to center
       * Line 02 starts off-screen below and sweeps UP to center
       * Both converge at 3.48s to mask the 099→100 digit transition, fade at 3.54s
       */}
      <div className={styles.circleLine01} />
      <div className={styles.circleLine02} />

      {/* Name + role revealed after 100% */}
      <div className={styles.nameBlock} data-show={isReveal}>
        <p className={styles.name}>ANIKET ADHAV</p>
        <p className={styles.role}>Developer</p>
      </div>

      {/* Corner labels */}
      <span className={styles.labelBL}>portfolio</span>
      <span className={styles.labelBR} data-hide={!counterVisible}>Loading</span>

    </div>
  );
}
