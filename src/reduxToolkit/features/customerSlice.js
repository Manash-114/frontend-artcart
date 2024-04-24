import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    allNotDeliveredOrders: [],
    allDeliveredOrders: [],
  },
  reducers: {
    updateAllOrders: (state, action) => {
      state.allDeliveredOrders = action.payload;
    },
    updateAllNotDeliverdOrders: (state, action) => {
      state.allNotDeliveredOrders = action.payload;
    },
  },
});

export const { updateAllOrders, updateAllNotDeliverdOrders } =
  customerSlice.actions;
export default customerSlice.reducer;
