import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productList/ProductSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
    }
})

export default store
