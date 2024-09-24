import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import { Outlet } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";
import { useDispatch } from "react-redux";
import { fetchNewSeller } from "../../reduxToolkit/features/adminSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchNewSeller());
  // }, []);
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

export default AdminPage;
