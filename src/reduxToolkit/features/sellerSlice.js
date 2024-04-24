import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState: {
    newOrders: [],
    allOrders: [],
    productCategory: [],
    allProduct: [],
  },
  reducers: {
    signIn: (state, action) => {
      state.signin = true;
      state.token = action.payload;
    },

    updateNewOrders: (state, action) => {
      state.newOrders = action.payload;
    },

    acceptOrderAndUpdate: (state, action) => {
      const up = state.newOrders.filter((p) => p.orderId !== action.payload);
      state.newOrders = up;
    },
    updateAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },

    updateProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    updateAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
  },
});

export const {
  updateNewOrders,
  updateAllOrders,
  updateProductCategory,
  acceptOrderAndUpdate,
  updateAllProduct,
} = sellerSlice.actions;
export default sellerSlice.reducer;
