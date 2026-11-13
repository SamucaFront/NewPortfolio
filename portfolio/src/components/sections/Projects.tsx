import { useCallback, useState } from 'react';
import { ArrowUpRight, Check, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/data/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { spotlightMove } from '@/lib/spotlight';
import { ProjectCover } from './ProjectCover';

function StatusBadge({ status }: { status: Project['status'] }) {
  const done = status === 'concluído';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px]',
        done ? 'border-accent/40 text-accent' : 'border-amber-300/40 text-amber-200',
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', done ? 'bg-accent' : 'animate-pulse bg-amber-300')} />
      {status}
    </span>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        onPointerMove={spotlightMove}
        data-gaze-label="// esse parece interessante"
        data-mood="excited"
        aria-label={`Ver detalhes do projeto ${project.name}`}
        className="glass spotlight group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
          <ProjectCover project={project} />
          <div className="absolute left-3 top-3">
            <StatusBadge status={project.status} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold text-white">{project.name}</h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-zinc-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tecnologias">
            {project.tech.slice(0, 4).map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
            {project.tech.length > 4 && <li className="chip text-zinc-500">+{project.tech.length - 4}</li>}
          </ul>
        </div>
      </button>
    </Reveal>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
        <ProjectCover project={project} />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-2xl font-bold text-white">{project.name}</h4>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-3 leading-relaxed text-zinc-300">{project.description}</p>
      </div>

      <div>
        <p className="font-mono text-xs text-accent">// problema que resolve</p>
        <p className="mt-1.5 text-zinc-300">{project.problem}</p>
      </div>

      <div>
        <p className="font-mono text-xs text-accent">// principais funcionalidades</p>
        <ul className="mt-2 space-y-1.5">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-zinc-300">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-mono text-xs text-accent">// tecnologias</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button
          href={project.github ?? ''}
          icon={<Github size={16} />}
          title={project.github ? undefined : 'Adicione o link em src/data/projects.ts'}
        >
          Código no GitHub
        </Button>
        <Button
          variant="primary"
          href={project.demo ?? ''}
          icon={<ExternalLink size={16} />}
          title={project.demo ? undefined : 'Demonstração indisponível'}
        >
          Ver demonstração
        </Button>
      </div>
    </div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <SectionHeading
        id="projects-title"
        index="03"
        command="git log --projects"
        title="Selected works"
        subtitle="Sistemas, APIs e aplicativos que construí. Clique em um card para ver o problema, as funcionalidades e as tecnologias."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
        ))}
      </div>

      <Modal open={selected !== null} onClose={close} title={selected ? `projects/${selected.id}` : 'projeto'}>
        {selected && <ProjectDetails project={selected} />}
      </Modal>
    </section>
  );
}
