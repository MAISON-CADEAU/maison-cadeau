import type { SVGProps } from "react";

interface IMaleIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const MaleIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: IMaleIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <path d="M35.7052 66.3337V49.667H20L20 66.3337H35.7052Z" fill={color} />
      <path d="M53.3337 66.3337V49.667H36.667V66.3337H53.3337Z" fill={color} />
      <path d="M35.7052 49.6667V33L20 33L20 49.6667H35.7052Z" fill={color} />
      <path d="M53.3337 49.6667V33L36.667 33V49.6667H53.3337Z" fill={color} />
      <path d="M80.0139 49.6667V33L63.3472 33V49.6667H80.0139Z" fill={color} />
      <path d="M80.0139 66.3337V49.667H63.3472V66.3337H80.0139Z" fill={color} />
      <path d="M63.6678 49.6667C68.2702 49.6667 72.0012 45.9357 72.0012 41.3333C72.0012 36.731 68.2702 33 63.6678 33C59.0654 33 55.3345 36.731 55.3345 41.3333C55.3345 45.9357 59.0654 49.6667 63.6678 49.6667Z" fill={color} />
      <path d="M63.6678 66.3337C68.2702 66.3337 72.0012 62.6027 72.0012 58.0003C72.0012 53.398 68.2702 49.667 63.6678 49.667C59.0654 49.667 55.3345 53.398 55.3345 58.0003C55.3345 62.6027 59.0654 66.3337 63.6678 66.3337Z" fill={color} />
    </svg>
  );
};