import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Expression } from '@/components/mascot/expressions';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  href?: string;
  /** Se `href` for vazio e `disabled` não for passado, o botão fica desabilitado automaticamente. */
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit';
  className?: string;
  icon?: ReactNode;
  /** Texto que o mascote "pensa" ao olhar para este botão. */
  gazeLabel?: string;
  /** Expressão do mascote ao olhar para este botão. */
  mood?: Expression;
  title?: string;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'ghost',
  href,
  disabled,
  onClick,
  type = 'button',
  className,
  icon,
  gazeLabel,
  mood,
  title,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn('btn', variant === 'primary' ? 'btn-primary btn-shine' : 'btn-ghost', className);
  const common = { 'data-gaze-label': gazeLabel, 'data-mood': mood, 'aria-label': ariaLabel, title };
  const content = (
    <>
      {icon}
      <span className="relative z-10">{children}</span>
    </>
  );

  const isLink = href !== undefined;
  if (isLink && href !== '' && !disabled) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...common}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || (isLink && href === '')}
      {...common}
    >
      {content}
    </button>
  );
}
