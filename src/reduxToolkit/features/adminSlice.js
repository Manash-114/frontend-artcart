import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAxiosPrivate from "../../apiCalls/getAxiosPrivate";
import getRefreshToken from "../../apiCalls/getRefreshToken";
import { logOut, setCredentials } from "./auth/authSlice";

// Async Thunks for API calls

// Fetch new seller requests
export const fetchNewSeller = createAsyncThunk(
  "admin/fetchNewSeller",
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
        "/api/admin/all-unapproved-seller"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching seller");
    }
  }
);

// Fetch all sellers
export const fetchAllSeller = createAsyncThunk(
  "admin/fetchAllSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/allSellers"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch all sellers.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Approve a seller
export const approveSeller = createAsyncThunk(
  "admin/approveSeller",
  async ({ id, approveStatus }, { getState, dispatch, rejectWithValue }) => {
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
      const response = await axiosPrivate.put(
        `/api/admin/approve-seller/${id}/${approveStatus}`
      );
      return {
        response: 200,
        id: id,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error approve seller");
    }
  }
);

// Admin Slice
const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    newSellerRequest: [],
    allSeller: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchNewSeller
    builder
      .addCase(fetchNewSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewSeller.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fetch new seller");
        console.log(action.payload);
        state.newSellerRequest = action.payload;
      })
      .addCase(fetchNewSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchAllSeller
    builder
      .addCase(fetchAllSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.allSeller = action.payload;
      })
      .addCase(fetchAllSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle approveSeller
    builder
      .addCase(approveSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.newSellerRequest = state.newSellerRequest.filter(
          (seller) => seller.id !== action.payload.id
        );
      })
      .addCase(approveSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
