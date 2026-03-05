import type { ReactNode } from "react";

export interface IModalProps {
  isOpen: boolean;
  variant?: "feed" | "default" | "alert";
  title: string;
  onClose: () => void;
  onComplete?: () => void;
  completeLabel?: string;
  children: ReactNode;
}
