import { useEffect, useRef, type ReactNode } from 'react';
import { clamp, damp, gazeVector } from '@/lib/gaze';
import { useMascotBrain } from './MascotContext';

interface MascotRigProps {
  children: ReactNode;
  className?: string;
}

/** Posições (relativas ao personagem, em múltiplos do viewport) para onde ele "olha ao redor" quando ocioso. */
const WANDER: Array<[number, number]> = [
  [-0.6, -0.2],
  [0.55, -0.35],
  [0.1, 0.1],
  [0.7, 0.3],
  [-0.4, 0.35],
  [0.0, -0.5],
];

/**
 * Camada de LÓGICA do olhar, independente da aparência.
 *
 * A cada frame ela descobre para onde olhar (elemento em hover/foco → ponteiro → passeio automático),
 * calcula o vetor de cada olho separadamente (os olhos convergem de leve quando o alvo está perto)
 * e publica o resultado como variáveis CSS no elemento raiz:
 *
 *   --lx --ly   olho esquerdo, -1..1
 *   --rx --ry   olho direito,  -1..1
 *   --head-x --head-y --head-r   leve movimento da cabeça
 *
 * Qualquer "skin" (SVG, PNG, Lottie...) só precisa:
 *   1. marcar o centro de cada olho com `data-eye="left"` / `data-eye="right"`;
 *   2. mover a pupila com `translate(calc(var(--lx) * Npx), calc(var(--ly) * Mpx))`.
 * Os limites físicos (N e M) pertencem à skin, formando um limite elíptico.
 */
export function MascotRig({ children, className }: MascotRigProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const brain = useMascotBrain();
  const brainRef = useRef(brain);
  brainRef.current = brain;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const leftEl = root.querySelector<Element>('[data-eye="left"]');
    const rightEl = root.querySelector<Element>('[data-eye="right"]');
    if (!leftEl || !rightEl) return;

    const s = { lx: 0, ly: 0, rx: 0, ry: 0, hx: 0, hy: 0, hr: 0 };
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const center = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const { pointerRef, reducedMotion } = brainRef.current;
      const p = pointerRef.current;
      const rootRect = root.getBoundingClientRect();
      const rc = { x: rootRect.left + rootRect.width / 2, y: rootRect.top + rootRect.height / 2 };

      // 1) Alvo: elemento em hover/foco → ponteiro → passeio automático.
      let tx: number;
      let ty: number;
      const focusTarget = p.focusEl?.isConnected ? p.focusEl : null;
      const hoverTarget = p.hoverEl?.isConnected && !root.contains(p.hoverEl) ? p.hoverEl : null;
      const el = focusTarget ?? hoverTarget;
      if (el) {
        const c = center(el);
        tx = c.x;
        ty = c.y;
      } else if (p.active) {
        tx = p.x;
        ty = p.y;
      } else if (reducedMotion) {
        tx = rc.x;
        ty = rc.y;
      } else {
        const idx = Math.floor(now / 2300) % WANDER.length;
        const [wx, wy] = WANDER[idx];
        tx = rc.x + wx * window.innerWidth * 0.5;
        ty = rc.y + wy * window.innerHeight * 0.5;
      }

      // 2) Vetor individual de cada olho.
      const le = center(leftEl);
      const re = center(rightEl);
      const lv = gazeVector(le.x, le.y, tx, ty);
      const rv = gazeVector(re.x, re.y, tx, ty);
      const hv = gazeVector(rc.x, rc.y, tx, ty, 420);

      // 3) Suavização. Saltos de alvo (hover/foco) usam uma "sacada" mais rápida.
      const rate = now < p.snapUntil ? 30 : 15;
      s.lx = damp(s.lx, lv.x, rate, dt);
      s.ly = damp(s.ly, lv.y, rate, dt);
      s.rx = damp(s.rx, rv.x, rate, dt);
      s.ry = damp(s.ry, rv.y, rate, dt);
      s.hx = damp(s.hx, hv.x * 5, 5, dt);
      s.hy = damp(s.hy, hv.y * 4, 5, dt);
      s.hr = damp(s.hr, hv.x * 4, 5, dt);

      const style = root.style;
      style.setProperty('--lx', clamp(s.lx, -1, 1).toFixed(3));
      style.setProperty('--ly', clamp(s.ly, -1, 1).toFixed(3));
      style.setProperty('--rx', clamp(s.rx, -1, 1).toFixed(3));
      style.setProperty('--ry', clamp(s.ry, -1, 1).toFixed(3));
      style.setProperty('--head-x', s.hx.toFixed(2));
      style.setProperty('--head-y', s.hy.toFixed(2));
      style.setProperty('--head-r', s.hr.toFixed(2));

      raf = requestAnimationFrame(tick);
    };

    // Só anima enquanto o personagem está visível na tela.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    io.observe(root);
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
