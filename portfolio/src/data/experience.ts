import type { ExperienceItem, LanguageItem } from './types';

/**
 * ✏️ EDITE AQUI: experiência profissional (mais recente primeiro).
 * Adicione estágios, empregos e outros trabalhos como novos itens.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'freelance',
    role: 'Desenvolvedor Full Stack Independente',
    company: 'Projetos independentes',
    period: 'Atualmente',
    summary: 'Desenvolvimento de sites e sistemas sob demanda e de produtos próprios.',
    responsibilities: [
      'Criação de sites profissionais responsivos para clientes',
      'Modelagem de bancos de dados e construção de APIs REST',
      'Desenvolvimento de interfaces web e aplicativos móveis',
      'Testes de endpoints e depuração de integrações',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    learned:
      'Conduzir um projeto do requisito ao deploy, equilibrando prazo, qualidade de código e a experiência de quem usa.',
  },
];

export const languages: LanguageItem[] = [
  { code: 'pt-BR', name: 'Português', level: 'Nativo', score: 5 },
  { code: 'en', name: 'Inglês', level: 'Intermediário', score: 3 },
];
