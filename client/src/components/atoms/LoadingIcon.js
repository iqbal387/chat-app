import React, { memo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingIcon = () => (
  <AiOutlineLoading3Quarters className="animate-spin" />
);

export default memo(LoadingIcon);
