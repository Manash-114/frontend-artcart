import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosPrivate from "../../apiCalls/getAxiosPrivate";
import getRefreshToken from "../../apiCalls/getRefreshToken";
import { logOut, setCredentials } from "./auth/authSlice";
import getAxiosPrivateWithFormData from "../../apiCalls/getAxiosPrivateWithFormData";

// Thunks for asynchronous actions
export const fetchSellerDetails = createAsyncThunk(
  "seller/fetchSellerDetails",
  async (_, { getState, dispatch, rejectWithValue }) => {
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
      const response = await axiosPrivate.get("/api/seller");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching seller");
    }
  }
);

export const saveSellerDetails = createAsyncThunk(
  "seller/saveSellerDetails",
  async ({ data }, { getState, dispatch, rejectWithValue }) => {
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
    const axiosPrivateForm = getAxiosPrivateWithFormData(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivateForm.put("/api/seller/save", data, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error saving seller");
    }
  }
);

export const fetchNewOrders = createAsyncThunk(
  "seller/fetchNewOrders",
  async () => {
    const response = await axios.get("/api/seller/orders/new");
    return response.data;
  }
);

export const fetchAllOrders = createAsyncThunk(
  "seller/fetchAllOrders",
  async () => {
    const response = await axios.get("/api/seller/orders/all");
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "seller/fetchProducts",
  async () => {
    const response = await axios.get("/api/seller/products");
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "seller/updateProduct",
  async (productData) => {
    const { id, updates } = productData;
    const response = await axios.put(`/api/seller/product/${id}`, updates);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (productId) => {
    await axios.delete(`/api/seller/product/${productId}`);
    return productId;
  }
);

export const editProduct = createAsyncThunk(
  "seller/editProduct",
  async (productData) => {
    const { id, updates } = productData;
    const response = await axios.patch(`/api/seller/product/${id}`, updates);
    return response.data;
  }
);

export const approveOrder = createAsyncThunk(
  "seller/approveOrder",
  async (orderId) => {
    const response = await axios.post(`/api/seller/order/approve/${orderId}`);
    return response.data;
  }
);

// Initial state
const initialState = {
  seller: null,
  newOrders: [],
  allOrders: [],
  allProducts: [],
  loading: false,
  error: null,
};

// Seller slice
const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch seller details
      .addCase(fetchSellerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerDetails.fulfilled, (state, action) => {
        state.seller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(saveSellerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSellerDetails.fulfilled, (state, action) => {
        state.seller = action.payload;
        state.loading = false;
      })
      .addCase(saveSellerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch new orders
      .addCase(fetchNewOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewOrders.fulfilled, (state, action) => {
        state.newOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Approve order
      .addCase(approveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveOrder.fulfilled, (state, action) => {
        const index = state.newOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.newOrders.splice(index, 1); // Remove the approved order from newOrders
          state.allOrders.push(action.payload); // Add to allOrders
        }
        state.loading = false;
      })
      .addCase(approveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sellerSlice.reducer;
