import { useCallback, useMemo, useState } from 'react';
import { Award, BookOpen, ExternalLink, GraduationCap, Route } from 'lucide-react';
import { credentials, education } from '@/data/credentials';
import type { Credential, CredentialKind } from '@/data/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { spotlightMove } from '@/lib/spotlight';

const kindIcon = { certificação: Award, curso: BookOpen, trilha: Route } as const;

type Filter = 'todos' | CredentialKind;

function CredentialDetails({ item }: { item: Credential }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-mono text-xs text-accent">{item.kind}</p>
        <h4 className="mt-1 text-2xl font-bold text-white">{item.title}</h4>
      </div>
      <dl className="grid gap-3 font-mono text-sm sm:grid-cols-2">
        <div>
          <dt className="text-zinc-500">emissor</dt>
          <dd className="text-zinc-200">{item.issuer}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">conclusão</dt>
          <dd className="text-zinc-200">{item.date}</dd>
        </div>
        {item.credentialId && (
          <div className="sm:col-span-2">
            <dt className="text-zinc-500">credencial</dt>
            <dd className="break-all text-zinc-200">{item.credentialId}</dd>
          </div>
        )}
      </dl>
      {item.details && <p className="leading-relaxed text-zinc-300">{item.details}</p>}
      {item.skills && item.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {item.skills.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      )}
      {item.credentialUrl && (
        <Button variant="primary" href={item.credentialUrl} icon={<ExternalLink size={16} />}>
          Verificar credencial
        </Button>
      )}
    </div>
  );
}

export function Credentials() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [selected, setSelected] = useState<Credential | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const kinds = useMemo(() => Array.from(new Set(credentials.map((c) => c.kind))), []);
  const visible = credentials.filter((c) => filter === 'todos' || c.kind === filter);

  return (
    <section id="credentials" aria-labelledby="credentials-title" className="section-pad">
      <SectionHeading
        id="credentials-title"
        index="04"
        command="cat education.json certs.json"
        title="Formação & certificações"
        subtitle="Base acadêmica e aprendizado contínuo."
      />

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          {education.map((e) => (
            <Reveal key={e.degree}>
              <article className="glass rounded-2xl p-6">
                <GraduationCap className="text-accent" size={24} />
                <h3 className="mt-4 text-xl font-semibold text-white">{e.degree}</h3>
                {e.institution && <p className="mt-1 text-zinc-300">{e.institution}</p>}
                <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className="rounded-full border border-accent/40 px-2 py-0.5 text-accent">{e.status}</span>
                  {e.period && <span>{e.period}</span>}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{e.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div>
          {kinds.length > 1 && (
            <div role="group" aria-label="Filtrar credenciais" className="mb-5 flex flex-wrap gap-2 font-mono text-xs">
              {(['todos', ...kinds] as Filter[]).map((f) => (
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
                  {f}
                </button>
              ))}
            </div>
          )}

          {credentials.length === 0 ? (
            <Reveal>
              <div className="glass rounded-2xl border-dashed p-8 font-mono text-sm">
                <p className="text-accent">$ ls ./certificacoes</p>
                <p className="mt-2 text-zinc-400">
                  <span className="text-zinc-600">&gt;</span> nenhuma credencial publicada ainda.
                </p>
                <p className="kbd-caret mt-1 text-zinc-500">
                  <span className="text-zinc-600">&gt;</span> aprendizado em andamento
                </p>
                {import.meta.env.DEV && (
                  <p className="mt-4 text-xs text-amber-200/80">
                    // dev: adicione itens em src/data/credentials.ts (esta nota só aparece em desenvolvimento)
                  </p>
                )}
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {visible.map((c, i) => {
                const Icon = kindIcon[c.kind];
                return (
                  <Reveal key={c.id} delay={i * 0.06}>
                    <li className="h-full list-none">
                      <button
                        type="button"
                        onClick={() => setSelected(c)}
                        onPointerMove={spotlightMove}
                        data-gaze-label="// quer ver os detalhes?"
                        className="glass spotlight group h-full w-full rounded-2xl p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-accent/40"
                      >
                        <div className="flex items-center justify-between">
                          <Icon size={20} className="text-accent" />
                          <span className="font-mono text-[11px] text-zinc-500">{c.date}</span>
                        </div>
                        <h3 className="mt-4 font-semibold text-white">{c.title}</h3>
                        <p className="mt-1 text-sm text-zinc-400">{c.issuer}</p>
                        <p className="mt-4 font-mono text-[11px] text-accent opacity-0 transition group-hover:opacity-100">
                          ver detalhes →
                        </p>
                      </button>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <Modal open={selected !== null} onClose={close} title={selected ? `credentials/${selected.id}` : 'credencial'}>
        {selected && <CredentialDetails item={selected} />}
      </Modal>
    </section>
  );
}
