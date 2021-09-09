import clsx from "clsx";

const Icon = ({ children, className, ...props }) => (
  <div className={clsx("py-2 px-2 text-base", className)} {...props}>
    {children}
  </div>
);

export default Icon;
