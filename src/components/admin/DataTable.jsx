import React, { useState } from "react";
import Modal from "./ImageModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import a spinner icon

const DataTable = ({
  data,
  onViewAadharImage,
  onApprove,
  onReject,
  loadingId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imagePath) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setIsModalOpen(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full overflow-auto shadow-md bg-white">
      <table className="w-full text-sm text-gray-700">
        <thead className="text-xs text-gray-600 bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-center">Seller Name</th>
            <th className="px-4 py-3 text-center">Aadhaar Number</th>
            <th className="px-4 py-3 text-center">Actions</th>
            <th className="px-4 py-3 text-center">View Aadhaar Image</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((seller, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-300"
            >
              <td className="px-4 py-3 text-center font-medium text-gray-900">
                {seller.name}
              </td>
              <td className="px-4 py-3 text-center text-gray-600">
                {seller.aadhaarNo}
              </td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  className={`${
                    loadingId === seller.id
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white font-semibold py-2 px-4 rounded-md shadow transition-all duration-300`}
                  onClick={() => onApprove(seller.id)}
                  disabled={loadingId === seller.id}
                >
                  {loadingId === seller.id ? (
                    <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow transition-all duration-300"
                  onClick={() => onReject(seller.id)}
                  disabled={loadingId === seller.id}
                >
                  Reject
                </button>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow transition-all duration-300"
                  onClick={() => openModal(seller.aadhaarImage)}
                >
                  View Image
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imagePath={selectedImage}
      />
    </div>
  );
};

export default DataTable;
