import type { ReactNode, CSSProperties } from "react";


export interface ICardLink {
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
}

type CardBase = {
  className?: string;
  // children?: ReactNode;
  ariaLabel?: string;
  style?: CSSProperties;
  hover?: boolean;
};

type CtaSize = {
  width?: number | string; 
  height?: number | string; 
};

type AsLink = { as: "a"; link: ICardLink; onClick?: never; disabled?: never };
type AsButton = { as: "button"; onClick: () => void; disabled?: boolean; link?: never };

/**
 * 1) gender: button + icon + title
 */
export type GenderCard = CardBase &
AsButton & {
    variant: "gender";
    title: string;
    icon: ReactNode;
    isActive?: boolean;
  };

/**
 * 2) product: button or link + badge + img + title + price
 */
export type ProductCard = CardBase &
  (AsLink | AsButton) & {
    variant: "product";
    badge: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    price: string;
    shadow?: boolean;
    width?: number | string;
    height?: number | string;
  };

/**
 * 3) cta(text): a + title + desc (이미지/아이콘 없음)
 */
export type CtaTextCard = CardBase &
  AsLink & 
  CtaSize & {
    variant: "cta";
    ctaType: "text";
    title: string;
    description: string;
  };

/**
 * 4) cta(icon): a + img + title + icon + desc
 */
export type CtaIconCard = CardBase &
  AsLink & 
  CtaSize & {
    variant: "cta";
    ctaType: "icon";
    imageSrc: string;
    imageAlt: string;
    title: string;
    icon: ReactNode;
    description: string;
  };

export type ICardProps = GenderCard | ProductCard | CtaTextCard | CtaIconCard;