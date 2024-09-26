import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // billingAddresses: [],
  addressId: null,
  name: null,
  phoneNumber: null,
  orderProducts: [],
  paymentReq: {
    id: 0,
    amount: null,
    mode: null,
  },
  // orderIdCounter: 1,
  // addressIdCounter: 1,
};

const BillingAddressSlice = createSlice({
  name: "billingAddress",
  initialState,
  reducers: {
    updateAddressId(state, action) {
      state.addressId = action.payload;
    },
    updateCustomerInfo(state, action) {
      const { name, phoneNumber, alternatePhoneNumber } = action.payload;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state.alternatePhoneNumber = alternatePhoneNumber;
    },
    updateProductInCart(state, action) {
      const { productId, quantity } = action.payload;

      // Check if the productId already exists in orderProducts
      const existingProductIndex = state.orderProducts.findIndex(
        (product) => product.productId === productId
      );

      if (existingProductIndex !== -1) {
        // If productId already exists, update the quantity
        state.orderProducts[existingProductIndex].quantity += quantity;
      } else {
        // If productId doesn't exist, add a new product to the array
        state.orderProducts.push({
          productId,
          quantity,
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
        addressId: `addId${state.addressIdCounter++}`,
      };
      state.billingAddresses.push(newAddress);
    },
    updateBillingAddress: (state, action) => {
      const { orderId, updatedData } = action.payload;
      const index = state.billingAddresses.findIndex(
        (address) => address.orderId === orderId
      );
      if (index !== -1) {
        state.billingAddresses[index] = {
          ...state.billingAddresses[index],
          ...updatedData,
        };
      }
    },

    resetBillingAddress: (state) => {
      (state.addressId = 0),
        (state.name = null),
        (state.alternatePhoneNumber = null),
        (state.phoneNumber = null),
        (state.orderProducts = []),
        (state.paymentReq = {
          id: 0,
          amount: null,
          mode: null,
        });
    },
  },
});

export const {
  addBillingAddress,
  updateBillingAddress,
  updateCustomerInfo,
  updateAddressId,
  updateProductInCart,
  updatePaymentDetails,
  resetBillingAddress,
} = BillingAddressSlice.actions;
export default BillingAddressSlice.reducer;
