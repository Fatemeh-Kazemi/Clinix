import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  type: "primary" | "secondary" | "error" | "blue";
  text: string | ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
}
