import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-20 h-20 border-4 border-gray-300 border-l-blue-500 animate-spin rounded-full"></div>
    </div>
  );
};

export default Loader;
