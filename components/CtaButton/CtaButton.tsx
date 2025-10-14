'use client';

import React from 'react';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';
import styles from './CtaButton.module.css';

export type CtaButtonProps = {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  target?: '_blank';
};

export default function CtaButton({
  href,
  target,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  color,
  children,
  showIcon = true,
}: CtaButtonProps) {
  const isDisabled = disabled || loading;

  const colorClass = color
    ? (styles as Record<string, string>)[color] ?? color
    : undefined;
  const classes = [styles.button, colorClass].filter(Boolean).join(' ');

  if (href) {
    const label = loading ? 'Laddar…' : children ?? 'Klicka här';
    return (
      <Link
        href={isDisabled ? '#' : href}
        className={classes}
        aria-disabled={isDisabled}
        target={target}
        onClick={isDisabled ? (e) => e.preventDefault() : undefined}
      >
        {label}
        {showIcon && !loading ? <IoIosArrowRoundForward /> : null}
      </Link>
    );
  }

  const label = loading ? 'Skickar…' : children ?? 'Skicka';
  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
    >
      {label}
      {showIcon && !loading ? <IoIosArrowRoundForward /> : null}
    </button>
  );
}
