import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

import productReducer from "../features/productList/ProductSlice";
import cartReducer from "../features/productList/CartSlice";
import wishlistReducer from "../features/productList/WishListSlice";
import billingAddressReducer from "../features/productList/BillingAddressSlice";
import sellerReducer from "../features/sellerSlice";
import customerReducer from "../features/customerSlice";
import adminReducer from "../features/adminSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    billingAddress: billingAddressReducer,
    auth: authReducer,
    seller: sellerReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
});

export default store;
