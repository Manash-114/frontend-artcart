import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBoxOpen, FaShoppingCart, FaBoxes } from "react-icons/fa";
import Modal from "react-modal";
import SellerRegistration from "./SellerRegistration";
import {
  fetchSellerDetails,
  fetchSellerProducts,
} from "../../reduxToolkit/features/sellerSlice";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";

const buttons = [
  { name: "Add Product", id: "add-product", icon: <FaBoxOpen /> },
  { name: "Orders", id: "new-orders", icon: <FaShoppingCart /> },
  { name: "Manage Products", id: "manage-products", icon: <FaBoxes /> },
];

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [btID, SetbtID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useSelector((store) => store.seller);
  const dispatch = useDispatch();

  const fetchAllProductsAndSellerDetails = async () => {
    try {
      await dispatch(fetchSellerDetails()).unwrap();
    } catch (error) {
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      } else {
        console.log("Server error ", error);
      }
    }
  };

  useEffect(() => {
    fetchAllProductsAndSellerDetails();
  }, [dispatch]);

  const handleClick = (id) => {
    SetbtID(id);
  };

  useEffect(() => {
    if (seller?.approved === false) {
      setIsModalOpen(true);
    }
  }, [seller]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {seller?.name === null ? (
        <SellerRegistration />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
          {seller?.approved === false && (
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Seller Approval Pending"
              ariaHideApp={false}
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  transform: "translate(-50%, -50%)",
                  padding: "30px",
                  borderRadius: "12px",
                  textAlign: "center",
                  background: "#fff",
                },
              }}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Your account is pending approval by the admin
              </h2>
              <p className="text-gray-600 mb-6">
                Please wait until your request is approved.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                OK
              </button>
            </Modal>
          )}

          <div className="flex flex-col items-center w-full max-w-5xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {buttons.map((button, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ${
                    btID === button.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800"
                  } cursor-pointer`}
                >
                  <div className="text-5xl">{button.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold">{button.name}</h3>
                  <button
                    onClick={() => handleClick(button.id)}
                    className={`mt-4 px-5 py-2 rounded-full text-lg ${
                      seller?.approved === false
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-700 text-white"
                    } transition-all duration-300`}
                    disabled={seller?.approved === false}
                  >
                    {`Go to ${button.name}`}
                  </button>
                </div>
              ))}
            </div>

            {btID && (
              <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
                {btID === "add-product" && navigate("addproduct")}
                {btID === "new-orders" && navigate("orders")}
                {btID === "manage-products" && navigate("manageproduct")}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellerDashboard;
