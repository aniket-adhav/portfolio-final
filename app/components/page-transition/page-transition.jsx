import { AnimatePresence, motion } from 'framer-motion';
import styles from './page-transition.module.css';

const curtainVariants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: '0%',
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05,
    },
  },
};

const stripeVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
  },
  exit: {
    scaleX: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

const labelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
};

export function PageTransition({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.curtain}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          aria-hidden="true"
        >
          <motion.div
            className={styles.stripe}
            variants={stripeVariants}
          />
          <motion.div
            className={styles.label}
            variants={labelVariants}
          >
            <span className={styles.dot} />
            <span className={styles.labelText}>Loading</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
