import { type IIconProps } from "./Icon.types";

export const ReplyIcon = ({
  size = 16,
  color = "#666666",
  ...props
}: IIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99967 6.6665L13.333 9.99984L9.99967 13.3332"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66634 2.6665V7.33317C2.66634 8.04041 2.94729 8.71869 3.44739 9.21879C3.94749 9.71889 4.62576 9.99984 5.33301 9.99984H13.333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
