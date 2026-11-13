import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GitCommitHorizontal } from 'lucide-react';
import { experience } from '@/data/experience';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { shortHash } from '@/lib/hash';

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <SectionHeading
        id="experience-title"
        index="06"
        command="git log --oneline"
        title="Experiência profissional"
        subtitle="Histórico de versões da minha trajetória."
      />

      <ol ref={ref} className="relative ml-3 space-y-10 pl-8 sm:ml-4 sm:pl-10">
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent shadow-glow"
          style={{ scaleY }}
        />

        {experience.map((item, i) => {
          const version = `v${experience.length - i}.0.0`;
          return (
            <li key={item.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-accent bg-ink-950 text-accent sm:-left-[49px]"
              >
                <GitCommitHorizontal size={12} />
              </span>

              <Reveal>
                <article className="glass rounded-2xl p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-amber-200">{shortHash(item.id + item.role)}</span>
                    <span className="rounded border border-accent/40 px-1.5 py-0.5 text-accent">{version}</span>
                    {i === 0 && <span className="text-zinc-500">HEAD → main</span>}
                    <span className="ml-auto text-zinc-500">{item.period}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{item.role}</h3>
                  <p className="text-zinc-400">{item.company}</p>
                  <p className="mt-3 text-sm text-zinc-300">{item.summary}</p>

                  <ul className="mt-4 space-y-1.5">
                    {item.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-zinc-400">
                        <span className="font-mono text-accent">+</span>
                        {r}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias utilizadas">
                    {item.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 border-t border-white/10 pt-4 text-sm text-zinc-400">
                    <span className="font-mono text-xs text-accent">// aprendizado</span>
                    <br />
                    {item.learned}
                  </p>
                </article>
              </Reveal>
            </li>
          );
        })}

        <li className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border border-dashed border-zinc-600 bg-ink-950 sm:-left-[49px]"
          />
          <p className="kbd-caret font-mono text-sm text-zinc-500">
            <span className="text-accent">$</span> git commit -m &quot;próximo capítulo&quot;
          </p>
          {import.meta.env.DEV && (
            <p className="mt-2 font-mono text-xs text-amber-200/80">
              // dev: adicione experiências em src/data/experience.ts
            </p>
          )}
        </li>
      </ol>
    </section>
  );
}
