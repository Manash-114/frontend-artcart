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
import { fetchSellerDetails } from "../../reduxToolkit/features/sellerSlice";
import Modal from "react-modal";

const buttons = [
  //   { name: "Complete your profile", type: "button", id: "complete-profile" },
  { name: "Add Product", type: "button", id: "add-product" },
  { name: "Orders", type: "button", id: "new-orders" },
  { name: "Manage Products", type: "button", id: "manage-products" },
];

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [btID, SetbtID] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { seller } = useSelector((store) => store.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSellerDetails());
  }, [dispatch]);

  const handleClick = (e) => {
    SetbtID(e.target.id);
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
        <div className="p-32 pt-8">
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

          <div className="con1">
            <div>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  id={button.id}
                  type={button.type}
                  onClick={handleClick}
                  disabled={seller?.approved === false}
                  className={`p-2 m-3 rounded-md ${
                    seller?.approved === false
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-indigo-700 text-white hover:bg-indigo-600"
                  }`}
                >
                  {button.name}
                </button>
              ))}
            </div>
            <VerticalLine />
            <div className="secondSec">
              {btID === "add-product" && <AddProduct />}
              {btID === "new-orders" && <NewOrders />}
              {btID === "manage-products" && <ManageProducts />}
            </div>
          </div>
        </div>
      )}
      <Footer2 className="footer" />
    </>
  );
};

export default SellerDashboard;

const Wrapper = styled.section`
  overflow-y: scroll;
  height: 98vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url(".public/images/nature.jpg");
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;

  .container {
    height: 1000px;
    background-color: white;
    display: flex;
  }

  .con1 {
    height: 700px;
    display: flex;
  }

  .firstSec {
    width: 200px;
    padding: 20px;
    margin-top: 200px;
  }

  .secondSec {
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    margin: 30px;
    width: 1150px;
  }
`;

const VerticalLine = styled.div`
  border-left: 3px solid #333;
  height: 70%;
  margin-top: 70px;
`;
