import React, { useEffect } from "react";
import Header from "../common/Header";
import HeroSection from "./HeroSection";
import Footer from "../common/Footer";
import SliderSection from "./SliderSection";
import Categories from "./Categories";
import { categories1 } from "./data";
import Services from "./Services";
import Footer2 from "../common/Footer2";
import FeaturedProducts from "./FeaturedProducts";
import getCurrentUser from "../../apiCalls/getCurrentUser";
import { getAllCategoriesFromBackend } from "../../apiCalls/admin/getAllCategoriesFromBackend";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const token = localStorage.getItem("jwttoken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser(token, navigate, dispatch);
    getAllCategoriesFromBackend(dispatch);
  }, [currentUser.name]);
  return (
    <div>
      <Header />
      <SliderSection />
      <Categories data={categories1} />
      <Services />
      <HeroSection />
      <FeaturedProducts />
      <Footer2 />
    </div>
  );
};

export default LandingPage;
