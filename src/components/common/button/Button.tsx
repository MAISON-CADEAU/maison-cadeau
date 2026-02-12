"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { FolderPlusIcon, ShareIcon, ArrowLeftIcon, ArrowRightIcon, KakaoIcon } from "@/components/common/icons";
import styles from "./Button.module.scss";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "icon-group" | "arrow-left" | "arrow-right" | "house" | "primary-filled" | "primary-outlined" | "background-gray" | "background-black-sm" |"background-black-lg" |"background-black-xl" | "kakao";
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, children, style, ...props }, ref) => {
    const buttonClassNames = [
      styles.button,
      styles[`button_${variant.replace(/-/g, "_")}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const customStyle = {
      ...style,
    };

    // Icon group buttons (1, 1-1, 1-2) - Two icons grouped together
    if (variant === "icon-group") {
      return (
        <div className={styles.icon_group_wrapper}>
          <button className={`${styles.button} ${styles.button_icon_item}`} {...props}>
            <FolderPlusIcon size={20} color="currentColor" />
            <span className={styles.label}>스크랩하기</span>
          </button>
          <button className={`${styles.button} ${styles.button_icon_item}`} {...props}>
            <ShareIcon size={20} color="currentColor" />
            <span className={styles.label}>공유하기</span>
          </button>
        </div>
      );
    }

    // Arrow buttons (2, 2-1)
    if (variant === "arrow-left") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowLeftIcon size={20} color="currentColor" />
        </button>
      );
    }

    if (variant === "arrow-right") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowRightIcon size={20} color="currentColor" />
        </button>
      );
    }

    // House emoji button (3, 3-1)
    if (variant === "house") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <span className={styles.emoji}>🏠</span>
          <span className={styles.label}>{children}</span>
        </button>
      );
    }

    // Primary buttons (4, 4-1)
    if (variant === "primary-filled" || variant === "primary-outlined") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          {children}
        </button>
      );
    }

    // Secondary buttons (5, 5-1)
    if (variant === "background-gray" || variant === "background-black-sm" || variant === "background-black-lg" || variant === "background-black-xl") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          {children}
        </button>
      );
    }

    // Kakao button (6)
    if (variant === "kakao") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <KakaoIcon size={24} color="currentColor" />
          <span className={styles.label}>{children}</span>
        </button>
      );
    }

    return (
      <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
