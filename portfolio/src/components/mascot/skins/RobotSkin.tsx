import { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { expressionSpecs, type Expression } from '../expressions';
import { useMorphPath } from '../useMorphPath';

/**
 * CONTRATO DE SKIN (para trocar o visual depois sem mexer na lógica):
 *
 *  - Receba `expression` e `blinking`.
 *  - Marque o centro de cada olho com `data-eye="left" | "right"`.
 *  - Mova cada pupila com as variáveis publicadas pelo <MascotRig>:
 *      translate(calc(var(--lx) * 10px), calc(var(--ly) * 8px))
 *    (os números 10 e 8 são o limite físico da pupila nessa arte).
 *  - Opcional: use --head-x/--head-y/--head-r para mover a cabeça.
 *
 * Para usar uma ilustração própria, crie outra skin com esse mesmo contrato
 * (por exemplo, um PNG do rosto com dois <img> de pupila) e troque em <Mascot skin={...} />.
 */
export interface SkinProps {
  expression: Expression;
  blinking: boolean;
}

const EYE_R = 25;
const MAX_X = 10;
const MAX_Y = 8;
const SCREEN = '#040607';
const EASE = 'cubic-bezier(.3,.7,.2,1)';

interface EyeProps {
  side: 'left' | 'right';
  cx: number;
  cy: number;
  expression: Expression;
  blinking: boolean;
}

function Eye({ side, cx, cy, expression, blinking }: EyeProps) {
  const clipId = useId();
  const spec = expressionSpecs[expression];
  const vx = side === 'left' ? '--lx' : '--rx';
  const vy = side === 'left' ? '--ly' : '--ry';
  // Olho esquerdo: lado interno é o direito. Rotação horária deixa o canto interno mais baixo.
  const tilt = side === 'left' ? spec.tilt : -spec.tilt;

  const lidSize = EYE_R * 2 + 8;
  const topCover = blinking ? 1 : spec.lidTop;
  const topOffset = -lidSize * (1 - topCover);

  const botR = EYE_R * 1.3;
  const botBase = EYE_R + botR + 2;
  const botOffset = -spec.lidBottom * (EYE_R * 2 + 2);

  const lidTransition = `transform ${blinking ? 70 : 220}ms ${EASE}`;

  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* âncora do centro do olho (medida pelo MascotRig) */}
      <circle data-eye={side} r={EYE_R} fill="transparent" />
      <g style={{ transform: `scale(${spec.eyeScale})`, transition: `transform 260ms ${EASE}` }}>
        <clipPath id={clipId}>
          <circle r={EYE_R} />
        </clipPath>
        <circle r={EYE_R + 2} fill="rgb(var(--accent) / 0.12)" />
        <circle r={EYE_R} fill="#eef4f0" />
        <g clipPath={`url(#${clipId})`}>
          <g
            style={{
              transform: `translate(calc(var(${vx}) * ${MAX_X}px), calc(var(${vy}) * ${MAX_Y}px))`,
            }}
          >
            <g style={{ transform: `scale(${spec.pupilScale})`, transition: `transform 220ms ${EASE}` }}>
              <circle r="14" fill="rgb(var(--accent))" />
              <circle r="9" fill="#03130a" />
              <circle cx="-4.5" cy="-5" r="3.2" fill="#fff" opacity=".92" />
              <circle cx="4" cy="4.5" r="1.4" fill="#fff" opacity=".6" />
            </g>
          </g>
          {/* pálpebra superior */}
          <rect
            x={-lidSize / 2}
            y={-lidSize / 2}
            width={lidSize}
            height={lidSize}
            fill={SCREEN}
            style={{
              transform: `rotate(${tilt}deg) translateY(${topOffset}px)`,
              transition: lidTransition,
            }}
          />
          {/* pálpebra inferior (olhos "sorrindo") */}
          <circle
            cy={botBase}
            r={botR}
            fill={SCREEN}
            style={{ transform: `translateY(${botOffset}px)`, transition: lidTransition }}
          />
        </g>
      </g>
    </g>
  );
}

