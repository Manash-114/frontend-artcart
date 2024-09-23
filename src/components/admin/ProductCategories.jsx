import React, { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import { deleteCategory } from "../../reduxToolkit/features/productList/ProductSlice";

const ProductCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = useSelector((store) => store.product.productCategory);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
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

  const handleConfirmDelete = () => {
    if (categoryIdToDelete) {
      dispatch(deleteCategory({ id: categoryIdToDelete }));
    }
    handleClose();
  };

  const handleAddCategory = (categoryName) => {
    // Here you can perform actions like adding the category to your state or database
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="flex border-2 justify-center  border-green-400">
      <div className="border-2 w-[20%] text-center h-28 mx-4">
        <div className="p-2 bg-slate-300 m-1 cursor-pointer font-bold">
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

        <ConfirmDialog
          open={openConfirmDialog}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default ProductCategories;
