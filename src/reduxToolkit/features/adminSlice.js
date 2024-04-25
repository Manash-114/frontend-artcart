import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    sellerRequest: [],
    allSeller: [],
  },
  reducers: {
    updateSellerRequest: (state, action) => {
      state.sellerRequest = action.payload;
    },
    updateAllSeller: (state, action) => {
      state.allSeller = action.payload;
    },
    approveSeller: (state, action) => {
      const d = state.sellerRequest.filter((i) => i.id !== action.payload);
      state.sellerRequest = d;
    },
  },
});

export const { updateSellerRequest, approveSeller } = adminSlice.actions;
export default adminSlice.reducer;
