import type { ReactNode } from 'react';
import { GraduationCap, Heart, Lightbulb, Target } from 'lucide-react';
import { profile } from '@/data/profile';
import { CodeWindow } from '@/components/ui/CodeWindow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { spotlightMove } from '@/lib/spotlight';

const developer = {
  name: profile.name,
  role: 'Software Developer',
  education: profile.about.education,
  focus: ['Backend', 'Frontend', 'Database'],
  interests: profile.about.interests,
  mindset: 'Continuous Learning',
};

const Str = ({ children }: { children: string }) => <span className="text-amber-200/90">&quot;{children}&quot;</span>;

function renderValue(value: string | readonly string[]): ReactNode {
  if (typeof value === 'string') return <Str>{value}</Str>;
  return (
    <>
      <span className="text-zinc-500">[</span>
      {value.map((v, i) => (
        <span key={v}>
          <Str>{v}</Str>
          {i < value.length - 1 && <span className="text-zinc-500">, </span>}
        </span>
      ))}
      <span className="text-zinc-500">]</span>
    </>
  );
}

const pillars = [
  { icon: Lightbulb, title: 'Filosofia', text: profile.about.philosophy },
  { icon: Heart, title: 'Aprendizado', text: profile.about.learning },
  { icon: Target, title: 'Objetivo', text: profile.about.goal },
];

export function About() {
  const entries = Object.entries(developer) as Array<[string, string | readonly string[]]>;

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <SectionHeading
        id="about-title"
        index="01"
        command="cat about.md"
        title="Sobre mim"
        subtitle={profile.about.area}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="space-y-5">
          {profile.about.paragraphs.map((p) => (
            <p key={p} className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              {p}
            </p>
          ))}
          <div className="glass flex items-start gap-3 rounded-xl p-4">
            <GraduationCap className="mt-0.5 shrink-0 text-accent" size={20} />
            <div>
              <p className="text-sm font-medium text-white">{profile.about.education}</p>
              <p className="font-mono text-xs text-zinc-500">graduação em andamento</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <CodeWindow title="developer.js">
            <pre className="whitespace-pre-wrap break-words">
              <span className="text-accent">const</span> <span className="text-sky-300">developer</span>{' '}
              <span className="text-zinc-500">= {'{'}</span>
              {'\n'}
              {entries.map(([key, value]) => (
                <span key={key}>
                  {'  '}
                  <span className="text-zinc-200">{key}</span>
                  <span className="text-zinc-500">: </span>
                  {renderValue(value)}
                  <span className="text-zinc-500">,</span>
                  {'\n'}
                </span>
              ))}
              <span className="text-zinc-500">{'};'}</span>
            </pre>
          </CodeWindow>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <article
              onPointerMove={spotlightMove}
              className="glass spotlight h-full rounded-xl p-5 transition-colors hover:border-accent/30"
            >
              <Icon size={20} className="text-accent" />
              <h3 className="mt-3 font-mono text-sm text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
