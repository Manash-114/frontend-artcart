import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
  Pagination,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { searchAndFilter } from "../../reduxToolkit/features/productList/ProductSlice";
import toast from "react-hot-toast";
import { orderSuccess } from "../../reduxToolkit/features/authSlice";

const Products = () => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const categories = useSelector((state) => state.product.productCategory);
  const product = useSelector((state) => state.product);
  const auth = useSelector((store) => store.auth);
  const { products, filterProducts } = product;
  const totalProducts =
    filterProducts.length > 0 ? filterProducts.length : products.length;

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
    setTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handlePriceFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (category) => {
    const newSelectedCategory = [...selectedCategory];

    const index = newSelectedCategory.indexOf(category);
    if (index > -1) {
      newSelectedCategory.splice(index, 1);
    } else {
      newSelectedCategory.push(category);
    }
    setSelectedCategory(newSelectedCategory);
  };

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
    applyFilters(term, filter, selectedValue);
  }, [term, filter, selectedValue]);

  useEffect(() => {
    applyFilters(term, filter, selectedValue);
  }, [selectedCategory]);

  useEffect(() => {
    if (auth.orderCreate) {
      toast.success("Order done Successfully!");
    }
    dispatch(orderSuccess(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-400">
      {/* Header Section */}
      <div className="relative h-64 bg-cover bg-center flex justify-center items-center text-white text-center bg-[url('/images/theme1.jpg')]">
        <h1 className="text-3xl font-bold uppercase">
          Shop for art from creators you love
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="py-6 flex flex-col items-center flex-grow">
        <div
          className="flex flex-col md:flex-row md:justify-between w-full max-w-screen-xl px-4 md:px-8 space-y-4 md:space-y-0"
          id="ref"
        >
          <div className="text-lg font-semibold">
            Product List ({totalProducts})
          </div>

          {/* Search and Sort Section */}
          <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64 mt-5">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="pl-12 pr-4 py-2 border rounded-full w-full"
                placeholder="Search Arts"
                value={term}
                onChange={handleSearchChange}
              />
            </div>
            <div className="relative w-full md:w-64">
              <label htmlFor="dropdown" className="mr-2">
                Sort By:
              </label>
              <select
                id="dropdown"
                value={selectedValue}
                onChange={handleSelectChange}
                className="border rounded-lg py-2 px-3 w-full"
              >
                <option value="default" disabled>
                  Select Option
                </option>
                <option value="ascending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Product List Section */}
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 md:px-8 gap-8 flex-grow">
        {/* Filter Section */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">
                Categories <ArrowDropDownIcon />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {categories.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={selectedCategory.includes(item.name)}
                        onChange={() => handleCategoryChange(item.name)}
                      />
                    }
                    label={item.name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>
              <Typography variant="h6">
                Price <ArrowDropDownIcon />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup onChange={handlePriceFilter} defaultValue="all">
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="below"
                  control={<Radio />}
                  label="Below 300"
                />
                <FormControlLabel
                  value="between"
                  control={<Radio />}
                  label="300 - 1000"
                />
                <FormControlLabel
                  value="above"
                  control={<Radio />}
                  label="1000 and above"
                />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </div>

        {/* Product List Section */}
        <div className="flex-1">
          {/* Responsive Product Grid */}
          <ProductList currentProducts={currentProducts} />
          <div className="flex justify-center mt-8">
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
