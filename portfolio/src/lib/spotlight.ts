import type { PointerEvent } from 'react';

/** Atualiza --mx/--my para o efeito de holofote (.spotlight) seguir o mouse sem re-render. */
export function spotlightMove(e: PointerEvent<HTMLElement>): void {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
