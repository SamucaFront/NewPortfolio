import { useState, type FormEvent } from 'react';
import { ArrowRight, Github, Linkedin, Loader2, Mail } from 'lucide-react';
import { contactEndpoint, links } from '@/data/profile';
import { useMascotBrain } from '@/components/mascot/MascotContext';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const channels = [
  { label: 'LinkedIn', icon: Linkedin, href: links.linkedin, display: 'linkedin' },
  { label: 'GitHub', icon: Github, href: links.github, display: 'github' },
  { label: 'E-mail', icon: Mail, href: links.email ? `mailto:${links.email}` : '', display: links.email || 'e-mail' },
];

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-600 transition focus:border-accent focus:bg-accent/[0.04] focus:outline-none';

export function Contact() {
  const { react } = useMascotBrain();
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const canSend = Boolean(contactEndpoint || links.email);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Campo isca: robôs preenchem, pessoas não veem.
    if (data.get('website')) return;

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      setFeedback('Preencha nome, e-mail e mensagem.');
      react('focused', '// faltou algum campo', 1500);
      return;
    }

    try {
      if (contactEndpoint) {
        setStatus('sending');
        const res = await fetch(contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus('sent');
        setFeedback('Mensagem enviada! Retorno em breve.');
        form.reset();
        react('excited', '// mensagem enviada!', 2200);
      } else if (links.email) {
        const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
        setStatus('sent');
        setFeedback('Abrindo seu aplicativo de e-mail...');
        react('happy', '// boa! abrindo o e-mail', 2200);
      }
    } catch {
      setStatus('error');
      setFeedback('Não foi possível enviar agora. Tente novamente ou use um dos canais ao lado.');
      react('surprised', '// ops, deu erro', 2000);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <SectionHeading
        id="contact-title"
        index="07"
        command="./connect --now"
        title="Let's connect"
        subtitle="Projeto, vaga, parceria ou só uma conversa sobre tecnologia: a caixa de entrada está aberta."
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-mono text-2xl font-bold leading-snug text-white sm:text-3xl">
            <span className="text-accent">&gt;</span> Ready to build something{' '}
            <span className="text-gradient">extraordinary</span>?
          </p>

          <ul className="mt-8 space-y-3">
            {channels.map(({ label, icon: Icon, href, display }) => {
              const enabled = href !== '';
              const body = (
                <>
                  <Icon size={18} className="text-accent" />
                  <span className="font-mono text-sm">{label}</span>
                  <span className="ml-auto truncate font-mono text-xs text-zinc-500">
                    {enabled ? display : 'em breve'}
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-accent"
                  />
                </>
              );
              const base =
                'group glass flex items-center gap-3 rounded-xl px-4 py-3.5 text-zinc-200 transition';
              return (
                <li key={label}>
                  {enabled ? (
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={cn(base, 'hover:border-accent/40 hover:bg-accent/[0.04]')}
                      data-gaze-label={`// ${label.toLowerCase()}, boa!`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cn(base, 'opacity-50')} aria-disabled="true">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-2xl p-5 sm:p-7" aria-label="Formulário de contato">
            <div>
              <label htmlFor="c-name" className="mb-1.5 block font-mono text-xs text-zinc-400">
                <span className="text-accent">$</span> nome
              </label>
              <input id="c-name" name="name" type="text" autoComplete="name" required className={fieldClass} placeholder="Seu nome" />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block font-mono text-xs text-zinc-400">
                <span className="text-accent">$</span> e-mail
              </label>
              <input id="c-email" name="email" type="email" autoComplete="email" required className={fieldClass} placeholder="voce@exemplo.com" />
            </div>
            <div>
              <label htmlFor="c-message" className="mb-1.5 block font-mono text-xs text-zinc-400">
                <span className="text-accent">$</span> mensagem
              </label>
              <textarea id="c-message" name="message" rows={5} required className={cn(fieldClass, 'resize-y')} placeholder="Conte sobre o projeto ou a oportunidade..." />
            </div>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Não preencha
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                type="submit"
                variant="primary"
                disabled={!canSend || status === 'sending'}
                gazeLabel="// manda ver!"
                mood="excited"
                className="group"
                title={canSend ? undefined : 'Configure o e-mail em src/data/profile.ts ou VITE_CONTACT_ENDPOINT'}
                icon={status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : undefined}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
                {status !== 'sending' && (
                  <ArrowRight size={16} className="ml-1 inline transition-transform duration-300 group-hover:translate-x-1.5" />
                )}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className={cn(
                  'font-mono text-xs',
                  status === 'error' ? 'text-red-300' : status === 'sent' ? 'text-accent' : 'text-zinc-500',
                )}
              >
                {feedback || (canSend ? '' : '// formulário aguardando configuração de e-mail')}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
