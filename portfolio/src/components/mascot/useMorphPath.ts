import { useEffect, useRef, useState } from 'react';

/** Extrai os números de um caminho no formato "M x y Q cx cy x y". */
function parse(path: string): number[] {
  return (path.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
}

const format = (n: number[]): string =>
  `M ${n[0].toFixed(2)} ${n[1].toFixed(2)} Q ${n[2].toFixed(2)} ${n[3].toFixed(2)} ${n[4].toFixed(2)} ${n[5].toFixed(2)}`;

/**
 * Interpola suavemente entre caminhos com a mesma estrutura (mola crítica).
 * Feito à mão em vez de animar o atributo `d`, para funcionar em todos os navegadores.
 */
export function useMorphPath(target: string, reduced = false): string {
  const [d, setD] = useState(target);
  const current = useRef(parse(target));

  useEffect(() => {
    const to = parse(target);
    if (reduced) {
      current.current = to;
      setD(target);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-16 * dt);
      let delta = 0;
      current.current = current.current.map((v, i) => {
        const next = v + (to[i] - v) * k;
        delta = Math.max(delta, Math.abs(to[i] - next));
        return next;
      });
      setD(format(current.current));
      if (delta > 0.02) raf = requestAnimationFrame(tick);
      else {
        current.current = to;
        setD(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);

  return d;
}
