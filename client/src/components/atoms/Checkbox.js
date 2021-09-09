import React, { forwardRef, memo } from "react";
import clsx from "clsx";

const Checkbox = forwardRef(
  ({ label, variant = "PRIMARY", size = "BASE", ...props }, ref) => (
    <div
      className="flex items-center space-x-2"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          "form-checkbox",
          variant === "PRIMARY" ? "checked:bg-primary" : "checked:bg-secondary",
          size === "DENSE" && "text-base",
          size === "BASE" && "text-lg",
          size === "LARGE" && "text-xl"
        )}
        {...props}
      />
      {label && <p>{label}</p>}
    </div>
  )
);

export default memo(Checkbox);
