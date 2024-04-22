import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productList/ProductSlice';
import cartReducer from "../features/productList/CartSlice";
import wishlistReducer from "../features/productList/WishListSlice";
import billingAddressReducer from "../features/productList/BillingAddressSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        billingAddress: billingAddressReducer,
    }
})

export default store
