import React, { useEffect } from "react";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SellerRegistration from "./components/seller/SellerRegistration";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ProtectedRoutes from "./components/seller/ProtectedRoutes";
import Dashboard from "./components/seller/Dashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HeroSection from "./components/landingPage/HeroSection";
import Slider from "./components/landingPage/SliderSection";
import SimpleCarousel from "./components/landingPage/SliderSection";
import SliderSection from "./components/landingPage/SliderSection";
import { sliderItems } from "./components/landingPage/data.js";
import LandingPage from "./components/landingPage/LandingPage";

import Services from "./components/landingPage/Services.jsx";
import Footer2 from "./components/common/Footer2.jsx";
import FeaturedProducts from "./components/landingPage/FeaturedProducts.jsx";
import ProductPage from "./pages/users/ProductPage.jsx";
import SingleProduct from "./pages/users/SingleProduct.jsx";
import Product from "./components/users/Product.jsx";
import Test from "./components/users/Test.jsx";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./reduxToolkit/features/productList/ProductSlice.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageSeller from "./components/admin/ManageSeller.jsx";
import ProductCategories from "./components/admin/ProductCategories.jsx";
import AdminBody from "./components/admin/AdminBody.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import ProtectedRouteSeller from "./components/common/ProtectedRouteSeller.jsx";
import WishListPage from "./pages/users/WishListPage.jsx";
import BillingPage from "./components/Billing/BillingPage.jsx";
import OrderPage from "./components/Orders/OrderPage.jsx";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import Cart from "./components/users/Cart.jsx";
import CartPage from "./pages/users/CartPage.jsx";
import SuggestedProducts from "./components/users/SuggestedProducts.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/s" element={<SuggestedProducts />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/orders/details" element={<OrderDetails />} />

        {/* <Route path="/seller/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/seller"
          element={<ProtectedRouteSeller Component={Dashboard} />}
        >
          <Route path="completeprofile" element={<SellerRegistration />} />
        </Route>

        <Route path="/seller/register" element={<RegisterPage />} />
        <Route path="/seller/login" element={<LoginPage />} />

        {/* admin route */}
        <Route
          path="/admin"
          element={<ProtectedRoute Component={AdminDashboard} />}
        >
          <Route path="dashboard" element={<AdminBody />} />
          <Route path="manageseller" element={<ManageSeller />} />
          <Route path="categories" element={<ProductCategories />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
