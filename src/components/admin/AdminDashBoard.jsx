import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickCategories = () => {
    navigate("/admin/categories");
  };

  const handleClickSeller = () => {
    navigate("/admin/manageseller");
  };

  const handleClickCourier = () => {
    console.log("clicked courier");
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
        {/* Manage Categories */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 duration-300 ease-in-out"
          onClick={handleClickCategories}
        >
          <h2 className="font-semibold text-2xl mb-4">Manage Categories</h2>
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
            alt="Categories Icon"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickCategories}
          >
            Go to Categories
          </button>
        </div>

        {/* Manage Seller */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 duration-300 ease-in-out"
          onClick={handleClickSeller}
        >
          <h2 className="font-semibold text-2xl mb-4">Manage Seller</h2>
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
            alt="Seller Icon"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickSeller}
          >
            Go to Seller Management
          </button>
        </div>

        {/* Manage Courier */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 duration-300 ease-in-out"
          onClick={handleClickCourier}
        >
          <h2 className="font-semibold text-2xl mb-4">Manage Courier</h2>
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src="https://cdn.pixabay.com/photo/2022/02/08/02/56/shipping-7000647_1280.png"
            alt="Courier Icon"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickCourier}
          >
            Go to Courier Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
