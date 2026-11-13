import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import type { SectionId } from '@/data/sections';
import {
  defaultHoverCaption,
  sectionMood,
  sleepyCaption,
  wakeCaption,
  type Expression,
} from './expressions';

/** Estado "quente" do ponteiro. Fica em ref para não re-renderizar a cada pixel movido. */
export interface PointerState {
  x: number;
  y: number;
  /** Já recebemos algum ponteiro e ele ainda está "presente"? Se não, o personagem passeia o olhar. */
  active: boolean;
  type: 'mouse' | 'touch' | 'pen' | 'none';
  hoverEl: Element | null;
  focusEl: Element | null;
  /** Salto de alvo recente → movimento de olhar mais rápido (sacada). */
  snapUntil: number;
}

interface Transient {
  expression: Expression;
  caption: string;
}

interface HoverInfo {
  mood?: Expression;
  label?: string;
}

interface MascotBrain {
  pointerRef: MutableRefObject<PointerState>;
  expression: Expression;
  caption: string;
  section: SectionId;
  setSection: (id: SectionId) => void;
  /** Dispara uma reação temporária (ex.: formulário enviado). */
  react: (expression: Expression, caption: string, ms?: number) => void;
  reducedMotion: boolean;
}

const MascotContext = createContext<MascotBrain | null>(null);

const INTERACTIVE = 'a[href],button,[data-gaze],input,textarea,select,summary,[role="button"]';
const SLEEP_AFTER_MS = 15000;

function isExpression(v: string | undefined): v is Expression {
  return (
    v === 'idle' ||
    v === 'curious' ||
    v === 'happy' ||
    v === 'focused' ||
    v === 'excited' ||
    v === 'surprised' ||
    v === 'sleepy'
  );
}

export function MascotProvider({ children }: { children: ReactNode }) {
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    active: false,
    type: 'none',
    hoverEl: null,
    focusEl: null,
    snapUntil: 0,
  });

  const [section, setSection] = useState<SectionId>('home');
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const [focusMood, setFocusMood] = useState<boolean>(false);
  const [transient, setTransient] = useState<Transient | null>(null);
  const [sleeping, setSleeping] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lastActivity = useRef(Date.now());
  const sleepingRef = useRef(false);
  const transientTimer = useRef<number>();
  const touchTimer = useRef<number>();

  const react = useCallback((expression: Expression, caption: string, ms = 1100) => {
    window.clearTimeout(transientTimer.current);
    setTransient({ expression, caption });
    transientTimer.current = window.setTimeout(() => setTransient(null), ms);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const p = pointerRef.current;

    const wake = () => {
      lastActivity.current = Date.now();
      if (sleepingRef.current) {
        sleepingRef.current = false;
        setSleeping(false);
        react('surprised', wakeCaption, 900);
      }
    };

    const describe = (el: Element | null): HoverInfo | null => {
      if (!el) return null;
      const node = el as HTMLElement;
      const mood = node.dataset.mood;
      return { mood: isExpression(mood) ? mood : undefined, label: node.dataset.gazeLabel };
    };

    const onMove = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      p.active = true;
      p.type = e.pointerType === 'touch' ? 'touch' : e.pointerType === 'pen' ? 'pen' : 'mouse';
      window.clearTimeout(touchTimer.current);
      wake();
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (target === p.hoverEl) return;
      p.hoverEl = target;
      p.snapUntil = performance.now() + 350;
      setHover(describe(target));
    };

    const onDown = (e: PointerEvent) => {
      onMove(e);
      onOver(e);
    };

    const onUp = (e: PointerEvent) => {
      // No toque, o "hover" some ao soltar e o olhar volta a passear depois de um instante.
      if (e.pointerType === 'touch') {
        window.setTimeout(() => {
          p.hoverEl = null;
          setHover(null);
        }, 600);
        window.clearTimeout(touchTimer.current);
        touchTimer.current = window.setTimeout(() => {
          p.active = false;
        }, 3200);
      }
    };

    const onLeaveDocument = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        p.active = false;
        p.hoverEl = null;
        setHover(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      wake();
      const interactive = (e.target as Element | null)?.closest(INTERACTIVE);
      react(interactive ? 'happy' : 'surprised', interactive ? '// boa escolha!' : '// ei! fez cócegas', 800);
    };

    const onFocusIn = (e: FocusEvent) => {
      const el = (e.target as Element | null)?.closest('input,textarea,select') ?? null;
      p.focusEl = el;
      p.snapUntil = performance.now() + 350;
      setFocusMood(Boolean(el));
      wake();
    };
    const onFocusOut = () => {
      p.focusEl = null;
      setFocusMood(false);
    };

    const onActivity = () => wake();

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveDocument);
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    window.addEventListener('scroll', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity);

    const sleepTimer = window.setInterval(() => {
      if (!sleepingRef.current && Date.now() - lastActivity.current > SLEEP_AFTER_MS) {
        sleepingRef.current = true;
        setSleeping(true);
      }
    }, 1000);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveDocument);
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.clearInterval(sleepTimer);
      window.clearTimeout(transientTimer.current);
      window.clearTimeout(touchTimer.current);
    };
  }, [react]);

  const brain = useMemo<MascotBrain>(() => {
    const base = sectionMood[section];
    let expression: Expression = base.expression;
    let caption = base.caption;

    if (sleeping) {
      expression = 'sleepy';
      caption = sleepyCaption;
    } else if (focusMood) {
      expression = 'focused';
      caption = '// digitando? estou lendo junto';
    } else if (hover) {
      expression = hover.mood ?? (base.expression === 'excited' ? 'excited' : 'curious');
      caption = hover.label ?? defaultHoverCaption;
    }

    if (transient) {
      expression = transient.expression;
      caption = transient.caption;
    }

    return { pointerRef, expression, caption, section, setSection, react, reducedMotion };
  }, [section, hover, focusMood, sleeping, transient, react, reducedMotion]);

  return <MascotContext.Provider value={brain}>{children}</MascotContext.Provider>;
}

export function useMascotBrain(): MascotBrain {
  const ctx = useContext(MascotContext);
  if (!ctx) throw new Error('useMascotBrain precisa estar dentro de <MascotProvider>.');
  return ctx;
}
