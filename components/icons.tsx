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

export function QuoteMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M22 20c-8.2 4.4-12 10.7-12 19.1 0 10.2 5.6 16.9 15.8 18.9V45.1c-4.8-.7-7.3-3.2-7.3-7.3 0-4.3 2.7-7.1 8-8.4L22 20Zm29 0C42.8 24.4 39 30.7 39 39.1 39 49.3 44.6 56 54.8 58V45.1c-4.8-.7-7.3-3.2-7.3-7.3 0-4.3 2.7-7.1 8-8.4L51 20Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
    </svg>
  );
}

export function StageBulbIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 220 180" fill="none" {...props}>
      <g opacity="0.2" fill="currentColor">
        <circle cx="110" cy="88" r="62" stroke="currentColor" strokeWidth="2" strokeDasharray="1 6" />
        <circle cx="41" cy="88" r="1.8" />
        <circle cx="50" cy="61" r="1.6" />
        <circle cx="61" cy="43" r="1.6" />
        <circle cx="79" cy="30" r="1.8" />
        <circle cx="141" cy="30" r="1.8" />
        <circle cx="160" cy="42" r="1.6" />
        <circle cx="171" cy="61" r="1.6" />
        <circle cx="179" cy="88" r="1.8" />
        <circle cx="170" cy="115" r="1.6" />
        <circle cx="159" cy="133" r="1.6" />
        <circle cx="141" cy="146" r="1.8" />
        <circle cx="79" cy="146" r="1.8" />
        <circle cx="61" cy="133" r="1.6" />
        <circle cx="50" cy="115" r="1.6" />
      </g>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M90 133h40" />
        <path d="M96 147h28" />
        <path d="M87 92a23 23 0 1 1 46 0c0 10.5-5.1 15.3-9.3 20.8H96.3C92.1 107.3 87 102.5 87 92Z" />
        <path d="M104 92c0-7 4.3-11.8 11.6-13.7" />
        <path d="M110 55V41" />
        <path d="m71 72-10-6" />
        <path d="m149 72 10-6" />
        <path d="M73 118 62 125" />
        <path d="m147 118 11 7" />
      </g>
    </svg>
  );
}

export function StageWindowIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 220 180" fill="none" {...props}>
      <g opacity="0.18" stroke="currentColor" strokeWidth="2">
        <rect x="88" y="52" width="70" height="54" rx="8" strokeDasharray="1 5" />
        <path d="M83 111h86" strokeDasharray="1 5" />
        <path d="M77 116h92" strokeDasharray="1 5" />
        <path d="M72 121h92" strokeDasharray="1 5" />
        <path d="M86 47h66" strokeDasharray="1 5" />
      </g>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="48" y="34" width="112" height="86" rx="12" />
        <path d="M48 56h112" />
        <circle cx="63" cy="45" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="75" cy="45" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="87" cy="45" r="2.2" fill="currentColor" stroke="none" />
        <path d="m89 72-20 20 20 20" />
        <path d="m119 72 20 20-20 20" />
        <path d="m112 68-16 48" />
      </g>
    </svg>
  );
}

export function StageCubeIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 220 180" fill="none" {...props}>
      <g opacity="0.18" fill="currentColor">
        <path d="M57 130c11 0 18 6 28 6s15-6 25-6 18 6 28 6 18-6 25-6" stroke="currentColor" strokeWidth="2" strokeDasharray="1 6" />
        <circle cx="54" cy="137" r="1.8" />
        <circle cx="66" cy="141" r="1.5" />
        <circle cx="145" cy="141" r="1.5" />
        <circle cx="157" cy="137" r="1.8" />
      </g>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m109 35 42 24v50l-42 24-42-24V59l42-24Z" />
        <path d="m109 83-42-24" />
        <path d="m109 83 42-24" />
        <path d="M109 83v50" />
        <path d="m168 38 7 12 12 5-12 6-4 12-7-11-12-6 12-5 4-13Z" />
        <path d="m157 92 5 8 8 3-8 4-3 8-5-7-8-4 8-3 3-9Z" />
      </g>
    </svg>
  );
}

export function StageRocketIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 220 180" fill="none" {...props}>
      <g opacity="0.22" stroke="currentColor" strokeWidth="2">
        <circle cx="86" cy="84" r="46" strokeDasharray="1 5" />
        <path d="M46 63c14-8 25-11 40-11" />
        <path d="M43 92c13 8 24 12 35 14" />
        <path d="M67 120c7-2 13-3 19-3" />
      </g>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M128 49c15-10 34-11 46-10 1 12 0 31-10 46l-19 19-21-16 4-24Z" />
        <path d="M124 88 98 114" />
        <path d="m117 95-12 28 28-12" />
        <path d="M143 60a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z" />
        <path d="M96 116c-8 1-16 5-22 11-6 6-10 13-11 22 9-1 16-5 22-11 6-6 10-13 11-22Z" />
        <path d="M116 121c17 2 31 9 45 23" />
      </g>
    </svg>
  );
}

export function OpenBookIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 360 240" fill="none" {...props}>
      <g opacity="0.18" stroke="currentColor" strokeWidth="2">
        <circle cx="265" cy="102" r="78" strokeDasharray="1 6" />
        <path d="M84 175c32-18 68-24 108-18" strokeDasharray="1 6" />
        <path d="M112 56c28 6 50 18 73 38" strokeDasharray="1 6" />
      </g>
      <g opacity="0.22" fill="currentColor">
        <path d="M126 64c-9 1-18 4-30 10l-20 61c13-8 21-10 33-10 21 0 40 5 64 20l22-59c-24-15-46-22-69-22Z" />
        <path d="M237 74c-12-6-21-9-30-10-23 0-45 7-69 22l22 59c24-15 43-20 64-20 12 0 20 2 33 10l-20-61Z" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M76 131c16-11 33-16 52-16 24 0 45 8 72 27V82c-27-18-48-27-72-27-20 0-36 5-52 15v61Z" />
        <path d="M284 131c-16-11-33-16-52-16-24 0-45 8-72 27V82c27-18 48-27 72-27 20 0 36 5 52 15v61Z" />
        <path d="M200 82v60" />
        <path d="M94 146c15-5 30-7 47-7 22 0 39 4 59 14" />
        <path d="M266 146c-15-5-30-7-47-7-22 0-39 4-59 14" />
        <path d="M128 86c17 1 33 5 49 14" opacity="0.72" />
        <path d="M128 101c18 1 32 5 47 13" opacity="0.6" />
        <path d="M223 86c-17 1-33 5-49 14" opacity="0.72" />
        <path d="M223 101c-18 1-32 5-47 13" opacity="0.6" />
        <path d="m76 131-13 18 60-4" />
        <path d="m284 131 13 18-60-4" />
      </g>
    </svg>
  );
}
