import React, { memo, useState } from "react";
import {
  IoEllipsisVertical,
  IoLogOutOutline,
  IoMoonOutline,
  IoSearchOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import shallow from "zustand/shallow";
import clsx from "clsx";

import Input from "components/atoms/Input";
import { useSettingStore } from "stores/setting.store";
import IconButton from "components/atoms/IconButton";
import { logout } from "models/auth";
import { formatDate } from "utils/date";
import { useAuthStore } from "stores/user.store";

const UserRoom = ({ open, searchValue, users, handleSearchUser, openChat }) => {
  // state
  const [openMenu, setOpenMenu] = useState(false);

  // store
  const { darkMode, setDarkMode } = useSettingStore(
    ({ darkMode, setDarkMode, user }) => ({
      darkMode,
      setDarkMode,
    }),
    shallow
  );
  const { fullName, profilePic } = useAuthStore(({ user }) => user);

  const handleOpenMenu = () => setOpenMenu(true);

  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleCloseMenu();
      });
  };

  return (
    <div
      className={clsx(
        "user-room h-screen border-r border-color",
        open ? "hidden lg:block" : "block"
      )}
    >
      <div className="py-2 sm:py-4 background-secondary border-b border-color">
        <div className="flex pl-4 pr-2 sm:pl-8 sm:pr-6 justify-between items-center mb-2 sm:mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={profilePic ? `/images/${profilePic}` : "/avatar.svg"}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-medium">{fullName}</p>
          </div>

          <div className="relative flex items-center">
            <IconButton
              className="text-lg color-primary"
              onClick={() =>
                darkMode ? setDarkMode(false) : setDarkMode(true)
              }
            >
              {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
            </IconButton>

            <IconButton
              className="text-lg color-primary"
              onClick={handleOpenMenu}
            >
              <IoEllipsisVertical />
            </IconButton>

            {openMenu && (
              <>
                <div
                  className="fixed top-0 left-0 w-screen h-screen z-10"
                  onClick={handleCloseMenu}
                />
                <div
                  className="z-20 absolute top-8 right-0 border border-color background-secondary rounded py-1 w-60 shadow-md"
                  onBlur={handleCloseMenu}
                >
                  <div
                    className="px-4 py-2 cursor-pointer hover:opacity-75 flex space-x-2 items-center"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline className="text-lg" />
                    <p className="text-sm">Logout</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-8">
          <Input
            leftIcon={<IoSearchOutline />}
            className="w-full rounded-full background-primary"
            placeholder="Search or start new chat"
            value={searchValue}
            onChange={handleSearchUser}
          />
        </div>
      </div>

      <div className="user-room__content overflow-y-auto">
        {users?.map(({ id, profilePic, fullName, lastMessage }) => (
          <div
            key={id}
            className="w-full py-2 sm:py-4 px-4 sm:px-8 border-b border-color flex items-center space-x-4 cursor-pointer overflow-auto hover:bg-light-secondary dark:hover:bg-dark-secondary"
            onClick={() => openChat({ id, profilePic, fullName })}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={profilePic ? `/images/${profilePic}` : "/avatar.svg"}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="overflow-hidden"
              style={{ width: "calc(100% - 3.5rem)" }}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
                  {fullName}
                </p>
                <p className="text-sm">
                  {lastMessage?.createdAt
                    ? formatDate(lastMessage.createdAt)
                    : ""}
                </p>
              </div>

              <p className="text-sm whitespace-nowrap w-full overflow-hidden overflow-ellipsis">
                {lastMessage?.message || ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(UserRoom);
