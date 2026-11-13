import { Dumbbell, Landmark, Scale, Smartphone, Stethoscope, TrendingUp } from 'lucide-react';
import type { Project } from './types';

/**
 * ✏️ EDITE AQUI: projetos.
 * - `github` / `demo`: cole as URLs. Vazio = botão desabilitado.
 * - `image`: coloque o print em /public/projects/ e informe o caminho (ex.: "/projects/lexcore.png").
 *   Sem imagem, o card usa uma capa gerada.
 */
export const projects: Project[] = [
  {
    id: 'lexcore',
    name: 'LexCore',
    tagline: 'Plataforma SaaS de gestão para escritórios de advocacia.',
    description:
      'Dashboard completo para a operação de um escritório de advocacia, organizado em monorepo com front-end e API separados e uma biblioteca própria de componentes de interface.',
    problem: 'Centralizar em um único painel a rotina de gestão de um escritório de advocacia.',
    features: [
      'Monorepo com 10 módulos de negócio',
      'Autenticação com JWT',
      'Biblioteca completa de componentes de UI',
      'Persistência com PostgreSQL e Prisma',
    ],
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'JWT', 'Turborepo'],
    status: 'concluído',
    icon: Scale,
  },
  {
    id: 'noctis-capital',
    name: 'Noctis Capital',
    tagline: 'SaaS financeiro full stack com interface dark premium.',
    description:
      'Plataforma financeira full stack com back-end em Node.js, autenticação por tokens e uma interface escura pensada para uso prolongado.',
    problem: 'Reunir o controle financeiro em uma plataforma segura, com acesso autenticado e visual profissional.',
    features: ['API em Node.js com Express', 'Autenticação JWT', 'Banco PostgreSQL', 'Front-end dark theme'],
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    status: 'em desenvolvimento',
    icon: TrendingUp,
  },
  {
    id: 'gm-training',
    name: 'GM Training',
    tagline: 'Plataforma premium de venda de cursos fitness online.',
    description:
      'Plataforma de cursos online de musculação, funcional, mobilidade e performance, com identidade visual preta e vermelha e foco em experiência do aluno.',
    problem: 'Vender e entregar cursos fitness em um só lugar, com área do aluno e gestão de conteúdo.',
    features: [
      'Login e cadastro',
      'Catálogo de cursos e página de detalhes',
      'Ranking com pódio',
      'Player de aulas e painel administrativo (escopo do projeto)',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    status: 'em desenvolvimento',
    icon: Dumbbell,
  },
  {
    id: 'vintra-capital',
    name: 'Vintra Capital',
    tagline: 'Sistema de gestão de empréstimos com cálculo automático de parcelas.',
    description:
      'Sistema de gestão de empréstimos com dashboard, agenda, controle de gastos e cálculo automático de juros e multas por atraso. Evoluiu de uma versão em HTML/JS puro para uma API REST.',
    problem: 'Controlar clientes, parcelas e vencimentos sem planilhas manuais e sem esquecer cobranças.',
    features: [
      'Cadastro de clientes e criação de empréstimos',
      'Parcelas com juros mensais e acréscimo por atraso',
      'Agenda com visões de lista, semana e mês',
      'Notificações de vencimento por e-mail e SMS',
    ],
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Nodemailer', 'Twilio'],
    status: 'em desenvolvimento',
    icon: Landmark,
  },
  {
    id: 'odontoplus',
    name: 'Clínica OdontoPlus',
    tagline: 'API REST para gestão de clínica odontológica.',
    description:
      'API em TypeScript e Node.js com autenticação, envio de e-mails e persistência relacional, desenvolvida para a disciplina de Desenvolvimento Web 2 e testada endpoint a endpoint.',
    problem: 'Estruturar o back-end de uma clínica com autenticação segura e comunicação por e-mail.',
    features: [
      'CRUD completo com TypeORM',
      'Senhas protegidas com bcrypt e sessões com JWT',
      'Envio de e-mails via SMTP',
      '20 endpoints testados no Postman',
    ],
    tech: ['TypeScript', 'Express', 'TypeORM', 'PostgreSQL', 'JWT', 'Postman'],
    status: 'concluído',
    icon: Stethoscope,
  },
  {
    id: 'emprestimopro',
    name: 'EmpréstimoPRO',
    tagline: 'App Android nativo de gestão de empréstimos.',
    description:
      'Aplicativo Android escrito em Kotlin com Jetpack Compose, armazenamento local com Room e navegação declarativa.',
    problem: 'Acompanhar empréstimos direto do celular, mesmo sem conexão.',
    features: ['Interface em Jetpack Compose', 'Persistência local com Room', 'Navigation Compose'],
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Navigation Compose'],
    status: 'concluído',
    icon: Smartphone,
  },
];
