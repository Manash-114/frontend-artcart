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
import CartPage from './pages/users/CartPage.jsx'
import WishListPage from './pages/users/WishListPage.jsx'
import Test2 from './components/users/Test2.jsx'
import BillingPage from './components/Billing/BillingPage.jsx'
import OrderPage from './components/Orders/OrderPage.jsx'
import OrderDetails from './components/Orders/OrderDetails.jsx'



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
        
        <Route path='/' element={<LandingPage/>} />
        <Route path='/products' element={<ProductPage/>} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/cartPage' element={<CartPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/wishlist' element={<WishListPage/>} />
        <Route path='/test2' element={<Test2/>} />
        <Route path='/billing' element={<BillingPage/>} />
        <Route path='/orders' element={<OrderPage/>} />
        <Route path='/orders/details' element={<OrderDetails/>} />



      </Routes>
    </Router>
  )

}

export default App
