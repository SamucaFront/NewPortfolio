export interface GazeVector {
  /** -1..1 (esquerda → direita). */
  x: number;
  /** -1..1 (cima → baixo). */
  y: number;
}

/**
 * Converte a posição de um alvo (em px de tela) em um vetor normalizado de olhar.
 *
 * - A direção vem do ângulo entre o centro do olho e o alvo.
 * - A magnitude satura com `tanh`: perto do olho o movimento é fino e proporcional,
 *   longe ele converge para 1 (limite físico). Isso evita que a pupila "saia" do olho.
 *
 * A pele (skin) do personagem decide quantos pixels cada unidade representa
 * (por exemplo, 10px no eixo X e 8px no eixo Y), formando um limite elíptico.
 */
export function gazeVector(
  eyeX: number,
  eyeY: number,
  targetX: number,
  targetY: number,
  softness = 140,
): GazeVector {
  const dx = targetX - eyeX;
  const dy = targetY - eyeY;
  const dist = Math.hypot(dx, dy);
  if (dist < 0.5) return { x: 0, y: 0 };
  const magnitude = Math.tanh(dist / softness);
  return { x: (dx / dist) * magnitude, y: (dy / dist) * magnitude };
}

/** Suavização independente de framerate (exponencial). */
export function damp(current: number, target: number, rate: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

export const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));
