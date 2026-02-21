import Image from "next/image";
import { Card } from "../Card";
import styles from "./Presets.module.scss";
import { EditPencelIcon } from "../../icons";

export interface IMiniActionCardProps {
  title: string;
  description?: string;
  href: string;

  imgSrc?: string;
  imgAlt?: string;
}

export const MiniActionCard = ({
  title,
  description,
  href,
  imgSrc,
  imgAlt = "",
}: IMiniActionCardProps) => {
  return (
    <Card
      variant="mini"
      as="link"
      link={{ href }}
      ariaLabel={title}
      className={styles.mini_card}
    >
      <div className={styles.mini_inner}>
        {imgSrc && (
          <div className={styles.mini_icon}>
            <Image src={imgSrc} alt={imgAlt} width={80} height={80} />
          </div>
        )}

        <div className={styles.mini_text}>
          <p className={styles.mini_title}>{title}</p>
          {description && (
            <div className={styles.mini_edit_section}>
              <EditPencelIcon className={styles.mini_edit_icon} size={12}/>
              <p className={styles.mini_description}>{description}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};