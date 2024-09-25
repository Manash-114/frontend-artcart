import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer2 from "../common/Footer2";
import AddProduct from "./dashboardCompo/AddProduct";
import NewOrders from "./dashboardCompo/NewOrders";
import ManageProducts from "./dashboardCompo/ManageProducts";
import SellerRegistration from "./SellerRegistration";
import { useDispatch, useSelector } from "react-redux";
import SellerNav from "./SellerNav";
import {
  fetchSellerDetails,
  fetchSellerProducts,
} from "../../reduxToolkit/features/sellerSlice";
import Modal from "react-modal";

// Sample icons (you can use your own SVG or icon imports)
import { FaBoxOpen, FaShoppingCart, FaBoxes } from "react-icons/fa";

const buttons = [
  { name: "Add Product", id: "add-product", icon: <FaBoxOpen /> },
  { name: "Orders", id: "new-orders", icon: <FaShoppingCart /> },
  { name: "Manage Products", id: "manage-products", icon: <FaBoxes /> },
];

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [btID, SetbtID] = useState(null); // Initially, no button is clicked
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useSelector((store) => store.seller);
  const dispatch = useDispatch();

  const fetchAllProductsAndSellerDetails = async () => {
    try {
      const res1 = await dispatch(fetchSellerDetails()).unwrap();
      const res2 = await dispatch(fetchSellerProducts()).unwrap();
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
    SetbtID(id); // Set button ID when clicked
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
      <SellerNav />
      {seller?.name === null ? (
        <SellerRegistration />
      ) : (
        <Wrapper>
          {seller?.approved === false && (
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Seller Approval Pending"
              ariaHideApp={false}
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  padding: "30px",
                  textAlign: "center",
                },
              }}
            >
              <h2>Your account is pending approval by the admin</h2>
              <p>Please wait until your request is approved.</p>
              <button
                onClick={closeModal}
                className="mt-4 p-2 bg-red-600 text-white rounded"
              >
                OK
              </button>
            </Modal>
          )}

          <div className="dashboard-container">
            <div className="button-section">
              {buttons.map((button, index) => (
                <Card
                  key={index}
                  disabled={seller?.approved === false}
                  active={btID === button.id} // Mark the active card
                  onClick={() => handleClick(button.id)}
                >
                  <div className="icon">{button.icon}</div>
                  <h3>{button.name}</h3>
                  <button
                    id={button.id}
                    className="card-button"
                    disabled={seller?.approved === false}
                  >
                    {`Go to ${button.name}`}
                  </button>
                </Card>
              ))}
            </div>

            {/* Show the content-section only if a button is clicked */}
            {btID && (
              <div className="content-section">
                {btID === "add-product" && <AddProduct />}
                {btID === "new-orders" && <NewOrders />}
                {btID === "manage-products" && <ManageProducts />}
              </div>
            )}
          </div>
        </Wrapper>
      )}
      <Footer2 />
    </>
  );
};

export default SellerDashboard;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px;

  .dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .button-section {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 40px;
  }

  .content-section {
    width: 100%;
    max-width: 1200px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Card = styled.div`
  background-color: ${({ active }) => (active ? "#4f46e5" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  padding: 20px;
  margin: 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#4338ca" : "#f1f5f9")};
    color: ${({ active }) => (active ? "white" : "#333")};
  }

  h3 {
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
  }

  .icon {
    font-size: 50px;
    color: ${({ active }) => (active ? "white" : "#4f46e5")};
  }

  .card-button {
    background-color: ${({ disabled }) => (disabled ? "#d1d5db" : "#4f46e5")};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ disabled }) => !disabled && "#4338ca"};
    }
  }
`;
