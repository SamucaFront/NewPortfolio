/** Hash determinístico (FNV-1a, 32 bits). Usado para gerar capas e "commit hashes" estáveis. */
export function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Hash curto em hexadecimal, com aparência de commit do Git (7 caracteres). */
export function shortHash(input: string): string {
  return hash32(input).toString(16).padStart(8, '0').slice(0, 7);
}

/** Gerador pseudo-aleatório determinístico (mulberry32). */
export function seededRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
