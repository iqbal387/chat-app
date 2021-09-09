import React, { memo } from "react";
import { Link } from "react-router-dom";

const RegisterHeader = () => (
  <div>
    <h2 className="mb-2">Sign up</h2>
    <p>
      Already have an account?{" "}
      <span className="text-primary">
        <Link to="/login">Sign in</Link>
      </span>
    </p>
  </div>
);

export default memo(RegisterHeader);
