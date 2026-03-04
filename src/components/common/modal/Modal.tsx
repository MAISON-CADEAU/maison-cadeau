"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, CloseIcon } from "@/components/common/icons";
import styles from "./Modal.module.scss";
import type { IModalProps } from "./Modal.types";

const subscribe = () => () => {};

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
  variant = "default",
  title,
  onClose,
  onComplete,
  completeLabel = "완료",
  children,
}: IModalProps) => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

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

  if (!mounted) return null;

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
            {variant === "feed" ? (
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
            ) : variant === "alert" ? (
              <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
              </div>
            ) : (
              <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <button
                  type="button"
                  className={styles.close_button}
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
