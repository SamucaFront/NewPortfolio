import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { levelMeta, stack } from '@/data/stack';
import type { SkillLevel, Tech } from '@/data/types';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { spotlightMove } from '@/lib/spotlight';

type Filter = 'all' | SkillLevel;

const levelOrder: SkillLevel[] = ['advanced', 'intermediate', 'learning'];

function Pips({ level }: { level: SkillLevel }) {
  const total = 3;
  const filled = levelMeta[level].pips;
  return (
    <span className="ml-auto flex gap-0.5" role="img" aria-label={levelMeta[level].label}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn('h-1.5 w-1.5 rounded-full', i < filled ? 'bg-accent' : 'bg-white/15')} />
      ))}
    </span>
  );
}

function TechChip({ tech, dimmed }: { tech: Tech; dimmed: boolean }) {
  const Icon = tech.icon;
  return (
    <motion.li
      layout
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      title={tech.level ? levelMeta[tech.level].label : undefined}
      className={cn(
        'group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-200 transition-[opacity,border-color,background] duration-300 hover:border-accent/50 hover:bg-accent/[0.06]',
        dimmed && 'opacity-25',
      )}
    >
      <Icon size={16} className="shrink-0 text-accent transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
      <span className="truncate">{tech.name}</span>
      {tech.level && <Pips level={tech.level} />}
    </motion.li>
  );
}

export function TechStack() {
  const [filter, setFilter] = useState<Filter>('all');

  // Só exibe filtros/legenda dos níveis que realmente foram informados.
  const presentLevels = useMemo(() => {
    const set = new Set<SkillLevel>();
    stack.forEach((c) => c.items.forEach((t) => t.level && set.add(t.level)));
    return levelOrder.filter((l) => set.has(l));
  }, []);

  const marquee = useMemo(() => stack.flatMap((c) => c.items.map((t) => t.name)), []);

  return (
    <section id="stack" aria-labelledby="stack-title" className="section-pad">
      <SectionHeading
        id="stack-title"
        index="02"
        command="ls ./tech-stack"
        title="Tech stack"
        subtitle="Ferramentas e tecnologias que uso para projetar, construir e entregar software."
      />

      {presentLevels.length > 0 && (
        <Reveal className="mb-8">
          <div role="group" aria-label="Filtrar por nível" className="flex flex-wrap gap-2 font-mono text-xs">
            {(['all', ...presentLevels] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-md border px-3 py-1.5 transition',
                  filter === f
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 text-zinc-400 hover:text-white',
                )}
              >
                {f === 'all' ? 'todas' : levelMeta[f].label.toLowerCase()}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {stack.map((cat, i) => (
          <Reveal
            key={cat.id}
            delay={i * 0.06}
            className={cn(i < 3 ? 'lg:col-span-2' : 'lg:col-span-3')}
          >
            <article
              onPointerMove={spotlightMove}
              className="glass spotlight h-full rounded-2xl p-5 transition-colors hover:border-white/20"
            >
              <header className="mb-4 flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                <span className="font-mono text-[11px] text-zinc-600">{cat.command}</span>
              </header>
              <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                {cat.items.map((t) => (
                  <TechChip key={t.name} tech={t} dimmed={filter !== 'all' && t.level !== filter} />
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mask-x mt-12 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-3 font-mono text-xs text-zinc-500 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((name, i) => (
            <span key={`${name}-${i}`} className="chip whitespace-nowrap">
              <span className="text-accent">#</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
