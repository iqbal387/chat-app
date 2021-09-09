import React, { memo } from "react";

import Auth from "components/organisms/Auth";

import RegisterHeader from "./components/RegisterHeader";
import RegisterForm from "./components/RegisterForm";

const Register = () => (
  <Auth>
    <RegisterHeader />
    <RegisterForm />
  </Auth>
);

export default memo(Register);
