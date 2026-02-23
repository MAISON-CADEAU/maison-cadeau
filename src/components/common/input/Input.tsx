"use client";

import { forwardRef } from "react";
import { SearchIcon, CheckSmIcon } from "@/components/common/icons";
import type { IInputProps, ITextareaProps, ICheckboxProps } from "./Input.types";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, label, error, helperText, isValid, variant = "default", type = "text", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    const inputClassNames = [
      styles.input,
      variant === "default" && styles.input_default,
      variant === "search" && styles.input_search,
      variant === "grey" && styles.input_grey,
      error && styles.input_error,
      isValid && styles.input_valid,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.input_wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div style={{ position: "relative" }}>
          {variant === "search" && (
            <div className={styles.search_icon}>
              <SearchIcon size={20}  />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={inputClassNames}
            {...props}
          />
          {isValid && (
            <div className={styles.check_icon}>
              <CheckSmIcon size={20} color="#1b1b1b" />
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className={styles.helper_text}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, "-");

    const textareaClassNames = [
      styles.textarea,
      error && styles.input_error,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.input_wrapper}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClassNames}
          {...props}
        />
        {helperText && !error && (
          <p className={styles.helper_text}>{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className={styles.checkbox_wrapper}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={styles.checkbox_input}
          {...props}
        />
        <label htmlFor={checkboxId} className={styles.checkbox_label}>
          <span className={styles.checkbox_box}>
            <CheckSmIcon size={16} color="#ffffff" />
          </span>
          {label && <span className={styles.checkbox_text}>{label}</span>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Input, Textarea, Checkbox };
