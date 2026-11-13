import { useMemo } from 'react';
import type { Project } from '@/data/types';
import { hash32, seededRandom } from '@/lib/hash';

/** Capa do projeto: usa `image` se existir; senão gera uma arte determinística com "linhas de código". */
export function ProjectCover({ project }: { project: Project }) {
  const Icon = project.icon;

  const lines = useMemo(() => {
    const rnd = seededRandom(hash32(project.id));
    return Array.from({ length: 5 }, (_, i) => ({
      indent: Math.floor(rnd() * 3) * 14,
      width: 28 + Math.floor(rnd() * 52),
      accent: rnd() > 0.72,
      key: i,
    }));
  }, [project.id]);

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Captura de tela do projeto ${project.name}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-800" role="img" aria-label={`Capa gerada do projeto ${project.name}`}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: 'rgb(var(--accent))' }}
      />
      <div className="absolute inset-x-5 top-12 space-y-2 transition-transform duration-700 group-hover:-translate-y-1">
        {lines.map((l) => (
          <div
            key={l.key}
            className="h-1.5 rounded-full"
            style={{
              marginLeft: l.indent,
              width: `${l.width}%`,
              background: l.accent ? 'rgb(var(--accent) / .55)' : 'rgb(255 255 255 / .09)',
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-ink-950/70 text-accent shadow-glow backdrop-blur transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon size={26} />
      </div>
      <span className="absolute bottom-4 left-5 font-mono text-[11px] text-zinc-500">
        ~/{project.id}
        <span className="text-accent">$</span>
      </span>
    </div>
  );
}
