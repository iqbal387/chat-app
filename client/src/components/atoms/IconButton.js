import clsx from "clsx";

import Icon from "./Icon";

const IconButton = ({
  children,
  className,
  variant = "PRIMARY",
  disabled,
  ...props
}) => (
  <Icon
    className={clsx(
      "cursor-pointer rounded-full",
      variant === "PRIMARY" ? "text-primary" : "text-secondary",
      disabled && "disabled",
      className
    )}
    {...props}
  >
    {children}
  </Icon>
);

export default IconButton;
