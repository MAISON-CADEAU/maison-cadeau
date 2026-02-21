import type { ReactNode } from "react";
import { Card } from "../Card";
import styles from "./Presets.module.scss";

export interface ISelectCardProps {
  title: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const SelectCard = ({
  title,
  icon,
  selected = false,
  onClick,
}: ISelectCardProps) => {
  const selected_class_name = selected ? styles.select_card_selected : "";

  return (
    <Card
      variant="select"
      as="button"
      onClick={onClick}
      ariaLabel={title}
      className={[styles.select_card, selected_class_name].filter(Boolean).join(" ")}
    >
      <div className={styles.select_inner}>
        {icon && <div className={styles.select_icon}>{icon}</div>}
        <span className={styles.select_title}>{title}</span>
      </div>
    </Card>
  );
};