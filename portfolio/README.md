# Portfólio — Samuel Reges

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção em /dist
npm run preview    # serve o build localmente
```

## Onde editar o conteúdo (tudo em `src/data/`)

| Arquivo          | O que contém                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| `profile.ts`     | Textos pessoais e **links (GitHub, LinkedIn, e-mail) — preencha!**       |
| `stack.ts`       | Tecnologias. Adicione `level: 'advanced' \| 'intermediate' \| 'learning'` |
| `projects.ts`    | Projetos, `github`, `demo` e `image` (prints em `public/projects/`)      |
| `credentials.ts` | Formação (instituição/período) e certificações/cursos/trilhas            |
| `experience.ts`  | Linha do tempo profissional e idiomas                                    |

Campos vazios nunca quebram a página: links vazios desabilitam o botão; sem certificações, a seção mostra um estado de "em andamento".
Níveis de domínio só aparecem (com filtro e legenda) para as tecnologias em que você definir `level`.

## Formulário de contato

- Defina `links.email` em `profile.ts` → o formulário abre o app de e-mail (mailto).
- Ou copie `.env.example` para `.env` e preencha `VITE_CONTACT_ENDPOINT` (Formspree, Getform ou sua API). O envio é um `POST` JSON `{ name, email, message }`.

## O mascote

```
components/mascot/
  MascotContext.tsx   cérebro: ponteiro, hover/foco, seção atual, ociosidade, reações
  MascotRig.tsx       lógica do olhar (rAF + variáveis CSS); não conhece a aparência
  expressions.ts      expressões, humor por seção e legendas
  skins/RobotSkin.tsx aparência atual (SVG)
  Mascot.tsx          junta rig + skin + piscar
  MascotDock.tsx      versão compacta que acompanha o scroll depois da Hero
```

Comportamento: olhos acompanham o cursor com limite elíptico; olham para botões/links em hover e para o campo em foco; mudam de expressão por seção (ex.: "empolgado" em Projetos); piscam em intervalos irregulares; reagem a cliques; dormem após 15s sem interação; em touch seguem o toque e, ocioso, "olham ao redor" sozinhos.

**Trocar a aparência:** crie uma skin com o mesmo contrato (`SkinProps`) — marque o centro de cada olho com `data-eye="left|right"` e mova a pupila com `translate(calc(var(--lx) * Npx), calc(var(--ly) * Mpx))` — e passe em `<Mascot skin={MinhaSkin} />`. A lógica de interação não muda.

## Cor de destaque

Troque `--accent` em `src/styles/index.css` (formato `R G B`).
