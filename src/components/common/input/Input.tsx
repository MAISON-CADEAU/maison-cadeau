"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, label, error, helperText, type = "text", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    const inputClassNames = [
      styles.input,
      error && styles.input_error,
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
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClassNames}
          {...props}
        />
        {error && <p className={styles.error_message}>{error}</p>}
        {helperText && !error && (
          <p className={styles.helper_text}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
