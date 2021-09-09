import { useEffect } from "react";
import clsx from "clsx";
import {
  IoCheckmarkOutline,
  IoInformationOutline,
  IoWarningOutline,
} from "react-icons/io5";
import shallow from "zustand/shallow";

import { useSettingStore } from "stores/setting.store";

const Alert = () => {
  // store
  const {
    message: { show, type, text },
    setHiddenMessage,
  } = useSettingStore(
    ({ message, setHiddenMessage }) => ({
      message,
      setHiddenMessage,
    }),
    shallow
  );

  // effect
  useEffect(() => {
    show && setTimeout(() => setHiddenMessage(), 3000);
  }, [show, setHiddenMessage]);

  return (
    <div
      className={clsx(
        "fixed left-1/2 -translate-x-1/2 z-50 background-primary border rounded py-2 px-4 transition-all duration-500 ease-in-out flex items-center space-x-4",
        handleBorderColor(type),
        show ? "top-8" : "-top-28"
      )}
    >
      <p className="text-xl">{renderIcon(type)}</p>
      <p>{text}</p>
    </div>
  );
};

const renderIcon = (type) => {
  switch (type) {
    case "INFO":
      return <IoInformationOutline className="text-info dark:text-info" />;
    case "SUCCESS":
      return <IoCheckmarkOutline className="text-success dark:text-success" />;
    case "WARNING":
      return <IoWarningOutline className="text-warning dark:text-warning" />;
    case "ERROR":
      return <IoWarningOutline className="text-error dark:text-error" />;
    default:
      return null;
  }
};

const handleBorderColor = (type) => {
  switch (type) {
    case "INFO":
      return "border-info dark:border-info";
    case "SUCCESS":
      return "border-success dark:border-success";
    case "WARNING":
      return "border-warning dark:border-warning";
    case "ERROR":
      return "border-error dark:border-error";
    default:
      return "";
  }
};

export default Alert;
