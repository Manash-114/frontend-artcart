import React from "react";
import Header from "../common/Header";
import HeroSection from "./HeroSection";
import SliderSection from "./SliderSection";
import Categories from "./Categories";
import { categories1 } from "./data";
import Services from "./Services";
import Footer2 from "../common/Footer2";
import FeaturedProducts from "./FeaturedProducts";

const LandingPage = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url('./images/background.jpg')` }}
    >
      <div className="bg-gradient-to-r from-purple-800/70 to-indigo-600/70 min-h-screen">
        <Header />
        <SliderSection />
        <Categories data={categories1} />
        <Services />
        <HeroSection />
        <FeaturedProducts />
        <Footer2 />
      </div>
    </div>
  );
};

export default LandingPage;
