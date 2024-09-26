import React from "react";
import SellerNav from "./SellerNav";
import { Outlet } from "react-router-dom";
import Footer2 from "../common/Footer2";

const SellerLayout = () => {
  return (
    <>
      <SellerNav />
      <Outlet />
      <Footer2 />
    </>
  );
};

export default SellerLayout;
