import type { Credential, EducationItem } from './types';

/**
 * ✏️ EDITE AQUI: formação acadêmica.
 * Adicione `institution` e `period` quando quiser exibi-los.
 */
export const education: EducationItem[] = [
  {
    degree: 'Bacharelado em Engenharia de Software',
    // institution: 'Nome da instituição',
    // period: '2024 — 2028',
    status: 'Em andamento',
    description:
      'Graduação com foco em fundamentos de engenharia de software: análise, arquitetura, banco de dados, desenvolvimento web e qualidade.',
  },
];

/**
 * ✏️ EDITE AQUI: certificações, cursos e trilhas. Nenhuma foi inventada.
 *
 * Exemplo:
 * {
 *   id: 'exemplo',
 *   kind: 'certificação',        // 'certificação' | 'curso' | 'trilha'
 *   title: 'Nome da certificação',
 *   issuer: 'Instituição emissora',
 *   date: 'Mar 2025',
 *   credentialId: 'ABC-123',
 *   credentialUrl: 'https://...',
 *   details: 'O que foi estudado',
 *   skills: ['React', 'TypeScript'],
 * }
 */
export const credentials: Credential[] = [];
