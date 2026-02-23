"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, CloseIcon } from "@/components/common/icons";
import styles from "./Modal.module.scss";
import type { IModalProps } from "./Modal.types";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={`${styles.container} ${styles[variant]}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {variant === "sheet" ? (
              <div className={styles.header}>
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
              </div>
            ) : (
              <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <button
                  type="button"
                  className={styles.icon_button}
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <CloseIcon size={24} color="currentColor" />
                </button>
              </div>
            )}
            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
