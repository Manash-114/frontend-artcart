import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    products: [],
    filterProducts: [],
    error: '',
    status: 'idle',
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
    reducers: {
        searchAndFilter: (state, action) => {
            const { term, price, sort, category } = action.payload;
            let filteredProducts = state.products; // Start with all products

            // Apply search filter (if term exists)
            if (term) {
                filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(term.toLowerCase()));
            }

            // Apply category filter (if selected)
            if (category.length > 0) { // Check if any category is selected
                filteredProducts = filteredProducts.filter(product => category.includes(product.category));
            }


            // Apply price filter (if selected)
            switch (price) {
                case 'below':
                    filteredProducts = filteredProducts.filter(product => product.price < 300);
                    break;
                case 'between':
                    filteredProducts = filteredProducts.filter(product => product.price >= 300 && product.price <= 1000);
                    break;
                case 'above':
                    filteredProducts = filteredProducts.filter(product => product.price > 1000);
                    break;
                default:
                    break; // No additional filtering if 'all' is selected
            }

            // Apply sorting (if selected)
            if (sort === "ascending") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sort === "descending") {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            state.filterProducts = filteredProducts;
        },


    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
                state.products = action.payload,
                state.filterProducts = action.payload,
                state.error = '';
            state.status = 'succeeded';
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false,
                state.products = [],
                state.filterProducts = [],
                state.error = action.error.message,
                state.status = 'failed';
        })
    }
})
export const { searchAndFilter } = ProductSlice.actions;
export default ProductSlice.reducer
