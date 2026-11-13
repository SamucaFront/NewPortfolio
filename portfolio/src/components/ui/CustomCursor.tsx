import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a[href],button,[data-gaze],input,textarea,select,summary,[role="button"]';

/**
 * Cursor complementar: o cursor do sistema continua visível (usabilidade),
 * e um anel suave o acompanha, crescendo sobre elementos interativos.
 * Só existe em dispositivos com mouse e sem preferência por menos movimento.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [shown, setShown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
    };
    const over = (e: PointerEvent) => setHot(Boolean((e.target as Element | null)?.closest(INTERACTIVE)));
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setShown(false);

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-accent/70"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hot ? 46 : 30,
          height: hot ? 46 : 30,
          opacity: shown ? 1 : 0,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hot ? 'rgb(61 255 154 / 0.1)' : 'rgb(61 255 154 / 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: shown ? 1 : 0 }}
      />
    </>
  );
}
