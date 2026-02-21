import Image from "next/image";
import { Card } from "../Card";
import styles from "./Presets.module.scss";

export interface IProductCardProps {
  href: string;

  imgSrc: string;
  imgAlt: string;

  badge?: string;
  title: string;
  price?: string;
}

export const ProductCard = ({
  href,
  imgSrc,
  imgAlt,
  title,
  price,
  badge,
}: IProductCardProps) => {
  return (
    <div className={styles.product_shell}>   
    <Card
      variant="product"
      as="link"
      link={{ href }}
      ariaLabel={title}
      className={styles.product_card}
    >
      {badge && 
        <div className={styles.product_badge}>
          <p className={styles.product_badge_text}>{badge}</p>
        </div>}

      <div className={styles.product_image}>
        <Image className={styles.product_image_inner} src={imgSrc} alt={imgAlt} fill sizes="180px" />
      </div>

      <div className={styles.product_info}>
        <p className={styles.product_title}>{title}</p>

        {price && <p className={styles.product_price}>{price}</p>}
      </div>
    </Card>
    </div>
  );
};