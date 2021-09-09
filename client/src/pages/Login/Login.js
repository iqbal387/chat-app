import React, { memo } from "react";

import Auth from "components/organisms/Auth";

import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

const Login = () => (
  <Auth>
    <LoginHeader />
    <LoginForm />
  </Auth>
);

export default memo(Login);
