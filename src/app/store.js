import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reduxToolkit/features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import productReducer from "../reduxToolkit/features/productList/ProductSlice";
import cartReducer from "../reduxToolkit/features/productList/CartSlice";
import wishlistReducer from "../reduxToolkit/features/productList/WishListSlice";
import billingAddressReducer from "../reduxToolkit/features/productList/BillingAddressSlice";
import sellerReducer from "../reduxToolkit/features/sellerSlice";
import customerReducer from "../reduxToolkit/features/customerSlice";
import adminReducer from "../reduxToolkit/features/adminSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    billingAddress: billingAddressReducer,
    seller: sellerReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
