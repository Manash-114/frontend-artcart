import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_LOCAL } from "../../../apiCalls/common-db";

const initialState = {
  loading: false,
  products: [],
  filterProducts: [],
  error: "",
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axios.get(`${BASE_URL_LOCAL}/public/product`);
    // console.log(res.data.data);
    return res.data.data;
  }
);
// get('https://dummyjson.com/products')

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchAndFilter: (state, action) => {
      const { term, price, sort, category } = action.payload;

      let filteredProducts = [...state.products];

      if (term) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      }

      if (category.length > 0) { // Check if any category is selected
        filteredProducts = filteredProducts.filter(product => category.includes(product.category.name));
    }

      // Apply price filter (if selected)
      switch (price) {
        case "below":
          filteredProducts = filteredProducts.filter(
            (product) => product.price < 300
          );
          break;
        case "between":
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= 300 && product.price <= 1000
          );
          break;
        case "above":
          filteredProducts = filteredProducts.filter(
            (product) => product.price > 1000
          );
          break;
        default:
          break; // No additional filtering if 'all' is selected
      }

      // Apply sorting (if selected)
      if (sort === "ascending") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "descending") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      state.filterProducts = filteredProducts;
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.loading = false),
        (state.products = action.payload),
        (state.filterProducts = action.payload),
        (state.error = "");
      state.status = "succeeded";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      (state.loading = false),
        (state.products = []),
        (state.filterProducts = []),
        (state.error = action.error.message),
        (state.status = "failed");
    });
  },
});
export const { searchAndFilter } = ProductSlice.actions;
export default ProductSlice.reducer;
