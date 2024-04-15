import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productList/ProductSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
