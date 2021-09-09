import React, { memo, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoEllipsisVertical,
  IoSendOutline,
} from "react-icons/io5";
import clsx from "clsx";

import Input from "components/atoms/Input";
import IconButton from "components/atoms/IconButton";
import { formatDateTime } from "utils/date";

const ChatRoom = ({
  open,
  message,
  changeMessage,
  sendChat,
  closeChat,
  data,
}) => {
  // ref
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatRef && chatRef.current.scrollIntoView();
    inputRef && inputRef.current.focus();
  }, [data]);

  const { fullName, profilePic, messages } = data;

  return (
    <div className={clsx("chat-room h-screen", open ? "block" : "hidden")}>
      <div className="w-full py-2 sm:py-4 px-4 sm:px-6 lg:pl-4 background-secondary border-b border-color flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <IconButton
            className="text-xl color-primary lg:hidden"
            onClick={closeChat}
          >
            <IoArrowBack />
          </IconButton>

          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={profilePic ? `/images/${profilePic}` : "/avatar.svg"}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-medium">{data.fullName}</p>
        </div>

        <IconButton className="text-lg color-primary">
          <IoEllipsisVertical />
        </IconButton>
      </div>

      <div className="chat-room__content py-2 sm:py-4 px-4 sm:px-8 overflow-auto">
        {messages?.map(({ id, senderId, receiveId, message, createdAt }) =>
          senderId === data.id || receiveId === data.id ? (
            <div key={id} className="flex flex-col items-start mt-3">
              <div
                className="px-3 py-2 rounded-lg bg-gray-500 text-gray-50"
                style={{ maxWidth: "75%" }}
              >
                <div className="min-w-4 leading-5">{message}</div>
              </div>

              <div className="my-0.5 text-xs ml-3">
                {formatDateTime(createdAt)}
              </div>
            </div>
          ) : (
            <div key={id} className="flex flex-col items-end mt-3">
              <div
                className="px-3 py-2 rounded-lg bg-blue-500 text-blue-50"
                style={{ maxWidth: "75%" }}
              >
                <div className="min-w-4 leading-5">{message}</div>
              </div>

              <div className="my-0.5 text-sm ml-3">
                {formatDateTime(createdAt)}
              </div>
            </div>
          )
        )}
        <div ref={chatRef} />
      </div>

      <form onSubmit={sendChat}>
        <div className="w-full py-2 sm:py-4 pl-4 pr-2 sm:pl-8 sm:pr-6 background-secondary border-t border-color flex justify-between items-center">
          <div className="w-full">
            <Input
              ref={inputRef}
              className="w-full rounded-full background-primary"
              value={message}
              onChange={changeMessage}
            />
          </div>

          <IconButton
            className="ml-2 sm:ml-4 text-xl color-primary"
            onClick={sendChat}
          >
            <IoSendOutline />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default memo(ChatRoom);
