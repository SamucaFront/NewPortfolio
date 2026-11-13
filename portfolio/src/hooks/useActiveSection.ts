import { useEffect } from 'react';
import { sectionIds, type SectionId } from '@/data/sections';

/** Observa as seções e avisa qual está no centro da tela. */
export function useActiveSection(onChange: (id: SectionId) => void): void {
  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onChange(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onChange]);
}
