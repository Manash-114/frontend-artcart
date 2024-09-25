import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_LOCAL } from "../../../apiCalls/common-db";
import axios from "../../../apiCalls/axios";
import getRefreshToken from "../../../apiCalls/getRefreshToken";
import getAxiosPrivate from "../../../apiCalls/getAxiosPrivate";
import { setCredentials } from "../auth/authSlice";

const initialState = {
  loading: false,
  products: [],
  productCategory: [],
  filterProducts: [],
  error: "",
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axios.get(`${BASE_URL_LOCAL}/public/product`);
    return res.data.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/categories",
  async () => {
    const res = await axios.get(`${BASE_URL_LOCAL}/public/category`);
    return res.data;
  }
);

export const addNewCategory = createAsyncThunk(
  "category/addNewCategory",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.post(
        "/api/admin/category",
        JSON.stringify(data)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (initialPost) => {
    const { id } = initialPost;
    // try-catch block only for development/testing with fake API
    // otherwise, remove try-catch and add updatePost.rejected case
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      //return err.message;
      return initialPost; // only for testing Redux!
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id }, { getState, dispatch, rejectWithValue }) => {
    console.log("delete id from thunk", id);
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.delete(`/api/admin/category/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting category");
    }
  }
);

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
      if (category.length > 0) {
        // Check if any category is selected
        filteredProducts = filteredProducts.filter((product) =>
          category.includes(product.category.name)
        );
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
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = action.payload),
          (state.filterProducts = action.payload),
          (state.error = "");
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.products = []),
          (state.filterProducts = []),
          (state.error = action.error.message),
          (state.status = "failed");
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.productCategory = action.payload;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.productCategory.push(action.payload.data);
        state.error = "";
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to add new category";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cat = state.productCategory.filter(
          (cat) => cat.id !== action.payload
        );
        state.productCategory = cat;
        state.error = "";
      });
  },
});
export const { searchAndFilter } = ProductSlice.actions;
export default ProductSlice.reducer;
