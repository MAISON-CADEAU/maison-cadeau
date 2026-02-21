import type { ReactNode, CSSProperties } from "react";

export type CardAs = "div" | "link" | "button";
export type CardVariant = "select" | "product" | "action" | "mini";

export interface ICardLink {
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
}

export interface ICardProps {
  className?: string;
  children: ReactNode;

  variant: CardVariant;

  as?: CardAs;
  link?: ICardLink;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  
  style?: CSSProperties; 
}