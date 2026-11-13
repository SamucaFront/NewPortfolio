import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BootLoaderProps {
  onDone: () => void;
  reducedMotion: boolean;
}

const LINES = [
  '$ boot samuel-reges.dev',
  '> carregando módulos... ok',
  '> compilando interface... ok',
  '> acordando o mascote... ok',
  '> ready.',
];

/** Tela de inicialização estilo terminal. Qualquer tecla ou clique pula. */
export function BootLoader({ onDone, reducedMotion }: BootLoaderProps) {
  const [count, setCount] = useState(reducedMotion ? LINES.length : 0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (leaving) return;
    if (count >= LINES.length) {
      const t = window.setTimeout(() => setLeaving(true), reducedMotion ? 150 : 350);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c + 1), 280);
    return () => window.clearTimeout(t);
  }, [count, leaving, reducedMotion]);

  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const progress = Math.round((Math.min(count, LINES.length) / LINES.length) * 100);

  return (
    <AnimatePresence onExitComplete={() => doneRef.current()}>
      {!leaving && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Carregando portfólio"
          className="scanlines fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 px-6"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-full max-w-md font-mono text-sm">
            <div className="space-y-1.5">
              {LINES.slice(0, count).map((line) => (
                <p key={line} className={line.startsWith('$') ? 'text-accent' : 'text-zinc-400'}>
                  {line}
                </p>
              ))}
              <p className="kbd-caret h-5" />
            </div>
            <div className="mt-6 h-1 w-full overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-accent shadow-glow"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-zinc-600">
              <span>{progress}%</span>
              <span>pressione qualquer tecla para pular</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
