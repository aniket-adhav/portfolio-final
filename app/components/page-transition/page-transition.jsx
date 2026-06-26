import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import styles from './page-transition.module.css';

const ENTER_DURATION = 460;
const MIN_VISIBLE = 700;

export function PageTransition() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const prevPathname = useRef(null);
  const showTimeRef = useRef(null);
  const hideTimer = useRef(null);

  function startCurtain() {
    clearTimeout(hideTimer.current);
    setShow(true);
    showTimeRef.current = Date.now();
  }

  function scheduleCurtainHide() {
    const elapsed = Date.now() - (showTimeRef.current ?? 0);
    const wait = Math.max(0, MIN_VISIBLE - elapsed);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShow(false), wait);
  }

  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const isExternal = href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto');
      if (isExternal || !href.startsWith('/projects/')) return;

      e.preventDefault();
      e.stopPropagation();

      startCurtain();

      setTimeout(() => navigate(href), 16);
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [navigate]);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = location.pathname;
      return;
    }
    if (prevPathname.current === location.pathname) return;

    const prev = prevPathname.current;
    prevPathname.current = location.pathname;

    const returningFromProject =
      prev.startsWith('/projects/') && !location.pathname.startsWith('/projects/');

    if (returningFromProject) startCurtain();

    scheduleCurtainHide();
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.curtain}
          initial={{ y: '100%' }}
          animate={{ y: '0%', transition: { duration: ENTER_DURATION / 1000, ease: [0.76, 0, 0.24, 1] } }}
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
