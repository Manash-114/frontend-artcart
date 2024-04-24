import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    allNotDeliveredorders: [],
    allorders: [],
  },
  reducers: {
    updateAllOrders: (state, action) => {
      state.allorders = action.payload;
    },
    updateAllNotDeliverdOrders: (state, action) => {
      state.allNotDeliveredorders = action.payload;
    },
  },
});

export const { updateAllOrders, updateAllNotDeliverdOrders } =
  customerSlice.actions;
export default customerSlice.reducer;
