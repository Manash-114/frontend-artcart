import React from "react";

import Header from "../../components/common/Header";
import Product from "../../components/users/Product";
import Footer2 from "../../components/common/Footer2";
import SuggestedProducts from "../../components/users/SuggestedProducts";
import styled from "styled-components";
import FeatureProducts from "../../components/landingPage/FeaturedProducts";

const SingleProduct = () => {
  return (
    <Wrapper>
      <Header />
      <Product />
      <SuggestedProducts />
      {/* <FeatureProducts /> */}
      <Footer2 />
    </Wrapper>
  );
};

export default SingleProduct;
const Wrapper = styled.div``;
