import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "icon-group" | "arrow-left_bg" | "arrow-right_bg" | "arrow-left" | "arrow-right" | "house" | "primary" | "background-gray" | "background-black-sm" | "background-black-lg" | "background-black-xl" | "kakao";
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  as?: "button" | "link";
  href?: string;
  target?: "_self" | "_blank";
  rel?: string;
}
