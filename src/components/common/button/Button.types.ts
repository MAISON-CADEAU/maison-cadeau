import { type ButtonHTMLAttributes, type ReactNode } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "icon-group" | "arrow-left" | "arrow-right" | "house" | "primary-filled" | "primary-outlined" | "background-gray" | "background-black-sm" | "background-black-lg" | "background-black-xl" | "kakao";
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
}
