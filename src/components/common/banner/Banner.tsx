import Link from "next/link";
import Image from "next/image";
import type { IBannerProps } from "./Banner.types";
import styles from "./Banner.module.scss";

export const Banner = ({
  className,
  title,
  description,
  cta,
  image,
  layout = "overlay",
  align = "center",
}: IBannerProps) => {
  const rootClassName = [
    styles.banner,
    styles[`banner_${layout}`],
    styles[`banner_align_${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const rel =
    cta?.rel ?? (cta?.target === "_blank" ? "noopener noreferrer" : undefined);

  const shouldRenderCta = layout === "cta" && Boolean(cta);

  return (
    <section className={rootClassName} aria-label={title}>
      <div className={styles.image_wrapper}>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            priority={image.priority}
            sizes={image.sizes ?? "(max-width: 768px) 100vw, 60vw"}
            fill
            className={styles.background_image}
          />
        )}

        <div className={styles.overlay_content}>
          <h2 className={styles.title}>{title}</h2>

          {description && (
            <p className={styles.description}>{description}</p>
          )}

          {shouldRenderCta && cta && (
            <Link
              href={cta.href}
              target={cta.target}
              rel={rel}
              className={styles.cta_button}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};