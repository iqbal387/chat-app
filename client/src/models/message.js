import axios from "axios";

const MESSAGE_ROUTE = "/api/message";
const SEND_MESSAGE_ROUTE = "/api/message/send";

export const getMessages = ({ anotherUserId }) =>
  axios.get(MESSAGE_ROUTE, {
    params: {
      anotherUserId,
    },
  });

export const sendMessage = ({ receiverId, message }) =>
  axios.post(SEND_MESSAGE_ROUTE, {
    receiverId,
    message,
  });
