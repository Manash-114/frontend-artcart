import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer2 from "../common/Footer2";
import AddProduct from "./dashboardCompo/AddProduct";
import NewOrders from "./dashboardCompo/NewOrders";
import ViewAllOrders from "./dashboardCompo/ViewAllOrders";
import ManageProducts from "./dashboardCompo/ManageProducts";
import SellerRegistration from "./SellerRegistration";
import { useDispatch, useSelector } from "react-redux";
import SellerNav from "./SellerNav";
import { fetchSellerDetails } from "../../reduxToolkit/features/sellerSlice";

const buttons = [
  {
    name: "Complete your profile",
    type: "button",
    id: "complete-profile",
  },
  ,
  {
    name: "Add Product",
    type: "button",
    id: "add-product",
  },
  {
    name: "Orders",
    type: "button",
    id: "new-orders",
  },
  // {
  //   name: "All Orders",
  //   type: "button",
  //   id: "all-orders",
  // },
  {
    name: "Manage Products",
    type: "button",
    id: "manage-products",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [btID, SetbtID] = useState();
  const handleClick = (e) => {
    SetbtID(e.target.id);
  };
  const [showMessage, setShowMessage] = useState(false);
  const { seller } = useSelector((store) => store.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSellerDetails());
  }, []);

  return (
    // <Wrapper>
    <>
      <SellerNav />
      {seller?.name === null ? (
        <SellerRegistration />
      ) : seller?.approved === false ? (
        <div
          className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Please wait until admin approved your request
          </span>
        </div>
      ) : (
        <div className="p-32 pt-8">
          <div className="con1">
            <div className="">
              {seller?.approved == false
                ? ""
                : buttons.map((button, index) => {
                    if (index != 0)
                      return (
                        <button
                          className="p-2  bg-indigo-700 text-white m-3 rounded-md hover:bg-indigo-600"
                          key={index}
                          id={button.id}
                          type={button.type}
                          onClick={handleClick}
                        >
                          {button.name}
                        </button>
                      );
                  })}
            </div>
            <VerticalLine />
            <div className="secondSec">
              {/* {btID === "complete-profile" && <SellerRegistration />} */}
              {btID === "add-product" && <AddProduct />}
              {btID === "new-orders" && <NewOrders />}
              {/* {btID === "all-orders" && <ViewAllOrders />} */}
              {btID === "manage-products" && <ManageProducts />}
            </div>
          </div>
        </div>
      )}
      <Footer2 className="footer" />
    </>

    // </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.section`
    overflow-y: scroll;
    height: 98vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.100), rgba(0,0,0,0.4)),url('.public/images/nature.jpg');
    background-size: cover;
    background-position: center;
    justify-content: center;
    align-items: center;
    .container{
        height:1000px
        background-color: white;
       display:flex;
        
      }

    .foo{
        mergin-top: 80px;
    }

    .con1{
        height:700px;
        display:flex;
    }

    .firstSec{
       
        width: 200px;
        padding:20px;
        margin-top:200px;
    }

    .secondSec{
        
        border: 1px solid black;
        border-radius:10px;
        padding:20px;
        margin:30px;
        width:1150px
    }

    button{
        width: 100%;
        height: 40px;
        background-color: #18a021;
        border: 1px solid #ccc;
        color: white;
        text-transform: uppercase;
        margin-bottom: 20px;
        transition: transform 0.5s;
        cursor: pointer;
    
    }

    button:hover{
        background-color: black;
        border-radius:7px;
    }

`;

const VerticalLine = styled.div`
  border-left: 3px solid #333;
  height: 70%;
  margin-top: 70px;
`;
