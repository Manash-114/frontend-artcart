import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import { getAllUnapprovedSeller } from "../../apiCalls/admin/getAllUnapprovedSeller";
import { approvedSeller } from "../../apiCalls/admin/approvedSeller";
// import { getAllUnapprovedSeller } from "../../api/getAllUnapprovedSeller";

const ManageSeller = () => {
  const token = useSelector((store) => store.auth.token);

  const [unapprovedSellerList, setUnapprovedSellerList] = useState([]);

  const data = [
    {
      id: 1,
      name: "John Doe",
      aadhaarNumber: "1234 5678 9012",
      aadharImage: "path_to_image_1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      aadhaarNumber: "9876 5432 1098",
      aadharImage: "path_to_image_2.jpg",
    },
    // Add more data as needed
  ];

  const onViewAadharImage = (imagePath) => {
    // Logic to open the image in a modal or new window
    window.open(imagePath);
  };

  const onApprove = (id) => {
    // Logic to handle approval
    console.log("Approved seller with ID:", id);
    approvedSeller(token, id, 1);
  };

  const onReject = (id) => {
    // Logic to handle rejection
    console.log("Rejected seller with ID:", id);
    approvedSeller(token, id, 0);
  };

  // const token = localStorage.getItem("token");
  useEffect(() => {}, []);
  return (
    <div className="flex p-4">
      {/* left side */}
      <div className="border-2 border-red-600 h-72 w-[25%]">
        <div
          className="bg-gray-300 h-12 m-2 text-center p-3 cursor-pointer"
          onClick={() => {
            getAllUnapprovedSeller(token, setUnapprovedSellerList);
          }}
        >
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
