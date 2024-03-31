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
        .get('https://fakestoreapi.com/products')
        return res.data;
    }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload,
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state,action) => {
            state.loading = false,
            state.products = [],
            state.error = action.error.message
        })
    }
})

export default ProductSlice.reducer