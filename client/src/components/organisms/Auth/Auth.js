import React, { memo } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import shallow from "zustand/shallow";

import { useSettingStore } from "stores/setting.store";
import IconButton from "components/atoms/IconButton";

const Auth = ({ children }) => {
  // store
  const { darkMode, setDarkMode } = useSettingStore(
    ({ darkMode, setDarkMode }) => ({
      darkMode,
      setDarkMode,
    }),
    shallow
  );

  return (
    <div className="w-full h-screen flex justify-center items-center background-secondary">
      <div className="relative w-screen h-screen sm:w-auto sm:h-auto background-primary shadow flex sm:rounded-xl">
        <div className="auth-form p-8 sm:p-16 flex flex-col space-y-8 overflow-auto">
          {children}
        </div>

        <div
          className="relative p-24 hidden lg:flex flex-col justify-center border-l border-color overflow-hidden"
          style={{ width: "34rem" }}
        >
          <div className="z-10">
            <h1 className="mb-8">Welcome to Iqbal Chat App</h1>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              magni voluptates eius, itaque nisi architecto enim! Architecto
              deleniti velit ab enim? Tempora officiis omnis neque id voluptate,
              harum deserunt itaque!
            </p>
          </div>

          <div
            className="absolute -top-96 -left-96 rounded-full border-color"
            style={{ width: "44.5rem", height: "44.5rem", borderWidth: "6rem" }}
          />
        </div>

        <div className="absolute top-4 right-4">
          <IconButton
            className="text-lg color-primary"
            onClick={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          >
            {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default memo(Auth);
