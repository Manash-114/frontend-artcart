import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    allorders: [],
  },
  reducers: {
    updateAllOrders: (state, action) => {
      state.allorders = action.payload;
    },
  },
});

export const { updateAllOrders } = customerSlice.actions;
export default customerSlice.reducer;
