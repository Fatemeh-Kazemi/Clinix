import React from "react";

import "./style.css";

import type { FC } from "react";
import type { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  type,
  text,
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      disabled={loading || disabled}
      type="button"
      className={`Button Button-${type}`}
      onClick={onClick}
    >
      {loading ? <span className="loader"></span> : text}
    </button>
  );
};

export default Button;
