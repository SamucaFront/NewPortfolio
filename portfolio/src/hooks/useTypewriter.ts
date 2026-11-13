import { useEffect, useState } from 'react';

interface Options {
  typeMs?: number;
  deleteMs?: number;
  pauseMs?: number;
  /** Sem animação: mostra a primeira frase completa. */
  disabled?: boolean;
}

/** Efeito de digitação em loop sobre uma lista de frases. */
export function useTypewriter(
  phrases: readonly string[],
  { typeMs = 42, deleteMs = 22, pauseMs = 1800, disabled = false }: Options = {},
): string {
  const [text, setText] = useState(disabled ? (phrases[0] ?? '') : '');

  useEffect(() => {
    if (disabled || phrases.length === 0) {
      setText(phrases[0] ?? '');
      return;
    }
    let i = 0;
    let pos = 0;
    let deleting = false;
    let timer: number;

    const step = () => {
      const phrase = phrases[i];
      if (!deleting) {
        pos++;
        setText(phrase.slice(0, pos));
        if (pos === phrase.length) {
          deleting = true;
          timer = window.setTimeout(step, pauseMs);
          return;
        }
        timer = window.setTimeout(step, typeMs + Math.random() * 40);
      } else {
        pos--;
        setText(phrase.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          timer = window.setTimeout(step, 350);
          return;
        }
        timer = window.setTimeout(step, deleteMs);
      }
    };

    timer = window.setTimeout(step, 500);
    return () => window.clearTimeout(timer);
  }, [phrases, typeMs, deleteMs, pauseMs, disabled]);

  return text;
}
