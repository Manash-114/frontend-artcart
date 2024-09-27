import React from "react";
import { Outlet } from "react-router-dom";
import SellerNav from "./SellerNav";
import Footer2 from "../common/Footer2";

const SellerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerNav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer2 />
    </div>
  );
};

export default SellerLayout;
