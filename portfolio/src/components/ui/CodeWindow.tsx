import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CodeWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** Janela estilo editor/terminal usada para exibir blocos de código. */
export function CodeWindow({ title, children, className }: CodeWindowProps) {
  return (
    <div className={cn('glass noise relative overflow-hidden rounded-xl', className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="ml-3 truncate font-mono text-xs text-zinc-500">{title}</span>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-sm">{children}</div>
    </div>
  );
}
