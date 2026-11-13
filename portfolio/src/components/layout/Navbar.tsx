import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/sections';
import { cn } from '@/lib/cn';
import { useMascotBrain } from '@/components/mascot/MascotContext';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { section } = useMascotBrain();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className="glass mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-xl px-4 py-2.5 sm:w-[calc(100%-3rem)]"
      >
        <a href="#home" className="font-mono text-sm font-bold text-white" aria-label="Início">
          <span className="text-accent">&lt;</span>SR<span className="text-accent">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={section === item.id ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
                  section === item.id ? 'bg-accent/10 text-accent' : 'text-zinc-400 hover:text-white',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-1.5 text-zinc-300 hover:bg-white/10 md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-3 mt-2 flex flex-col rounded-xl p-2 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 font-mono text-sm',
                    section === item.id ? 'bg-accent/10 text-accent' : 'text-zinc-300',
                  )}
                >
                  <span className="text-zinc-600">&gt;</span> {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
