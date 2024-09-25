import React, { useEffect } from "react";
import Header from "../common/Header";
import Footer2 from "../common/Footer2";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";
import {
  fetchAllDeliveredOrders,
  fetchAllUnDeliveredOrders,
} from "../../reduxToolkit/features/customerSlice";

const OrderPage = () => {
  const dispatch = useDispatch();

  const getAllOrders = async () => {
    try {
      const res = await dispatch(fetchAllDeliveredOrders()).unwrap();
      const res2 = await dispatch(fetchAllUnDeliveredOrders()).unwrap();
    } catch (error) {
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      }
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Order />
      <Footer2 />
    </div>
  );
};

export default OrderPage;
