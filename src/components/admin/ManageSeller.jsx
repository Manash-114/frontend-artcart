import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  approveSeller,
  fetchNewSeller,
} from "../../reduxToolkit/features/adminSlice";

import toast, { Toaster } from "react-hot-toast";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ManageSeller = () => {
  const [activeTab, setActiveTab] = useState("view-requests");
  const [loadingId, setLoadingId] = useState(null); // State to track loading for specific seller
  const navigate = useNavigate();
  const unapprovedSellerList = useSelector(
    (store) => store.admin.newSellerRequest
  );
  const dispatch = useDispatch();
  const onViewAadharImage = (imagePath) => {
    window.open(imagePath);
  };

  const onApprove = async (id) => {
    setLoadingId(id); // Set loading for the specific seller being approved
    try {
      const response = await dispatch(
        approveSeller({ id: id, approveStatus: 1 })
      ).unwrap();
      setLoadingId(null);
      if (response.response === 200) {
        toast.success("Seller approved successfully!");
      } else {
        toast.error("Approval failed. Try again.");
      }
    } catch (error) {
      setLoadingId(null);
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      }
      toast.error("An error occurred. Please try again.");
    }
  };

  const onReject = (id) => {
    // You can add the rejection logic here if needed
  };

  // Function to fetch unapproved sellers
  const getAllUnapprovedSeller = async () => {
    try {
      const res = await dispatch(fetchNewSeller()).unwrap(); // use await to wait for the dispatch to complete
      console.log("Unapproved sellers fetched", res);
    } catch (error) {
      if (error === "Invalid refresh token") {
        dispatch(logOut());
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getAllUnapprovedSeller();
  }, [dispatch]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-6 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-white shadow-md rounded-lg p-4 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Admin Actions
          </h2>
          <ul className="space-y-4">
            <li
              className={`${
                activeTab === "view-requests"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-3 text-center cursor-pointer hover:bg-gray-300`}
              onClick={() => setActiveTab("view-requests")}
            >
              View All Requests
            </li>
            <li
              className={`${
                activeTab === "list-sellers"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-3 text-center cursor-pointer hover:bg-gray-300`}
              onClick={() => setActiveTab("list-sellers")}
            >
              List of All Sellers
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-6 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">
            {activeTab === "view-requests"
              ? "Manage Seller Requests"
              : "List of All Sellers"}
          </h2>
          {activeTab === "view-requests" && (
            <>
              {unapprovedSellerList && unapprovedSellerList.length > 0 ? (
                <DataTable
                  data={unapprovedSellerList}
                  onViewAadharImage={onViewAadharImage}
                  onApprove={onApprove}
                  onReject={onReject}
                  loadingId={loadingId} // Pass loadingId to DataTable
                />
              ) : (
                <p className="text-center text-gray-500">No requests found.</p>
              )}
            </>
          )}
          {activeTab === "list-sellers" && (
            <p>List of all sellers goes here...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageSeller;
