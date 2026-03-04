import type { ICardProps } from "./Card.types";
import Image from "next/image";
import styles from "./Card.module.scss";


export function Card(props: ICardProps) {
  const { as, variant, className, style, ariaLabel, hover } = props;

  const hoverEnabled = hover ?? true;

  const rootClassName = [
    styles.card,
    styles[`card_${variant}` as keyof typeof styles],
    hoverEnabled && styles.card_hover,
    variant === "gender" && props.isActive && styles.card_active,
    className,
  ]
    .filter(Boolean)
    .join(" ");

    const sizeStyle =
    props.variant === "cta"
      ? {
          width: props.width,
          height: props.height,
        }
      : undefined;
  
  const mergedStyle = { ...sizeStyle, ...style };

  const content = (() => {
    switch (variant) {
      case "gender":
        return (
          <div className={styles.gender_inner}>
            <span className={styles.gender_icon}>{props.icon}</span>
            <span className={styles.gender_title}>{props.title}</span>
          </div>
        );

      case "product":
        return (
          <div className={styles.product_shell}>
            <div className={styles.product_card}>
              <div className={styles.product_badge}>
                  <span className={styles.product_badge_text}>{props.badge}</span>
                </div>

              <div className={styles.product_image}>
              <Image
                  src={props.imageSrc}
                  alt={props.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.product_image_inner}
                />
              </div>

              <div className={styles.product_info}>
                <span className={styles.product_title}>{props.title}</span>
                <span className={styles.product_price}>{props.price}</span>
              </div>
            </div>
          </div>
        );

      case "cta":
        if (props.ctaType === "text") {
          return (
            <div className={styles.cta_text_inner}>
              <span className={styles.cta_text_title}>{props.title}</span>
              <span className={styles.cta_text_desc}>{props.description}</span>
            </div>
          );
        }

        return (
          <div className={styles.cta_inner}>
            <div className={styles.cta_image}>
              <Image
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className={styles.product_image_inner}
                  />
            </div>
            <div className={styles.cta_body} >
              <span className={styles.cta_title}>{props.title}</span>
              <div className={styles.cta_meta}>
                <span className={styles.cta_icon}>{props.icon}</span>
                <span className={styles.cta_desc}>{props.description}</span>
              </div>
            </div>
          </div>
        );
    }
  })();

  if (as === "button") {
    return (
      <button
        type="button"
        className={rootClassName}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={ariaLabel}
        aria-pressed={variant === "gender" ? !!props.isActive : undefined}
        style={mergedStyle}  
      >
        {content}
      </button>
    );
  }

  if (as === "a") {
    const { href, target, rel } = props.link;
    const computedRel =
      target === "_blank" ? rel ?? "noopener noreferrer" : rel;

    return (
      <a
        href={href}
        target={target}
        rel={computedRel}
        className={rootClassName}
        aria-label={ariaLabel}
        style={mergedStyle}  
      >
        {content}
      </a>
    );
  }

  return null;
}