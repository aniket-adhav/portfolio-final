import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import styles from './page-transition.module.css';

export function PageTransition() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const prevPathname = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const isInternal = !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('mailto');
      const isProjectLink = href.startsWith('/projects/');

      if (isInternal && isProjectLink) {
        clearTimeout(hideTimer.current);
        setShow(true);
      }
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = location.pathname;
      return;
    }

    if (prevPathname.current === location.pathname) return;

    const prev = prevPathname.current;
    prevPathname.current = location.pathname;

    const isProjectReturn = prev.startsWith('/projects/') && !location.pathname.startsWith('/projects/');

    if (isProjectReturn) {
      clearTimeout(hideTimer.current);
      setShow(true);
    }

    hideTimer.current = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(hideTimer.current);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
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
