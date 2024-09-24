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
    <div className="border-2 border-green-400 rounded-lg p-4 w-full overflow-auto shadow-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-center">Seller Name</th>
            <th className="px-6 py-4 text-center">Aadhaar Number</th>
            <th className="px-6 py-4 text-center">Actions</th>
            <th className="px-6 py-4 text-center">View Aadhaar Image</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((seller, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition duration-200"
            >
              <td className="px-6 py-4 text-center font-semibold text-gray-900">
                {seller.name}
              </td>
              <td className="px-6 py-4 text-center font-semibold text-gray-900">
                {seller.aadhaarNo}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-200"
                  onClick={() => onApprove(seller.id)}
                  disabled={loadingId === seller.id}
                >
                  {loadingId === seller.id ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
                  onClick={() => onReject(seller.id)}
                  disabled={loadingId === seller.id}
                >
                  Reject
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
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
