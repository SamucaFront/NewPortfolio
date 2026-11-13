import type { Links } from './types';

/**
 * ✏️ EDITE AQUI: dados pessoais e links.
 * Links vazios deixam o botão correspondente desabilitado (nada quebra).
 */
export const profile = {
  name: 'Samuel Reges',
  role: 'Software Developer | Full Stack Developer',
  taglines: [
    'Transformando ideias em soluções digitais.',
    'Do banco de dados à interface.',
    'Código limpo, arquitetura clara.',
    'Aprendendo, construindo, evoluindo.',
  ],
  heroDescription:
    'Desenvolvo software de ponta a ponta: arquitetura, APIs, bancos de dados e interfaces. Gosto de resolver problemas reais com código simples de manter e experiências que funcionam bem em qualquer tela.',
  about: {
    education: 'Engenharia de Software',
    area: 'Desenvolvimento Full Stack: web, mobile e back-end',
    interests: ['APIs & Back-end', 'Arquitetura de software', 'Banco de dados', 'UI/UX', 'Dados & Analytics'],
    goal: 'Atuar profissionalmente como desenvolvedor de software, contribuindo em produtos reais e evoluindo em arquitetura e engenharia de back-end.',
    philosophy:
      'Software bom é software que dá para manter: componentes pequenos, responsabilidades bem separadas e decisões que ainda façam sentido daqui a seis meses.',
    learning:
      'Aprendo construindo. Cada projeto novo é uma oportunidade de aprofundar uma tecnologia, e entender por que algo quebrou faz parte do processo.',
    paragraphs: [
      'Sou estudante de Engenharia de Software e desenvolvedor full stack. Trabalho com aplicações web, mobile e back-end, do modelo de dados à interface, com foco em código limpo, arquitetura clara e entregas que funcionam de verdade.',
      'Curto transformar um problema confuso em um sistema organizado: modelar o domínio, expor uma API consistente e construir uma interface que não atrapalhe quem a usa.',
    ],
  },
} as const;

/** ✏️ EDITE AQUI: preencha com seus links reais. */
export const links: Links = {
  github: '', // ex.: 'https://github.com/seu-usuario'
  linkedin: '', // ex.: 'https://www.linkedin.com/in/seu-perfil'
  email: '', // ex.: 'voce@exemplo.com'
};

/** URL que recebe o formulário de contato (veja .env.example). */
export const contactEndpoint: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';
