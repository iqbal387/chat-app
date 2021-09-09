import React, { memo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingIcon = () => (
  <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
    <AiOutlineLoading3Quarters className="animate-spin text-6xl" />
  </div>
);

export default memo(LoadingIcon);
