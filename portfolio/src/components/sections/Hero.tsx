import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, FolderGit2, Github, Mail } from 'lucide-react';
import { links, profile } from '@/data/profile';
import { Mascot } from '@/components/mascot/Mascot';
import { useMascotBrain } from '@/components/mascot/MascotContext';
import { Button } from '@/components/ui/Button';
import { useTypewriter } from '@/hooks/useTypewriter';

const GLYPHS = [
  { t: '{}', cls: 'left-[6%] top-[18%]', depth: -60 },
  { t: '</>', cls: 'right-[8%] top-[14%]', depth: -110 },
  { t: '=>', cls: 'left-[44%] top-[8%]', depth: -40 },
  { t: '&&', cls: 'right-[4%] bottom-[28%]', depth: -90 },
  { t: '$', cls: 'left-[3%] bottom-[22%]', depth: -130 },
  { t: '!', cls: 'right-[36%] bottom-[10%]', depth: -50 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion } = useMascotBrain();
  const tagline = useTypewriter(profile.taglines, { disabled: reducedMotion });

  // Parallax discreto: os símbolos sobem em velocidades diferentes conforme a rolagem.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {!reducedMotion &&
        GLYPHS.map((g) => <Glyph key={g.t} {...g} progress={scrollYProgress} />)}

      <motion.div
        style={{ y: reducedMotion ? 0 : contentY }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6"
      >
        <div className="order-2 lg:order-1">
          <p className="font-mono text-sm text-accent">
            <span className="text-zinc-600">$</span> whoami
          </p>

          <h1 id="hero-title" className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-4 font-mono text-sm text-zinc-300 sm:text-base">
            <span className="text-accent">const</span> role <span className="text-zinc-500">=</span>{' '}
            <span className="text-amber-200/90">&quot;{profile.role}&quot;</span>
            <span className="text-zinc-500">;</span>
          </p>

          <p
            className="kbd-caret mt-6 min-h-[2rem] font-mono text-lg text-white sm:text-xl"
            aria-label={profile.taglines[0]}
          >
            <span className="text-accent">&gt;</span> <span aria-hidden="true">{tagline}</span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">{profile.heroDescription}</p>

          <p className="mt-5 hidden font-mono text-xs text-zinc-500 sm:block">
            <span className="text-accent">function</span> buildFuture() {'{'} <span className="text-accent">return</span>{' '}
            innovation; {'}'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              href="#projects"
              icon={<FolderGit2 size={16} />}
              gazeLabel="// projetos? ótima escolha"
              mood="excited"
            >
              Ver projetos
            </Button>
            <Button
              href={links.github}
              icon={<Github size={16} />}
              gazeLabel="// código aberto :)"
              title={links.github ? undefined : 'Adicione seu GitHub em src/data/profile.ts'}
            >
              GitHub
            </Button>
            <Button href="#contact" icon={<Mail size={16} />} gazeLabel="// vamos conversar?" mood="happy">
              Contato
            </Button>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[220px] sm:max-w-[320px] lg:order-2 lg:max-w-[420px]">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-[-8%] rounded-full border border-dashed border-accent/20 motion-safe:animate-[spin_40s_linear_infinite]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[-20%] hidden rounded-full border border-white/5 sm:block"
            />
            <Mascot />
            <p className="sr-only">
              Mascote interativo: os olhos acompanham o cursor e a expressão muda conforme você navega.
            </p>
          </div>
        </div>
      </motion.div>

      <a
        href="#about"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs text-zinc-500 transition hover:text-accent sm:flex"
      >
        scroll <ArrowDown size={14} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}

interface GlyphProps {
  t: string;
  cls: string;
  depth: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Glyph({ t, cls, depth, progress }: GlyphProps) {
  const y = useTransform(progress, [0, 1], [0, depth]);
  return (
    <motion.span
      aria-hidden="true"
      style={{ y }}
      className={`pointer-events-none absolute hidden select-none font-mono text-2xl text-accent/20 sm:block md:text-4xl ${cls}`}
    >
      {t}
    </motion.span>
  );
}
