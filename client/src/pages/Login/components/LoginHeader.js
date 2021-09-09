import React, { memo } from "react";
import { Link } from "react-router-dom";

const LoginHeader = () => (
  <div>
    <h2 className="mb-2">Sign in</h2>
    <p>
      Don't have an account?{" "}
      <span className="text-primary">
        <Link to="/register">Sign up</Link>
      </span>
    </p>
  </div>
);

export default memo(LoginHeader);
