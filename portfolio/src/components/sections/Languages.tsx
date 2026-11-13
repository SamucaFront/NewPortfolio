import { motion } from 'framer-motion';
import { Languages as LanguagesIcon } from 'lucide-react';
import { languages } from '@/data/experience';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

export function Languages() {
  return (
    <section id="languages" aria-labelledby="languages-title" className="section-pad !py-16 md:!py-24">
      <SectionHeading id="languages-title" index="05" command="locale --list" title="Idiomas" />

      <div className="grid gap-5 sm:grid-cols-2">
        {languages.map((lang, i) => (
          <Reveal key={lang.code} delay={i * 0.1}>
            <article className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <LanguagesIcon size={20} className="text-accent" />
                <span className="font-mono text-xs text-zinc-500">lang: &quot;{lang.code}&quot;</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{lang.name}</h3>
              <p className="mt-1 font-mono text-sm text-accent">{lang.level}</p>

              <div
                className="mt-5 flex gap-1.5"
                role="img"
                aria-label={`Nível ${lang.level}: ${lang.score} de 5`}
              >
                {Array.from({ length: 5 }, (_, n) => (
                  <motion.span
                    key={n}
                    initial={{ scaleY: 0.3, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + n * 0.09, type: 'spring', stiffness: 260, damping: 18 }}
                    className={cn(
                      'h-2.5 flex-1 origin-bottom rounded-full',
                      n < lang.score ? 'bg-accent shadow-[0_0_12px_-2px_rgb(var(--accent)/.8)]' : 'bg-white/10',
                    )}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
