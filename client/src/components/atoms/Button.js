import React, { memo } from "react";
import clsx from "clsx";

import LoadingIcon from "./LoadingIcon";

const handleVariant = (variant) => {
  switch (variant) {
    case "PRIMARY":
      return "border-primary text-primary";
    case "SECONDARY":
      return "border-secondary text-secondary";
    case "ERROR":
      return "border-error text-error";
    case "TRANSPARENT":
      return "border-transparent text-transparent";
    default:
      return "";
  }
};

const handleSize = (size) => {
  switch (size) {
    case "BASE":
      return "py-2 px-3";
    case "DENSE":
      return "py-1 px-3";
    case "LARGE":
      return "py-3 px-6";
    default:
      return "";
  }
};

const Button = ({
  icon,
  label,
  className,
  variant = "PRIMARY",
  disabled,
  size = "BASE",
  children,
  loading,
  ...props
}) => (
  <button
    className={clsx(
      "border rounded flex space-x-2 items-center transition-shadow duration-200 hover:shadow-md whitespace-nowrap",
      disabled && "disabled hover:shadow-none",
      handleVariant(variant),
      handleSize(size),
      className
    )}
    disabled={disabled}
    {...props}
  >
    {loading ? (
      <LoadingIcon />
    ) : (
      children || (
        <>
          {icon}
          <span>{label}</span>
        </>
      )
    )}
  </button>
);

export default memo(Button);
