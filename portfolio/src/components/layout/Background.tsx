/** Fundo fixo: grade, brilhos suaves e ruído. Não captura eventos de ponteiro. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
      <div
        className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: 'rgb(var(--accent))' }}
      />
      <div
        className="absolute -right-40 top-[40%] h-[460px] w-[460px] rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: 'rgb(var(--accent-2))' }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}
