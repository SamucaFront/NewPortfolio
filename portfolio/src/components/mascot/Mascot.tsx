import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useMascotBrain } from './MascotContext';
import { MascotRig } from './MascotRig';
import { RobotSkin, type SkinProps } from './skins/RobotSkin';
import { useBlink } from './useBlink';

interface MascotProps {
  /** Troque aqui a aparência mantendo toda a lógica de interação. */
  skin?: ComponentType<SkinProps>;
  className?: string;
  /** Mostra o balão com o "estado" do personagem. */
  showCaption?: boolean;
}

export function Mascot({ skin: Skin = RobotSkin, className, showCaption = true }: MascotProps) {
  const { expression, caption, reducedMotion } = useMascotBrain();
  const blinking = useBlink(false, expression === 'sleepy');

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <MascotRig className={cn('aspect-[240/250] w-full', !reducedMotion && 'animate-float')}>
        <Skin expression={expression} blinking={blinking} />
      </MascotRig>

      {showCaption && (
        <motion.div
          key={caption}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="glass mt-3 max-w-full rounded-lg px-3 py-1.5 font-mono text-[11px] text-accent sm:text-xs"
          role="status"
          aria-live="off"
        >
          <span className="text-zinc-500">mood:</span> {expression} <span className="text-zinc-500">{caption}</span>
        </motion.div>
      )}
    </div>
  );
}
