import axios from "axios";

const USER_ROUTE = "/api/user";

export const getCurrentUser = () => axios.get(USER_ROUTE);

export const getUserList = () => axios.get("/api/user/list");
