import { Card } from "../Card";
import styles from "./Presets.module.scss";
import type { CSSProperties } from "react";



export interface IActionCardProps {
  title: string;
  description?: string;
  href: string;
  style?: CSSProperties;
}

export const ActionCard = ({
  title,
  description,
  href,
  style,
}: IActionCardProps) => {
  return (
    <Card
      variant="action"
      as="link"
      link={{ href }}
      ariaLabel={title}
      className={styles.action_card}
      style={style}
    >
      <p className={styles.action_title}>{title}</p>
      {description && (
        <p className={styles.action_description}>{description}</p>
      )}
    </Card>
  );
};