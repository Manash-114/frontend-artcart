import React from "react";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";
import { Outlet } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
      <Footer2 />
    </div>
  );
};

export default AdminPage;
