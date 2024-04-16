import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../apiCalls/admin/getAllCategories";
import AddCategoryModal from "./AddCategoryModal";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../apiCalls/admin/deleteCategory";
import { saveCategory } from "../../apiCalls/admin/saveCategory";

const ProductCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const [categories, setCategories] = useState([]);
  const [mainCategoies, setMainCategories] = useState(new Map());
  console.log("token without useEffect", token);
  const nav = useNavigate();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryDelete = (id) => {
    console.log("delete with id " + id);
    deleteCategory(token, id);
    const c = categories.filter((c) => c.id != id);
    setCategories(c);
  };

  const handleAddCategory = (categoryName) => {
    // Here you can perform actions like adding the category to your state or database
    setIsModalOpen(false); // Close the modal after submission
  };

  useEffect(() => {
    // console.log("use effect called with token +", token);
    // getAllCategories(token, setCategories);
  }, []);

  return (
    <div className="flex border-2 justify-center  border-green-400">
      <div className="border-2 w-[20%] text-center h-28 mx-4">
        <div
          className="p-2 bg-slate-300 m-1 cursor-pointer font-bold"
          onClick={() => {
            getAllCategories(token, setCategories);
          }}
        >
          {/* <h1>All Category</h1> */}
          All Categories
        </div>
        <div className="p-2 bg-slate-300 m-1 ">
          <button
            onClick={handleOpenModal}
            className="w-full  font-bold py-2 px-4 rounded"
          >
            Add New Category
          </button>
          <AddCategoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddCategory}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </div>
      <div className="h-80 overflow-y-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {c.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <button className="mr-2 text-indigo-600 hover:text-indigo-900">
                      <svg
                        className="w-5 h-5"
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
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleCategoryDelete(c.id)}
                    >
                      <svg
                        className="w-5 h-5"
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

export default ProductCategories;
