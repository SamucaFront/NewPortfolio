import type { SectionId } from '@/data/sections';

export type Expression = 'idle' | 'curious' | 'happy' | 'focused' | 'excited' | 'surprised' | 'sleepy';
export type Accessory = 'none' | 'zzz' | 'bang' | 'sparkle';

export interface ExpressionSpec {
  /** 0..1: quanto a pálpebra superior cobre o olho. */
  lidTop: number;
  /** 0..1: quanto a pálpebra inferior sobe (olhos "sorrindo"). */
  lidBottom: number;
  /** Inclinação da pálpebra em graus (positivo = sobrancelha séria). */
  tilt: number;
  eyeScale: number;
  pupilScale: number;
  /** Caminho da boca; todos usam a mesma estrutura `M Q` para interpolar suavemente. */
  mouth: string;
  cheek: number;
  accessory: Accessory;
}

export const expressionSpecs: Record<Expression, ExpressionSpec> = {
  idle: {
    lidTop: 0,
    lidBottom: 0,
    tilt: 0,
    eyeScale: 1,
    pupilScale: 1,
    mouth: 'M -14 0 Q 0 8 14 0',
    cheek: 0,
    accessory: 'none',
  },
  curious: {
    lidTop: 0,
    lidBottom: 0,
    tilt: -4,
    eyeScale: 1.07,
    pupilScale: 1.12,
    mouth: 'M -10 2 Q 2 6 12 -1',
    cheek: 0,
    accessory: 'none',
  },
  happy: {
    lidTop: 0,
    lidBottom: 0.5,
    tilt: 0,
    eyeScale: 1,
    pupilScale: 1,
    mouth: 'M -18 -3 Q 0 16 18 -3',
    cheek: 0.55,
    accessory: 'none',
  },
  focused: {
    lidTop: 0.3,
    lidBottom: 0,
    tilt: 11,
    eyeScale: 1,
    pupilScale: 0.92,
    mouth: 'M -12 2 Q 0 3 12 2',
    cheek: 0,
    accessory: 'none',
  },
  excited: {
    lidTop: 0,
    lidBottom: 0.2,
    tilt: 0,
    eyeScale: 1.1,
    pupilScale: 1.2,
    mouth: 'M -17 -2 Q 0 19 17 -2',
    cheek: 0.7,
    accessory: 'sparkle',
  },
  surprised: {
    lidTop: 0,
    lidBottom: 0,
    tilt: 0,
    eyeScale: 1.15,
    pupilScale: 0.75,
    mouth: 'M -6 -2 Q 0 22 6 -2',
    cheek: 0,
    accessory: 'bang',
  },
  sleepy: {
    lidTop: 0.64,
    lidBottom: 0,
    tilt: 0,
    eyeScale: 1,
    pupilScale: 0.9,
    mouth: 'M -9 3 Q 0 4 9 3',
    cheek: 0,
    accessory: 'zzz',
  },
};

/** Humor base e legenda de cada seção (o personagem "reage" ao conteúdo). */
export const sectionMood: Record<SectionId, { expression: Expression; caption: string }> = {
  home: { expression: 'idle', caption: '// online e de olho em você' },
  about: { expression: 'curious', caption: '// conhecendo o dev...' },
  stack: { expression: 'focused', caption: '// compilando skills' },
  projects: { expression: 'excited', caption: '// ooh, projetos!' },
  credentials: { expression: 'curious', caption: '// formação em andamento' },
  languages: { expression: 'happy', caption: '// hello, world! olá, mundo!' },
  experience: { expression: 'focused', caption: '// git log --oneline' },
  contact: { expression: 'happy', caption: '// vamos construir algo?' },
};

export const defaultHoverCaption = '// hmm... vai clicar?';
export const sleepyCaption = '// zzz...';
export const wakeCaption = '// opa! acordei';
