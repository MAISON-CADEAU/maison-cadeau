import { type IIconProps } from "./Icon.types";

export const CartIcon = ({
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
        d="M9 2L7 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2L17 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6H23L21 18C20.9345 18.5043 20.6821 18.9649 20.2948 19.2916C19.9075 19.6183 19.4132 19.7909 18.905 19.778H5.095C4.5868 19.7909 4.09252 19.6183 3.70518 19.2916C3.31785 18.9649 3.06549 18.5043 3 18L1 6Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
