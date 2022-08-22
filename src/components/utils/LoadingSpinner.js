import React from "react";
import { PulseLoader } from "react-spinners";

const LoadingSpinner = ({ size }) => {
  const loaderSize = size || "15px";
  return <PulseLoader size={loaderSize} />
};

export default LoadingSpinner;