import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { MascotProvider, useMascotBrain } from '@/components/mascot/MascotContext';
import { MascotDock } from '@/components/mascot/MascotDock';
import { Background } from '@/components/layout/Background';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Credentials } from '@/components/sections/Credentials';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Languages } from '@/components/sections/Languages';
import { Projects } from '@/components/sections/Projects';
import { TechStack } from '@/components/sections/TechStack';
import { BootLoader } from '@/components/ui/BootLoader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';

const BOOT_KEY = 'portfolio:booted';

function readBooted(): boolean {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1';
  } catch {
    return false;
  }
}

function Site() {
  const { setSection, reducedMotion } = useMascotBrain();
  const [booted, setBooted] = useState(readBooted);
  useActiveSection(setSection);

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1');
    } catch {
      /* armazenamento indisponível: segue sem lembrar */
    }
    setBooted(true);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] rounded-md bg-accent px-4 py-2 font-mono text-sm text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      {!booted && <BootLoader onDone={finishBoot} reducedMotion={reducedMotion} />}

      <Background />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Credentials />
        <Languages />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <MascotDock />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MascotProvider>
        <Site />
      </MascotProvider>
    </MotionConfig>
  );
}
