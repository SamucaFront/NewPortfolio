import { Reveal } from './Reveal';

interface SectionHeadingProps {
  /** id do <h2>, usado por aria-labelledby na <section>. */
  id: string;
  index: string;
  command: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, index, command, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-xs text-accent sm:text-sm">
        <span className="text-zinc-600">{index} /</span> {command}
      </p>
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
