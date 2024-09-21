import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signin: false,
    currentUser: {},
    token: "",
    productCategory: [],
    orderCreate: false,
    role: "",
  },
  reducers: {
    signIn: (state, action) => {
      state.signin = true;
      state.token = action.payload.token;
      console.log(`role = ${action.payload.role}`);
      state.role = action.payload.role;
    },
    signUp: (state, action) => {
      console.log("sign up ", action.payload);
    },
    currentUser: (state, action) => {
      state.currentUser = action.payload;
      state.role = action.payload.role;
    },
    signout: (state, action) => {
      state.signin = false;
      state.currentUser = {};
      localStorage.removeItem("jwttoken");
      state.token = "";
      state.role = "";
    },
    updateAddress: (state, action) => {
      const { address } = state.currentUser;
      address.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    addNewCategory: (state, action) => {
      state.productCategory.push(action.payload);
    },
    orderSuccess: (state, action) => {
      state.orderCreate = action.payload;
    },
  },
});

export const {
  signIn,
  signUp,
  currentUser,
  signout,
  updateAddress,
  updateCategory,
  addNewCategory,
  orderSuccess,
} = authSlice.actions;
export default authSlice.reducer;
