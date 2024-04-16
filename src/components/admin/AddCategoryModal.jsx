import React, { useState } from "react";
import { saveCategory } from "../../apiCalls/admin/saveCategory";
import { useSelector } from "react-redux";

const AddCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  setCategories,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const token = useSelector((store) => store.auth.token);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryName);
    if (categoryName.length < 2) {
      alert("enter valid name");
      setCategoryName("");
    } else {
      saveCategory(token, categoryName, categories);
      setCategories(categories);
    }
  };

  return (
    <div
      className={`modal ${
        isOpen ? "" : "hidden"
      } fixed inset-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 overflow-auto flex justify-center items-center`}
    >
      <div className="bg-white w-1/2 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
