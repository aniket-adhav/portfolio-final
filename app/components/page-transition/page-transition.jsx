import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import styles from './page-transition.module.css';

export function PageTransition() {
  const location = useLocation();
  const prevPathname = useRef(null);
  const timerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = location.pathname;
      return;
    }

    if (prevPathname.current === location.pathname) {
      return;
    }

    prevPathname.current = location.pathname;

    clearTimeout(timerRef.current);
    setAnimKey(k => k + 1);
    setShow(true);

    timerRef.current = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={animKey}
          className={styles.curtain}
          initial={{ y: '100%' }}
          animate={{ y: '0%', transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
          exit={{ y: '-100%', transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <motion.div
            className={styles.stripe}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1], delay: 0.12 } }}
            exit={{ scaleX: 0, transition: { duration: 0.2 } }}
          />
          <motion.div
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.25 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
          >
            <span className={styles.dot} />
            <span className={styles.labelText}>Loading</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
