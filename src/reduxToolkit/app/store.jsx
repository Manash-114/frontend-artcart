import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

import productReducer from "../features/productList/ProductSlice";
import cartReducer from "../features/productList/CartSlice";
import wishlistReducer from "../features/productList/WishListSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export default store;
