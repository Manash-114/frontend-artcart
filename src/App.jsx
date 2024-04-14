<<<<<<< HEAD
import React from "react";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SellerRegistration from "./components/seller/SellerRegistration";
=======
import React, { useEffect } from 'react'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminDashboard from './pages/Seller/AdminDashboard'
import SellerRegistration from './components/seller/SellerRegistration'

import Registration from './components/Registration'
import Login from './components/Login'
import ProtectedRoutes from './components/seller/ProtectedRoutes'
import Dashboard from './components/seller/Dashboard'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HeroSection from './components/landingPage/HeroSection'
import Slider from './components/landingPage/SliderSection'
import SimpleCarousel from './components/landingPage/SliderSection'
import SliderSection from './components/landingPage/SliderSection'
import { categories, sliderItems } from './components/landingPage/data.js'
import LandingPage from './components/landingPage/LandingPage'

import Categories from './components/landingPage/Categories'
import Services from './components/landingPage/Services.jsx'
import Footer2 from './components/common/Footer2.jsx'
import FeaturedProducts from './components/landingPage/FeaturedProducts.jsx'
import ProductPage from './pages/users/ProductPage.jsx'
import SingleProduct from './pages/users/SingleProduct.jsx'
import Product from './components/users/Product.jsx'
import Test from './components/users/Test.jsx'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './reduxToolkit/features/productList/ProductSlice.jsx'
>>>>>>> aff208fd233ddad9b4ac22da7fa8e06ee4ee9533

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
import { categories, sliderItems } from "./components/landingPage/data.js";
import LandingPage from "./components/landingPage/LandingPage";

// import Categories from "./components/landingPage/Categories";
import Services from "./components/landingPage/Services.jsx";
import Footer2 from "./components/common/Footer2.jsx";
import FeaturedProducts from "./components/landingPage/FeaturedProducts.jsx";
import ProductPage from "./components/users/ProductPage.jsx";
import Body from "./components/admin/Body.jsx";
import ManageSeller from "./components/admin/ManageSeller.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Categories from "./components/admin/Categories.jsx";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



  return (
    <Router>
      <Routes>




        <Route path='/register' element={<Registration />} />
        {/* <Route path='/' element={<Slide />} > */}
        <Route path='/hero' element={<HeroSection />} />
        {/* <Route path='/' element={<LandingPage />} />  */}


        {/* <Route path='/categoryitem' element={<CategoryItem/>} /> */}
        
        <Route path='/' element={<ProductPage/>} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/seller/dashboard' element={<Dashboard/>} />
        <Route path='/seller/register' element={<Registration/>} />
        <Route path='/seller/login' element={<Login/>} />
        <Route path='/seller/completeprofile' element={<SellerRegistration/>} />




      </Routes>
    </Router>
  )

}

export default App;
