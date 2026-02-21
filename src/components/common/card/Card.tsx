import Link from "next/link";
import type { ICardProps } from "./Card.types";
import styles from "./Card.module.scss";


export const Card = ({
  className,
  children,
  variant,
  as = "div",
  link,
  onClick,
  ariaLabel,
  disabled = false,
  style
}: ICardProps) => {
  const root_class_name = [
    styles.card,
    styles[`card_variant_${variant}`],
    disabled && styles.card_disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rel =
    link?.rel ?? (link?.target === "_blank" ? "noopener noreferrer" : undefined);

  if (as === "link" && link && !disabled) {
    return (
      <Link
        href={link.href}
        target={link.target}
        rel={rel}
        className={root_class_name}
        aria-label={ariaLabel}
        style={style} 
      >
        {children}
      </Link>
    );
  }

  if (as === "button") {
    return (
      <button
        type="button"
        className={root_class_name}
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        style={style} 
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={root_class_name}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      style={style} 
    >
      {children}
    </div>
  );
};