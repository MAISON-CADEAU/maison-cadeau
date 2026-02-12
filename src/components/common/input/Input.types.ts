import { type InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
