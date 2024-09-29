import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer2 />
    </div>
  );
};

export default UserLayout;
