import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './page-transition.module.css';

const ENTER_MS = 420;
const MIN_VISIBLE_MS = 620;

export function PageTransition() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const prevPathname = useRef(null);
  const showTimeRef = useRef(null);
  const hideTimer = useRef(null);
  const navTimer = useRef(null);

  function showCurtain() {
    clearTimeout(hideTimer.current);
    showTimeRef.current = Date.now();
    flushSync(() => setShow(true));
  }

  function scheduleCurtainHide() {
    const elapsed = Date.now() - (showTimeRef.current ?? 0);
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShow(false), wait);
  }

  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const isExternal =
        href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto');
      if (isExternal || !href.startsWith('/projects/')) return;

      e.preventDefault();
      e.stopPropagation();

      showCurtain();

      clearTimeout(navTimer.current);
      navTimer.current = setTimeout(() => navigate(href), ENTER_MS);
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

    if (returningFromProject) showCurtain();

    scheduleCurtainHide();
  }, [location.pathname]);

  useEffect(
    () => () => {
      clearTimeout(hideTimer.current);
      clearTimeout(navTimer.current);
    },
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.curtain}
          initial={{ y: '100%' }}
          animate={{
            y: '0%',
            transition: { duration: ENTER_MS / 1000, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{ y: '-100%', transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <motion.div
            className={styles.stripe}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
            }}
            exit={{ scaleX: 0, transition: { duration: 0.18 } }}
          />
          <motion.div
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.28, ease: 'easeOut', delay: 0.22 },
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
          >
            <span className={styles.dot} />
            <span className={styles.labelText}>Loading</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
