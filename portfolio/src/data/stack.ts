import {
  Atom,
  BarChart3,
  Braces,
  Code2,
  Coffee,
  Container,
  Database,
  FileCode2,
  FileSpreadsheet,
  GitBranch,
  Github,
  HardDrive,
  Layers,
  LineChart,
  Network,
  Palette,
  Send,
  Server,
  Table2,
  Terminal,
  Wind,
  Workflow,
} from 'lucide-react';
import type { TechCategory } from './types';

/**
 * ✏️ EDITE AQUI: para classificar uma tecnologia, adicione `level`:
 *   level: 'advanced'      → dominada
 *   level: 'intermediate'  → conhecimento intermediário
 *   level: 'learning'      → em aprendizado
 * Sem `level`, nenhum nível é exibido (nada é inventado).
 */
export const stack: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    command: 'ls ./frontend',
    items: [
      { name: 'HTML5', icon: Code2 },
      { name: 'CSS3', icon: Palette },
      { name: 'JavaScript', icon: Braces },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'React', icon: Atom },
      { name: 'Tailwind CSS', icon: Wind },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    command: 'ls ./backend',
    items: [
      { name: 'Java', icon: Coffee },
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Workflow },
      { name: 'Python', icon: Terminal },
      { name: 'APIs REST', icon: Network },
      { name: 'TypeORM', icon: Layers },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    command: 'ls ./database',
    items: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'MariaDB', icon: Database },
      { name: 'SQLite', icon: HardDrive },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    command: 'ls ./tools',
    items: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: Github },
      { name: 'VS Code', icon: Code2 },
      { name: 'IntelliJ IDEA', icon: Code2 },
      { name: 'Postman', icon: Send },
      { name: 'Docker', icon: Container },
    ],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    command: 'ls ./data',
    items: [
      { name: 'Power BI', icon: BarChart3 },
      { name: 'Microsoft Excel', icon: FileSpreadsheet },
      { name: 'SQL', icon: Table2 },
      { name: 'Análise de Dados', icon: LineChart },
    ],
  },
];

export const levelMeta = {
  advanced: { label: 'Dominada', pips: 3 },
  intermediate: { label: 'Intermediário', pips: 2 },
  learning: { label: 'Em aprendizado', pips: 1 },
} as const;
