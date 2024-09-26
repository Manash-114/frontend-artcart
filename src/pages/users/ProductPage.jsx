import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import Footer2 from "../../components/common/Footer2";
import Products from "../../components/users/Products";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content with flex-grow to push the footer down */}
      <main className="flex-grow">
        <Products />
      </main>

      {/* Footer */}
      <Footer2 className="flex-shrink-0" />
    </div>
  );
};

export default ProductPage;
