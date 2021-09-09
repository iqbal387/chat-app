import React, { memo } from "react";
import { useSettingStore } from "stores/setting.store";

const Theme = ({ children }) => {
  // store
  const darkMode = useSettingStore((state) => state.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full h-screen background-primary color-primary">
        {children}
      </div>
    </div>
  );
};

export default memo(Theme);
