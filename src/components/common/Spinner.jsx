import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-800"></div>
    </div>
  );
};

export default Spinner;
