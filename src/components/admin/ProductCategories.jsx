import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import { deleteCategory } from "../../reduxToolkit/features/productList/ProductSlice";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";
const ProductCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = useSelector((store) => store.product.productCategory);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State to track selected category
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.product.loading);
  const status = useSelector((store) => store.product.status);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [isLoading1, setIsLoading1] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryDelete = (id) => {
    setCategoryIdToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleClose = () => {
    setOpenConfirmDialog(false);
    setCategoryIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (categoryIdToDelete) {
      try {
        const res = await dispatch(
          deleteCategory({ id: categoryIdToDelete })
        ).unwrap();
        setIsLoading1(false);
        toast.success("Category Deleted Successfully.");
      } catch (error) {
        if (error === "Invalid refresh token") {
          dispatch(logOut());
        }
      }
    }
    handleClose();
  };

  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };

  const handleAddCategory = (categoryName) => {
    // Handle adding the category
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 border-2 border-green-400 p-4">
        {/* Left Sidebar for Categories */}
        <div className="border-2 w-full md:w-1/4 text-center p-4 h-auto bg-slate-100 shadow-lg">
          <div className="p-4 bg-slate-300 m-2 cursor-pointer font-bold">
            All Categories
          </div>
          <div className="p-4 bg-slate-300 m-2 ">
            <button
              onClick={handleOpenModal}
              className="w-full font-bold py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Add New Category
            </button>
            {isLoading && <CircularProgress className="mt-3" size={20} />}
            <AddCategoryModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleAddCategory}
              toast={toast}
            />
          </div>
        </div>

        {/* Category Table or Empty Message */}
        <div className="w-full md:w-3/4 h-80 overflow-y-auto border-2 border-gray-200 p-4 bg-white shadow-lg">
          {categories.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500 text-lg">No categories available.</p>
              <p className="text-gray-400">
                Click "Add New Category" to create one.
              </p>
            </div>
          ) : (
            <table className="min-w-full table-auto border-collapse">
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
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className={`border-b border-gray-200 ${
                      selectedCategoryId === category.id
                        ? "bg-blue-100" // Apply blue background if the category is selected
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(category.id)} // Set selected category on click
                  >
                    <td className="px-6 py-4 whitespace-no-wrap cursor-pointer">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="flex items-center">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from selecting the row
                            handleCategoryDelete(category.id);
                          }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
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
          )}
          <ConfirmDialog
            open={openConfirmDialog}
            onClose={handleClose}
            onConfirm={handleConfirmDelete}
            toast={toast}
            isLoading={isLoading1}
            setIsLoading={setIsLoading1}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
