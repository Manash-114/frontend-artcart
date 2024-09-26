import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCredentials } from "./auth/authSlice";
import getAxiosPrivate from "../../apiCalls/getAxiosPrivate";
import getRefreshToken from "../../apiCalls/getRefreshToken";

// Async thunk to fetch customer details
export const fetchCustomerDetails = createAsyncThunk(
  "customerSlice/fetchCustomerDetails",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.get("/api/customer");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching customer");
    }
  }
);

export const addCustomerAddress = createAsyncThunk(
  "customerSlice/addCustomerAddress",
  async ({ data }, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.post(
        "/api/customer/new-address",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching customer");
    }
  }
);
// Async thunk to update customer details (name and address)
export const updateCustomerDetails = createAsyncThunk(
  "customerSlice/updateCustomerDetails",
  async ({ customerId, name, address }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address }),
      });
      if (!response.ok) {
        throw new Error("Failed to update customer details.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Read all delivered orders (you can add any fetching logic, e.g., API call)
export const fetchAllDeliveredOrders = createAsyncThunk(
  "customerSlice/fetchAllDeliveredOrders",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.get("/api/customer/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);
export const fetchAllUnDeliveredOrders = createAsyncThunk(
  "customerSlice/fetchAllUnDeliveredOrders",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.get(
        "/api/customer/un-delivered-orders"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);

// Create a new order (Delivered or Not Delivered)
export const createOrder = createAsyncThunk(
  "customerSlice/createOrder",
  async ({ data }, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.post("/api/customer/order", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching customer");
    }
  }
);

// Update an order by ID
export const updateOrder = createAsyncThunk(
  "customerSlice/updateOrder",
  async ({ orderId, updatedOrder }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
      if (!response.ok) {
        throw new Error("Failed to update order.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete an order by ID
export const deleteOrder = createAsyncThunk(
  "customerSlice/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete order.");
      }
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// online payment request
export const onlinePaymentRequest = createAsyncThunk(
  "customerSlice/onlinePaymentRequest",
  async ({ data }, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    const authState = store.auth; // Get current auth state
    const updateCredentials = (newAuthData) => {
      const updatAuth = {
        user: newAuthData.user,
        accessToken: newAuthData.token,
        roles: newAuthData.roles,
      };
      dispatch(setCredentials(updatAuth));
    };

    // Pass authState and refreshToken to getAxiosPrivate
    const axiosPrivate = getAxiosPrivate(authState, () =>
      getRefreshToken(authState, updateCredentials)
    );

    try {
      // Get the Axios instance with interceptors
      const response = await axiosPrivate.post(
        "/api/customer/order/razor-payment",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders");
    }
  }
);

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    name: null,
    address: null,
    allNotDeliveredOrders: [],
    allDeliveredOrders: [],
    status: "idle", // To handle loading states
    error: null, // To handle error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all delivered orders
      .addCase(fetchAllDeliveredOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDeliveredOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeliveredOrders = action.payload;
      })
      .addCase(fetchAllDeliveredOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllUnDeliveredOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUnDeliveredOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allNotDeliveredOrders = action.payload;
      })
      .addCase(fetchAllUnDeliveredOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle creating a new order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(`res from thunk`);
        console.log(action.payload);
        // if (action.payload.isDelivered) {
        //   state.allDeliveredOrders.push(action.payload);
        // } else {
        //   state.allNotDeliveredOrders.push(action.payload);
        // }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle updating an order
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, isDelivered } = action.payload;
        if (isDelivered) {
          state.allDeliveredOrders = state.allDeliveredOrders.map((order) =>
            order.id === id ? action.payload : order
          );
        } else {
          state.allNotDeliveredOrders = state.allNotDeliveredOrders.map(
            (order) => (order.id === id ? action.payload : order)
          );
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle deleting an order
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeliveredOrders = state.allDeliveredOrders.filter(
          (order) => order.id !== action.payload
        );
        state.allNotDeliveredOrders = state.allNotDeliveredOrders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }) // Handle fetching customer details
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.address = action.payload.address;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCustomerDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomerDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.address = action.payload.address;
      })
      .addCase(updateCustomerDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCustomerAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCustomerAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(`data from thunk`);
        console.log(action.payload);
        state.address = [...state.address, action.payload];
      })
      .addCase(addCustomerAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(onlinePaymentRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(onlinePaymentRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(`data from thunk online`);
        console.log(action.payload);
        // state.address = [...state.address, action.payload];
      })
      .addCase(onlinePaymentRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
