import { type IIconProps } from "./Icon.types";

export const CheckSmIcon = ({
  size = 24,
  color = "#17171B",
  ...props
}: IIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12L10 17L20 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
