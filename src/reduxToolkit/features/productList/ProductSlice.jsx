import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    products: [],
    
    error: ''
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProduct', async () => {
        const res = await axios
        .get('https://dummyjson.com/products')
        console.log(res.data.products)
        return res.data.products;
    }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload,
            state.error = '';
            state.status = 'succeeded';
        })
        builder.addCase(fetchProducts.rejected, (state,action) => {
            state.loading = false,
            state.products = [],
            state.error = action.error.message,
            state.status = 'failed';
        })
    }
})

export default ProductSlice.reducer