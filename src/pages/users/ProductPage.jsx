import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";
import Products from "../../components/users/Products";
import getCurrentUser from "../../apiCalls/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductPage = ({ data }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwttoken");
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.auth);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("get");
    getCurrentUser(token, navigate, dispatch);
  }, [currentUser.name]);
  return (
    <div>
      <Header />
      <Products />
      <Footer2 />
    </div>
  );
};

export default ProductPage;
