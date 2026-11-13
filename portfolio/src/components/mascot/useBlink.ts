import { useEffect, useState } from 'react';

/**
 * Piscar em intervalos naturais e irregulares (≈ 2,2s a 6,2s), com 18% de chance de piscar duas vezes.
 * `slow` deixa o intervalo maior (ex.: personagem sonolento).
 */
export function useBlink(paused = false, slow = false): boolean {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (paused) {
      setBlinking(false);
      return;
    }
    let timer: number;
    let cancelled = false;

    const schedule = () => {
      const wait = (slow ? 3500 : 2200) + Math.random() * 4000;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setBlinking(true);
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setBlinking(false);
          if (Math.random() < 0.18) {
            timer = window.setTimeout(() => {
              if (cancelled) return;
              setBlinking(true);
              timer = window.setTimeout(() => {
                if (cancelled) return;
                setBlinking(false);
                schedule();
              }, 110);
            }, 150);
          } else {
            schedule();
          }
        }, 120);
      }, wait);
    };

    schedule();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [paused, slow]);

  return blinking;
}
