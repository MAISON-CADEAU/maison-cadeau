"use client";

import { useEffect } from "react";
import type { IModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";

export const Modal = ({ isOpen, onClose, children, title, size = "md" }: IModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={`${styles.modal_content} ${styles[`modal_${size}`]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.modal_header}>
            <h2 className={styles.modal_title}>{title}</h2>
            <button
              className={styles.close_button}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}
        <div className={styles.modal_body}>{children}</div>
      </div>
    </div>
  );
};
