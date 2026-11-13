import { AnimatePresence, motion } from 'framer-motion';
import { Mascot } from './Mascot';
import { useMascotBrain } from './MascotContext';

/**
 * Versão compacta do personagem que fica no canto da tela depois que a Hero sai de vista.
 * É a mesma lógica (mesmo cérebro de interação), por isso ele reage às seções, botões e formulários.
 */
export function MascotDock() {
  const { section } = useMascotBrain();
  const visible = section !== 'home';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dock"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="pointer-events-none fixed bottom-3 right-3 z-40 w-[84px] sm:bottom-5 sm:right-5 sm:w-[112px]"
          data-gaze-ignore
        >
          <Mascot showCaption={false} />
          <DockBubble />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockBubble() {
  const { caption } = useMascotBrain();
  return (
    <motion.div
      key={caption}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass absolute bottom-full right-0 mb-1 hidden w-max max-w-[200px] rounded-lg px-2.5 py-1 font-mono text-[11px] text-accent md:block"
    >
      {caption}
    </motion.div>
  );
}
