import React, { useEffect } from "react";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import ProductPage from "./pages/users/ProductPage.jsx";
import SingleProduct from "./pages/users/SingleProduct.jsx";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./reduxToolkit/features/productList/ProductSlice.jsx";
import WishListPage from "./pages/users/WishListPage.jsx";
import BillingPage from "./components/Billing/BillingPage.jsx";
import OrderPage from "./components/Orders/OrderPage.jsx";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import CartPage from "./pages/users/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import SellerRegistration from "./components/seller/SellerRegistration.jsx";
import ManageSeller from "./components/admin/ManageSeller.jsx";
import ProductCategories from "./components/admin/ProductCategories.jsx";
import SellerDashboard from "./components/seller/SellerDashboard.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import AdminDashBoard from "./components/admin/AdminDashBoard.jsx";
import OrdersList from "./components/seller/OrdersList.jsx";
import SellerLayout from "./components/seller/SellerLayout.jsx";
import AddProduct from "./components/seller/dashboardCompo/AddProduct.jsx";
import ManageProducts from "./components/seller/dashboardCompo/ManageProducts.jsx";
import UserLayout from "./pages/users/UserLayout.jsx";

const ROLES = {
  Customer: "ROLE_CUSTOMER",
  Admin: "ROLE_ADMIN",
  Seller: "ROLE_SELLER",
};
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="/user" element={<Test />} /> */}
        {/* <Route path="" element={<Welcome />} /> */}
        <Route path="signup" element={<RegisterPage />} />
        <Route path="seller/signup" element={<RegisterPage />} />
        <Route path="seller/login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<UserLayout />}>
          <Route element={<RequireAuth allowedRoles={ROLES.Customer} />}>
            <Route path="wishlist" element={<WishListPage />} />
            <Route path="cartPage" element={<CartPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="orders/details" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route
          path="seller"
          element={<RequireAuth allowedRoles={ROLES.Seller} />}
        >
          <Route element={<SellerLayout />}>
            <Route index path="" element={<SellerDashboard />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="manageproduct" element={<ManageProducts />} />
            <Route path="completeprofile" element={<SellerRegistration />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
          <Route path="admin" element={<AdminPage />}>
            <Route path="" element={<AdminDashBoard />} />
            <Route path="manageseller" element={<ManageSeller />} />
            <Route path="categories" element={<ProductCategories />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
