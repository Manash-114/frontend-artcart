import React, { useEffect } from "react";
import Header from "../common/Header";
import Footer2 from "../common/Footer2";
import Order from "./Order";
import { getAllOrders } from "../../apiCalls/users/getAllOrders";
import { useDispatch, useSelector } from "react-redux";
import { getAllUndeliveredOrders } from "../../apiCalls/users/getAllUndeliveredOrders";

const OrderPage = () => {
  const { token } = useSelector((store) => store.auth);
  console.log(token);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("order page");
    getAllUndeliveredOrders(token, dispatch);
    getAllOrders(token, dispatch);
  }, []);
  return (
    <div>
      <Header />
      <Order />
      <Footer2 />
    </div>
  );
};

export default OrderPage;
