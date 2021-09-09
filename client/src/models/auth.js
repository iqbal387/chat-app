import axios from "axios";

const REGISTER_ROUTE = "/api/auth/register";
const LOGIN_ROUTE = "/api/auth/login";
const LOGOUT_ROUTE = "/api/auth/logout";

export const register = ({
  email,
  fullName,
  password,
  confirmPassword,
  profilePic,
}) =>
  axios.post(REGISTER_ROUTE, {
    email,
    fullName,
    password,
    confirmPassword,
    profilePic,
  });

export const login = ({ email, password }) =>
  axios.post(LOGIN_ROUTE, {
    email,
    password,
  });

export const logout = () => axios.post(LOGOUT_ROUTE);