function Accessory({ kind }: { kind: ReturnType<typeof getAccessory> }) {
  return (
    <AnimatePresence mode="wait">
      {kind === 'zzz' && (
        <motion.g
          key="zzz"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          fontFamily="JetBrains Mono, monospace"
          fill="rgb(var(--accent))"
        >
          <text x="196" y="62" fontSize="16" className="animate-float">
            z
          </text>
          <text x="208" y="46" fontSize="12" className="animate-float" style={{ animationDelay: '.6s' }}>
            Z
          </text>
        </motion.g>
      )}
      {kind === 'bang' && (
        <motion.text
          key="bang"
          x="206"
          y="62"
          fontSize="30"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
          fill="rgb(var(--accent))"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          !
        </motion.text>
      )}
      {kind === 'sparkle' && (
        <motion.g
          key="sparkle"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          fill="rgb(var(--accent))"
        >
          <path d="M206 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" className="animate-pulse" />
          <path d="M30 56 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" className="animate-pulse" />
        </motion.g>
      )}
    </AnimatePresence>
  );
}

function getAccessory(expression: Expression) {
  return expressionSpecs[expression].accessory;
}

export function RobotSkin({ expression, blinking }: SkinProps) {
  const spec = expressionSpecs[expression];
  const gradId = useId();
  const mouthPath = useMorphPath(spec.mouth);

  return (
    <svg viewBox="0 0 240 250" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${gradId}-shell`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2126" />
          <stop offset="1" stopColor="#0a0d0f" />
        </linearGradient>
        <radialGradient id={`${gradId}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgb(61 255 154)" stopOpacity=".28" />
          <stop offset="1" stopColor="rgb(61 255 154)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* aura */}
      <ellipse cx="120" cy="135" rx="130" ry="120" fill={`url(#${gradId}-glow)`} />

      {/* corpo / base */}
      <g>
        <rect x="74" y="206" width="92" height="30" rx="12" fill={`url(#${gradId}-shell)`} stroke="rgb(255 255 255 / .1)" />
        <circle cx="96" cy="221" r="3" fill="rgb(var(--accent))" className="animate-pulse" />
        <rect x="108" y="218" width="24" height="6" rx="3" fill="rgb(255 255 255 / .14)" />
        <circle cx="144" cy="221" r="3" fill="rgb(255 255 255 / .25)" />
      </g>

      {/* cabeça (acompanha o cursor levemente) */}
      <g
        style={{
          transform:
            'translate(calc(var(--head-x, 0) * 1px), calc(var(--head-y, 0) * 1px)) rotate(calc(var(--head-r, 0) * 1deg))',
          transformOrigin: '120px 200px',
        }}
      >
        {/* antena */}
        <line x1="120" y1="52" x2="120" y2="26" stroke="rgb(255 255 255 / .35)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="120" cy="20" r="7" fill="rgb(var(--accent))" />
        <circle cx="120" cy="20" r="7" fill="none" stroke="rgb(var(--accent))" className="animate-pulse-ring" style={{ transformOrigin: '120px 20px' }} />

        {/* orelhas */}
        <rect x="8" y="104" width="18" height="46" rx="8" fill={`url(#${gradId}-shell)`} stroke="rgb(var(--accent) / .45)" />
        <rect x="214" y="104" width="18" height="46" rx="8" fill={`url(#${gradId}-shell)`} stroke="rgb(var(--accent) / .45)" />

        {/* casco */}
        <rect x="22" y="50" width="196" height="160" rx="48" fill={`url(#${gradId}-shell)`} stroke="rgb(255 255 255 / .14)" strokeWidth="1.5" />
        <path d="M54 58 Q120 40 186 58" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="2" strokeLinecap="round" />

        {/* tela do rosto (levemente mais móvel que o casco → profundidade) */}
        <g style={{ transform: 'translate(calc(var(--head-x, 0) * .6px), calc(var(--head-y, 0) * .6px))' }}>
          <rect x="40" y="68" width="160" height="124" rx="34" fill={SCREEN} stroke="rgb(255 255 255 / .07)" />

          <Eye side="left" cx={88} cy={116} expression={expression} blinking={blinking} />
          <Eye side="right" cx={152} cy={116} expression={expression} blinking={blinking} />

          {/* bochechas */}
          <g style={{ opacity: spec.cheek, transition: 'opacity 250ms ease' }} fill="rgb(var(--accent))">
            <ellipse cx="62" cy="152" rx="9" ry="5" opacity=".35" />
            <ellipse cx="178" cy="152" rx="9" ry="5" opacity=".35" />
          </g>

          {/* boca */}
          <g transform="translate(120 160)">
            <path d={mouthPath} fill="none" stroke="rgb(var(--accent))" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* detalhe de código */}
          <text
            x="52"
            y="184"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fill="rgb(var(--accent) / .55)"
          >
            {'</>'}
          </text>
          <text
            x="170"
            y="184"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fill="rgb(255 255 255 / .3)"
          >
            {'{ }'}
          </text>
        </g>

        <Accessory kind={spec.accessory} />
      </g>
    </svg>
  );
}
