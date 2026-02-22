"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeftIcon, CloseIcon } from "@/components/common/icons";
import styles from "./Modal.module.scss";
import type { IModalProps } from "./Modal.types";

export const Modal = ({
  isOpen,
  variant = "dialog",
  title,
  onClose,
  onComplete,
  completeLabel = "완료",
  children,
}: IModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.container} ${styles[variant]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {variant === "sheet" ? (
            <>
              <button
                type="button"
                className={styles.icon_button}
                onClick={onClose}
                aria-label="뒤로가기"
              >
                <ChevronLeftIcon size={24} color="currentColor" />
              </button>
              <h2 className={styles.title}>{title}</h2>
              <button
                type="button"
                className={styles.complete_button}
                onClick={onComplete}
              >
                {completeLabel}
              </button>
            </>
          ) : (
            <>
              <h2 className={styles.title}>{title}</h2>
              <button
                type="button"
                className={styles.icon_button}
                onClick={onClose}
                aria-label="닫기"
              >
                <CloseIcon size={24} color="currentColor" />
              </button>
            </>
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
