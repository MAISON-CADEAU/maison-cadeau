export type BannerLayout = "overlay" | "cta";
export type BannerAlign = "left" | "center" | "right";

export interface IBannerCta {
  label: string;
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
}

export interface IBannerImage {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

export interface IBannerProps {
  className?: string;

  title: string;
  description?: string;
  cta?: IBannerCta;
  image?: IBannerImage;

  layout?: BannerLayout;
  align?: BannerAlign;
  textColor?: "white";
}