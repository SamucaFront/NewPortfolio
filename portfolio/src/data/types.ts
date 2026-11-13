import type { LucideIcon } from 'lucide-react';

export type SkillLevel = 'advanced' | 'intermediate' | 'learning';

export interface Tech {
  name: string;
  icon: LucideIcon;
  /**
   * Nível de domínio. Deixe `undefined` enquanto não quiser classificar:
   * nada é inventado e a interface mostra a tecnologia sem indicador de nível.
   */
  level?: SkillLevel;
}

export interface TechCategory {
  id: string;
  title: string;
  command: string;
  items: Tech[];
}

export type ProjectStatus = 'concluído' | 'em desenvolvimento';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  tech: string[];
  status: ProjectStatus;
  icon: LucideIcon;
  /** Caminho de uma imagem em /public (ex.: "/projects/lexcore.png"). Sem imagem, uma capa gerada é usada. */
  image?: string;
  github?: string;
  demo?: string;
}

export interface EducationItem {
  degree: string;
  institution?: string;
  period?: string;
  status: string;
  description: string;
}

export type CredentialKind = 'certificação' | 'curso' | 'trilha';

export interface Credential {
  id: string;
  kind: CredentialKind;
  title: string;
  issuer: string;
  /** Ex.: "Mar 2025". */
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  details?: string;
  skills?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  responsibilities: string[];
  tech: string[];
  learned: string;
}

export interface LanguageItem {
  code: string;
  name: string;
  level: string;
  /** 1 a 5 segmentos preenchidos. */
  score: 1 | 2 | 3 | 4 | 5;
}

export interface Links {
  github: string;
  linkedin: string;
  email: string;
}
