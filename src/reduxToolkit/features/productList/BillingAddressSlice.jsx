import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // billingAddresses: [],

  addressId: 0,
  name: '',
  contact: '',
  alternateContact: '', 
  orderProducts: [],
  paymentReq: {
    id: 0,
    amount: '',
    mode: '',
  },
  // orderIdCounter: 1,
  // addressIdCounter: 1,

};

const BillingAddressSlice = createSlice({
  name: 'billingAddress',
  initialState,
  reducers: {
    updateAddressId(state, action) {
      state.addressId = action.payload;
    },
    updateCustomerDetails(state, action) {
      const { name, contact, alternateContact } = action.payload;
      return {
        ...state,
        name,
        contact,
        alternateContact
      }},
      updateProductInCart(state, action) {
        const { productId, quantity } = action.payload;
        
        // Check if the productId already exists in orderProducts
        const existingProductIndex = state.orderProducts.findIndex(product => product.productId === productId);
        
        if (existingProductIndex !== -1) {
          // If productId already exists, update the quantity
          state.orderProducts[existingProductIndex].quantity += quantity;
        } else {
          // If productId doesn't exist, add a new product to the array
          state.orderProducts.push({
            productId,
            quantity
          });
        }
      },      
      updatePaymentDetails: (state, action) => {
        const { amount, mode } = action.payload;
        // Update only the necessary properties using spread operator
        state.paymentReq = {
          ...state.paymentReq,
          amount,
          mode,
        };
      },

      // not in used currently
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

export const { addBillingAddress, updateBillingAddress, updateCustomerDetails, updateAddressId, updateProductInCart, updatePaymentDetails} = BillingAddressSlice.actions;
export default BillingAddressSlice.reducer;