import { useRef, useCallback } from 'react';
import styles from './magnetic-button.module.css';

const RADIUS = 100;
const STRENGTH = 0.38;

export function MagneticButton({ children, radius = RADIUS, strength = STRENGTH }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = useCallback(
    e => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const rect = outer.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      inner.style.transition = 'transform 0.12s linear';
      inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
    inner.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <div
      ref={outerRef}
      className={styles.magnet}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
