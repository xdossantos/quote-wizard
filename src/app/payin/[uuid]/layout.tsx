import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5] p-[25px]">
      {children}
    </div>
  );
};

export default Layout;
