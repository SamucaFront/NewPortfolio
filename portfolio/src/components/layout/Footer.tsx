import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-zinc-500 sm:flex-row">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          <span className="text-accent">{'</>'}</span> feito com React, TypeScript, Tailwind e Motion
        </p>
      </div>
    </footer>
  );
}
