"use client";

import { forwardRef, useRef, useState } from "react";
import { SearchIcon, CheckSmIcon } from "@/components/common/icons";
import type { IInputProps, ITextareaProps, ICheckboxProps, IFileInputProps } from "./Input.types";
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
        <div className={styles.input_inner}>
          {error && (
            <span className={styles.error_label}>{error}</span>
          )}
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
  ({ className, label, id, ...props }, ref) => {
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

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ className, label, error, placeholder = "파일을 선택해주세요", id, onChange, ...props }, ref) => {
    const [fileName, setFileName] = useState<string>("");
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    const fileInputClassNames = [
      styles.file_input_display,
      error && styles.input_error,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : "");
      onChange?.(e);
    };

    return (
      <div className={styles.input_wrapper}>
        {label && (
          <label className={styles.label}>{label}</label>
        )}
        <div
          className={fileInputClassNames}
          onClick={() => inputRef.current?.click()}
        >
          <span className={fileName ? styles.file_name : styles.file_placeholder}>
            {fileName || placeholder}
          </span>
          <span className={styles.file_button}>파일 선택</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          id={id}
          className={styles.file_input_hidden}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { Input, Textarea, Checkbox, FileInput };