import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

/*
 * Matches BaseOpenning.vue from hisamikurita/hisamikurita-portfoliosite-v2022
 *
 * Template structure replicated exactly:
 *   openning-num-first  = "01"                     (hundreds)
 *   openning-num-second = "0123456789"              (tens, 10 digits)
 *   openning-num-third  = "01234567890123456789"    (units, 20 digits × 2 cycles)
 *   openning-num-forth  = "0"                       (final tens — static)
 *   openning-num-five   = "0"                       (final units — static)
 *   openning-percent    = "%"
 *
 * GSAP timings replicated as CSS animations (config.client.js):
 *   NumSecond (tens):   duration 2.98s, delay 0.58s → ends at 3.56s
 *   NumThird  (units):  duration 2.98s, delay 0.58s → ends at 3.56s
 *   NumFirst  (hundreds): duration 0.28s, delay 3.44s → ends at 3.72s
 *
 * Using CSS animation (not rAF+easeInOut) eliminates the "lag at 100" issue
 * because the browser compositor drives it at exactly cubic-bezier(0.43,0.05,0.17,1).
 */

// Digits for each reel position
const TENS_DIGITS  = [0,1,2,3,4,5,6,7,8,9];
const UNITS_DIGITS = [0,1,2,3,4,5,6,7,8,9, 0,1,2,3,4,5,6,7,8,9];
const HUND_DIGITS  = [0,1];

function Reel({ digits, cls }) {
  return (
    <div className={styles.col}>
      <div className={`${styles.reel} ${cls}`}>
        {digits.map((d, i) => (
          <span key={i} className={styles.digit}>{d}</span>
        ))}
      </div>
    </div>
  );
}

// The spinning counter — CSS animations running
function AnimatedCounter() {
  return (
    <div className={styles.counter}>
      <Reel digits={HUND_DIGITS}  cls={styles.reelH} />
      <Reel digits={TENS_DIGITS}  cls={styles.reelT} />
      <Reel digits={UNITS_DIGITS} cls={styles.reelU} />
      <span className={styles.pct}>%</span>
    </div>
  );
}

// Static "100 %" shown after animation completes
function StaticCounter() {
  return (
    <div className={styles.counter}>
      <div className={styles.col}><div className={styles.reel}><span className={styles.digit}>1</span></div></div>
      <div className={styles.col}><div className={styles.reel}><span className={styles.digit}>0</span></div></div>
      <div className={styles.col}><div className={styles.reel}><span className={styles.digit}>0</span></div></div>
      <span className={styles.pct}>%</span>
    </div>
  );
}

export function SplashScreen({ onComplete }) {
  // phase: 'counting' → 'show100' → 'reveal' → 'exit'
  const [phase, setPhase] = useState('counting');

  useEffect(() => {
    let timers = [];
    const schedule = (fn, ms) => timers.push(setTimeout(fn, ms));

    // Wait for Six Caps before starting (display=block in root.jsx)
    document.fonts.ready.then(() => {
      // CSS animations start immediately on mount.
      // Switch to static "100%" 80 ms after the last CSS animation ends (3720 ms).
      schedule(() => setPhase('show100'),  3800);
      // Reveal name 600 ms later
      schedule(() => setPhase('reveal'),   4500);
      // Start wipe-up exit
      schedule(() => setPhase('exit'),     5400);
      // Unmount — give wipe animation 950 ms to complete
      schedule(onComplete,                 6350);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const isCounting = phase === 'counting';
  const isReveal   = phase === 'reveal' || phase === 'exit';
  const isExit     = phase === 'exit';

  return (
    <div className={styles.overlay} data-exit={isExit}>
      <div className={styles.stage}>

        {/* Animated counter while counting, static after */}
        <div className={styles.counterWrap}
             data-hide={!isCounting && phase !== 'show100'}>
          {isCounting ? <AnimatedCounter /> : <StaticCounter />}
        </div>

        {/* Name + role — revealed after 100% */}
        <div className={styles.nameBlock} data-show={isReveal}>
          <p className={styles.name}>ANIKET ADHAV</p>
          <p className={styles.role}>Developer</p>
        </div>

      </div>

      <span className={styles.labelBL}>© 2025</span>
      <span className={styles.labelBR} data-hide={!isCounting}>Loading</span>
    </div>
  );
}
