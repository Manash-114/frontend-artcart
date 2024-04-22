import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";
import Products from "../../components/users/Products";

const ProductPage = ({ data }) => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <Header />
      <Products />
      <Footer2 />
    </div>
  );
};

export default ProductPage;
