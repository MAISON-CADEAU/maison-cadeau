import type { ReactNode } from "react";

export interface IModalProps {
  isOpen: boolean;
  variant?: "sheet" | "dialog";
  title: string;
  onClose: () => void;
  onComplete?: () => void;
  completeLabel?: string;
  children: ReactNode;
}
