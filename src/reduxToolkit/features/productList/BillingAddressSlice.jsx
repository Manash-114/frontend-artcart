import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billingAddresses: [],
  orderIdCounter: 1,
  addressIdCounter: 1,

};

const BillingAddressSlice = createSlice({
  name: 'billingAddress',
  initialState,
  reducers: {
    addBillingAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        orderId: `orderId${state.orderIdCounter++}`,
        addressId: `addId${state.addressIdCounter++}`
      };
      state.billingAddresses.push(newAddress);
    },
    updateBillingAddress: (state, action) => {
      const { orderId, updatedData } = action.payload;
      const index = state.billingAddresses.findIndex(address => address.orderId === orderId);
      if (index !== -1) {
        state.billingAddresses[index] = {
          ...state.billingAddresses[index],
          ...updatedData
        };
      }
    },


  },
  
});

export const { addBillingAddress, updateBillingAddress } = BillingAddressSlice.actions;
export default BillingAddressSlice.reducer;