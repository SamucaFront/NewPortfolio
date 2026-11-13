export const sectionIds = [
  'home',
  'about',
  'stack',
  'projects',
  'credentials',
  'languages',
  'experience',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];

export const navItems: Array<{ id: SectionId; label: string }> = [
  { id: 'about', label: 'sobre' },
  { id: 'stack', label: 'stack' },
  { id: 'projects', label: 'projetos' },
  { id: 'credentials', label: 'formação' },
  { id: 'experience', label: 'experiência' },
  { id: 'contact', label: 'contato' },
];
