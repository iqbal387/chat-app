import React, { memo, useEffect, useState } from "react";

import UserRoom from "./components/UserRoom";
import ChatRoom from "./components/ChatRoom";
import { getUserList } from "models/user";
import { getMessages, sendMessage } from "models/message";
import { useAuthStore } from "stores/user.store";

const Home = () => {
  // state
  const [open, setOpen] = useState(false);
  const [usersInit, setUsersInit] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // store
  const { id: userId } = useAuthStore(({ user }) => user);

  const updateDataFromSocket = (data, isSender) => {
    const handleSetUsers = (users) => {
      const newUsers = [...users];
      const index = newUsers.findIndex(
        ({ id }) => id === (isSender ? data.receiverId : data.senderId)
      );

      if (index < 0) return newUsers;

      newUsers[index].lastMessage = data;

      return newUsers;
    };

    setData((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), data],
    }));
    setUsersInit((prev) => handleSetUsers(prev));
    setUsers((prev) => handleSetUsers(prev));
  };

  useEffect(() => {
    getUserList()
      .then((res) => {
        const { users } = res.data;

        setUsersInit(users || []);
        setUsers(users || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.Pusher.logToConsole = true;
    const pusher = new window.Pusher("4f16841c2063028217d2", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat");
    channel.bind(`${userId}`, (data) => {
      updateDataFromSocket(data.message);
    });
  }, [userId]);

  const openChat = (data) => {
    setOpen(true);

    getMessages({ anotherUserId: data.id })
      .then((res) => {
        setData({
          ...data,
          messages: res.data.messages || [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeChat = () => {
    setOpen(false);
    setData({});
  };

  const sendChat = (e) => {
    e.preventDefault();

    sendMessage({
      receiverId: data.id,
      message,
    })
      .then((res) => {
        console.log(res.data.messages);
        updateDataFromSocket(res.data.messages, true);
      })
      .catch((err) => console.log(err));

    setMessage("");
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSearchUser = (e) => {
    const value = e.target.value || "";

    const newUsers = usersInit.filter(({ fullName }) =>
      fullName.toLowerCase().includes(value.toLowerCase())
    );

    setSearchValue(value);
    setUsers(newUsers);
  };

  return (
    <div className="w-full h-screen block lg:flex overflow-auto">
      <UserRoom
        open={open}
        searchValue={searchValue}
        users={users}
        handleSearchUser={handleSearchUser}
        openChat={openChat}
      />

      <ChatRoom
        open={open}
        message={message}
        changeMessage={changeMessage}
        sendChat={sendChat}
        closeChat={closeChat}
        data={data}
      />
    </div>
  );
};

export default memo(Home);
