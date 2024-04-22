import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categories, price } from "../landingPage/data";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { searchAndFilter } from "../../reduxToolkit/features/productList/ProductSlice";

const Products = () => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const product = useSelector((state) => state.product);
  console.log(product);

  const { products, filterProducts } = product;

  const totalProducts =
    filterProducts.length > 0 ? filterProducts.length : products.length;

  //For pagination
  useEffect(() => {
    const totalFilteredProducts =
      filterProducts.length > 0 ? filterProducts.length : products.length;
    setTotalPages(Math.ceil(totalFilteredProducts / itemsPerPage));
  }, [filterProducts, products]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    scrollToElementById("ref");
  };

  const scrollToElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts =
    filterProducts.length > 0
      ? filterProducts.slice(indexOfFirstItem, indexOfLastItem)
      : products.slice(indexOfFirstItem, indexOfLastItem);

  const [term, setTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("default");
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setTerm(searchTerm);
  };

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setSelectedValue(selected);
  };

  const handlePriceFilter = (e) => {
    const priceFilter = e.target.value;
    setFilter(priceFilter);
  };

  const handleCategoryChange = (category) => {
    const newselectedCategory = [...selectedCategory]; // Create copy to avoid mutation

    const index = newselectedCategory.indexOf(category);
    if (index > -1) {
      // Category already selected, remove it
      newselectedCategory.splice(index, 1);
    } else {
      // Category not selected, add it
      newselectedCategory.push(category);
    }
    setSelectedCategory(newselectedCategory);
  };

  console.log(selectedCategory);
  // All Filters working simultaneously
  const applyFilters = (searchTerm, priceFilter, sortOption) => {
    dispatch(
      searchAndFilter({
        term: searchTerm,
        price: priceFilter,
        sort: sortOption,
        category: selectedCategory,
      })
    );
  };

  useEffect(() => {
    applyFilters(term, filter, selectedValue); // Call initial filter without category
  }, [term, filter, selectedValue]);

  useEffect(() => {
    // Re-apply filters when selectedCategory change
    applyFilters(term, filter, selectedValue);
  }, [term, filter, selectedValue, selectedCategory]);

  return (
    <Container>
      <ImageSection>
        <h1>Shop for art from creators you love</h1>
      </ImageSection>
      <FilterTop>
        <div className="filter-content" id="ref">
          <div className="title">Product List ({totalProducts})</div>
          <div className="search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Arts"
              value={term}
              onChange={handleSearchChange}
            />
          </div>
          <div className="sort">
            <label htmlFor="dropdown">Sort By</label>

            <select
              id="dropdown"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="default" disabled={selectedValue !== "default"}>
                Select Option
              </option>
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
                  <FormGroup key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCategory.includes(item.category)} // Check based on selectedCategory array
                          onChange={() => handleCategoryChange(item.category)}
                        />
                      }
                      label={item.category}
                    />
                  </FormGroup>
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
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                    onChange={handlePriceFilter}
                  >
                    <FormControlLabel
                      id="form-left"
                      value="all"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      id="form-left"
                      value="below"
                      control={<Radio />}
                      label="Below 300"
                    />
                    <FormControlLabel
                      id="form-left"
                      value="between"
                      control={<Radio />}
                      label="300 - 1000"
                    />
                    <FormControlLabel
                      id="form-left"
                      value="above"
                      control={<Radio />}
                      label="1000 and above"
                    />
                  </RadioGroup>
                </FormControl>

                {/* {
                  price.map((item, index) => (
                    <List key={item.id}>
                      <Button key={index} variant='outlined' color='success'>{item.range}</Button>
                    </List>
                  ))
                } */}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </LeftFilter>

        {/* product-container */}
        <ProductContainer>
          <ProductList currentProducts={currentProducts} />
          <StyledPagination>
            <Pagination
              count={totalPages}
              color="primary"
              onChange={handlePageChange}
              page={currentPage}
            />
          </StyledPagination>
        </ProductContainer>
      </SubContainer>
    </Container>
  );
};

export default Products;

const StyledPagination = styled.div`
  border-top: 0.4px solid black;
  padding: 12px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const List = styled.div`
  width: auto;
  height: auto;
`;
const Container = styled.div`
  height: 220vh;
`;
const ImageSection = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.023),
      rgba(0, 0, 0, 0.393)
    ),
    url("/images/theme1.jpg");
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

  #form-left {
    padding-left: 15px;
  }
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
`;
