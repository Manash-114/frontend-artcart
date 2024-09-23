import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import { Outlet } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-screen p-5 w-screen box-border">
      <div>
        <AdminNav />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
