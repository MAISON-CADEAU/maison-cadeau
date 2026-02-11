import { type IIconProps } from "./Icon.types";

export const FilterIcon = ({
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
        d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
