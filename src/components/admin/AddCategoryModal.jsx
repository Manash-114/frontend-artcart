import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
} from "../../reduxToolkit/features/auth/authSlice";
import { addNewCategory } from "../../reduxToolkit/features/productList/ProductSlice";
import { useNavigate } from "react-router-dom";

const AddCategoryModal = ({ isOpen, onClose, onSubmit, toast }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading spinner
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.length < 3) {
      toast.success("Must be 3 character");
      setCategoryName("");
      return;
    }
    setIsLoading(true); // Show spinner
    onSubmit(categoryName);
    try {
      const data = {
        name: categoryName.toLocaleUpperCase(),
      };
      const res = await dispatch(addNewCategory(data)).unwrap();
      toast.success("Category Add successfully");

      navigate("/admin/categories");
    } catch (err) {
      if (err === "Invalid refresh token") {
        dispatch(logOut());
      }
    } finally {
      setIsLoading(false); // Hide spinner after submission completes
    }
    setCategoryName(""); // Reset category name after submission
  };

  return (
    <div
      className={`modal ${
        isOpen ? "" : "hidden"
      } fixed inset-0 w-full h-full bg-gray-800 bg-opacity-75 z-50 overflow-auto flex justify-center items-center`}
    >
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Category
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
