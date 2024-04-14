import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../apiCalls/admin/getAllCategories";
import AddCategoryModal from "./AddCategoryModal";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCategory = (categoryName) => {
    // Here you can perform actions like adding the category to your state or database
    console.log("New category added:", categoryName);
    setIsModalOpen(false); // Close the modal after submission
  };

  const [categoies, setCategories] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW5hc2giLCJpYXQiOjE3MTI3NDgzODAsImV4cCI6MTcxMjgzNDc4MCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiJ9.1Yjoq9WPAj9peG4K5NPAReI52I3pZC5kgjcjaRGMK7E";

  useEffect(() => {
    getAllCategories(token, setCategories);
  }, []);

  return (
    <div className="flex border-2 border-green-400">
      <div className="border-2 w-[30%] text-center h-28">
        <div className="p-2 bg-slate-300 m-1">
          <h1>All Category</h1>
        </div>
        <div className="p-2 bg-slate-300 m-1">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Category
          </button>
          <AddCategoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddCategory}
          />
        </div>
      </div>
      <div className="ml-10">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categoies.map((c) => (
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {c.name}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <button class="mr-2 text-indigo-600 hover:text-indigo-900">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h7l2-2h4a2 2 0 012 2v14z"
                        ></path>
                      </svg>
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
