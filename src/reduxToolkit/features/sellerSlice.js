import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState: {
    seller: null,
    newOrders: [],
    allOrders: [],
    allProduct: [],
  },
  
}
