import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManageSeller = () => {
  const token = useSelector((store) => store.auth.token);

  const unapprovedSellerList = useSelector(
    (store) => store.admin.newSellerRequest
  );
  const onViewAadharImage = (imagePath) => {
    // Logic to open the image in a modal or new window
    window.open(imagePath);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onApprove = (id) => {
    // Logic to handle approval
    // approvedSeller(token, id, 1, navigate, dispatch);
  };

  const onReject = (id) => {
    // Logic to handle rejection
    // console.log("Rejected seller with ID:", id);
    // approvedSeller(token, id, 0);
  };

  return (
    <div className="flex p-4">
      {/* left side */}
      <div className="border-2 border-red-600 h-72 w-[25%]">
        <div className="bg-gray-300 h-12 m-2 text-center p-3">
          <h1>View All Request</h1>
        </div>
        <div className="bg-gray-300 h-12 m-2 text-center p-3">
          <h1>List-of-All-seller</h1>
        </div>
      </div>

      {/* right side */}
      <DataTable
        data={unapprovedSellerList}
        onViewAadharImage={onViewAadharImage}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};

export default ManageSeller;
