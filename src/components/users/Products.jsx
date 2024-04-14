import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categories, price } from "../landingPage/data";
import ProductList from "./ProductList";

const Products = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  fetch("http://3.108.56.2:7002/api/admin/all-unapproved-seller", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW5hc2giLCJpYXQiOjE3MTI0NzQ0NjgsImV4cCI6MTcxMjU2MDg2OCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiJ9.wNpkCoMNTeqmkkas9r4_wRAIWwzbBfXmbjSJnUvpOgw",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });

  return (
    <Container>
      <ImageSection>
        <h1>Shop for art from creators you love</h1>
      </ImageSection>
      <FilterTop>
        <div className="filter-content">
          <div className="title">Product List (0)</div>
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search Arts" />
          </div>
          <div className="sort">
            <label htmlFor="dropdown">Sort By </label>

            <select
              id="dropdown"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="default">Select Option</option>
              <option value="ascending">Low to High</option>
              <option value="descending">High to Low</option>
            </select>
          </div>
        </div>
      </FilterTop>
      <SubContainer>
        <LeftFilter>
          <h2>Filter</h2>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h5" id="category">
                Categories <ArrowDropDownIcon />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {categories.map((item, index) => (
                  <List>
                    <Button key={index} variant="outlined">
                      {item.title}
                    </Button>
                  </List>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h5" id="price">
                Price <ArrowDropDownIcon />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {price.map((item, index) => (
                  <List>
                    <Button key={item.index} variant="outlined" color="success">
                      {item.range}
                    </Button>
                  </List>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </LeftFilter>

        {/* product-container */}
        <ProductContainer>
          <ProductList />
        </ProductContainer>
      </SubContainer>
    </Container>
  );
};

export default Products;

const List = styled.div`
  width: auto;
  height: auto;
`;
const Container = styled.div``;
const ImageSection = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.023),
      rgba(0, 0, 0, 0.393)
    ),
    url("public/images/theme1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  h1 {
    text-transform: uppercase;
    font-size: 40px;
    width: 50%;
    text-align: center;
  }
`;
const FilterTop = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  .filter-content {
    height: 60px;
    width: 100%;
    background-color: #e3ecec;
    display: flex;
    justify-content: space-between;
    padding: 0 15%;
    align-items: center;
  }
  .search {
    padding: 0 10px;
    width: 20%;
    height: 40px;
    background-color: white;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      height: 32px;
      width: 100%;
      border: none;
      outline: none;
      font-size: 15px;
      font-weight: 400;
    }
  }
  .sort {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #dropdown {
    margin-left: 10px;
    height: 35px;
    border-radius: 10px;
    width: 40%;
    padding-left: 10px;
  }
`;
const SubContainer = styled.div`
  padding: 10px 7%;
  display: flex;
  gap: 50px;
`;
const LeftFilter = styled.div`
  background-color: #e5ebeb91;
  display: flex;
  flex-direction: column;

  padding: 10px;
  flex: 0.3;
  border: 1px solid black;

  h2 {
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 40px;
  }
  #category {
    width: 100%;
    display: flex;
    font-size: 16px;
    font-weight: 540;
    text-transform: uppercase;
    justify-content: space-between;
  }
  #price {
    width: 100%;
    display: flex;
    font-size: 16px;
    font-weight: 540;
    text-transform: uppercase;
    justify-content: space-between;
  }
  Button {
    font-size: 14px;
    font-weight: 530;
    width: 90%;
    margin-left: 20px;
  }
`;
const ProductContainer = styled.div`
  flex: 1.1;
  height: 150vh;
  border: 1px solid black;
`;
