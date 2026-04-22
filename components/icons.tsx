import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3.2" {...props}>
      <path d="M15 13 5 24l10 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m33 13 10 11-10 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m27 8-6 32" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.2 4.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21.5V6.5Z" />
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H17" />
      <path d="M9 8h5" strokeLinecap="round" />
      <path d="M9 12h6" strokeLinecap="round" />
    </svg>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
      <path d="M12 12 5 8" />
      <path d="m12 12 7-4" />
      <path d="M12 12v9" />
    </svg>
  );
}

export function BulbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M9.5 18h5" strokeLinecap="round" />
      <path d="M10 21h4" strokeLinecap="round" />
      <path d="M8 14.5a6 6 0 1 1 8 0c-.8.7-1.4 1.7-1.7 2.8h-4.6c-.3-1.1-.9-2.1-1.7-2.8Z" />
      <path d="M12 3.5v1.7" strokeLinecap="round" />
      <path d="m4.9 6.4 1.2 1.2" strokeLinecap="round" />
      <path d="m19.1 6.4-1.2 1.2" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="m19.4 15-.6 1.8-2 .2a6.8 6.8 0 0 1-1 .9l.3 2-1.7.9-1.4-1.4a7.2 7.2 0 0 1-1.4 0l-1.4 1.4-1.7-.9.3-2a6.8 6.8 0 0 1-1-.9l-2-.2L4.6 15l1.6-1.2a7.1 7.1 0 0 1 0-1.6L4.6 11l.6-1.8 2-.2c.3-.3.6-.6 1-.9l-.3-2 1.7-.9 1.4 1.4a7.2 7.2 0 0 1 1.4 0l1.4-1.4 1.7.9-.3 2c.4.3.7.6 1 .9l2 .2.6 1.8-1.6 1.2a7.1 7.1 0 0 1 0 1.6l1.6 1.2Z" />
    </svg>
  );
}

