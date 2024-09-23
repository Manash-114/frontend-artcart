import React, { useEffect } from "react";
import Header from "../common/Header";
import HeroSection from "./HeroSection";
import SliderSection from "./SliderSection";
import Categories from "./Categories";
import { categories1 } from "./data";
import Services from "./Services";
import Footer2 from "../common/Footer2";
import FeaturedProducts from "./FeaturedProducts";
import styled from "styled-components";
const LandingPage = () => {
  return (
    <Wrapper>
      <Header />
      <SliderSection />
      <Categories data={categories1} />
      <Services />
      <HeroSection />
      <FeaturedProducts />
      <Footer2 />
    </Wrapper>
  );
};

export default LandingPage;
const Wrapper = styled.div`
  background-image: linear-gradient(
      130deg,
      rgba(27, 2, 10, 0.671),
      rgba(44, 75, 100, 0.852)
    ),
    url("./images/background.jpg");
  background-size: contain;
  background-position: center;
`;
