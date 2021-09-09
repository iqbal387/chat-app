import React, { useState, forwardRef, memo } from "react";
import clsx from "clsx";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import Icon from "./Icon";
import IconButton from "./IconButton";

const Input = forwardRef(
  (
    {
      type = "text",
      leftIcon,
      rightIcon,
      label,
      className,
      variant = "PRIMARY",
      size = "BASE",
      error,
      ...props
    },
    ref
  ) => {
    // state
    const [show, setShow] = useState(false);

    return (
      <div>
        {label && <p className="mb-1">{label}</p>}
        <div className="relative">
          <input
            ref={ref}
            type={show ? "text" : type}
            className={clsx(
              "w-full",
              variant === "PRIMARY"
                ? "focus:border-primary dark:focus:border-primary"
                : "focus:border-secondary dark:focus:border-secondary",
              size === "DENSE" && "py-1.5 px-3",
              size === "BASE" && "py-2.5 px-4",
              size === "LARGE" && "py-3 px-4",
              (rightIcon || type === "password") && "pr-10",
              leftIcon && "pl-10",
              className
            )}
            autoComplete="off"
            style={{ wordBreak: "break-word" }}
            {...props}
          />
          {error && (
            <p className="text-error dark:text-error text-xs mt-1">* {error}</p>
          )}
          {leftIcon && (
            <div className="absolute top-0 left-2">
              <Icon
                className="text-lg"
                style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
              >
                {leftIcon}
              </Icon>
            </div>
          )}
          {rightIcon && (
            <div className="absolute top-0 right-2">
              <Icon
                className="text-lg"
                style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
              >
                {rightIcon}
              </Icon>
            </div>
          )}
          {type === "password" && (
            <div className="absolute top-0 right-2">
              <IconButton
                className="text-lg"
                style={{ paddingTop: "0.875rem", paddingBottom: "0.875rem" }}
                onClick={() => setShow(!show)}
              >
                {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default memo(Input);
