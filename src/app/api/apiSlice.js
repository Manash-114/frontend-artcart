import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  setCredentials,
  logOut,
} from "../../reduxToolkit/features/auth/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL_LOCAL } from "../../apiCalls/common-db";

// Base query setup for fetching with access token and credentials (cookies)
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_LOCAL,
  credentials: "include", // Include credentials (cookies) with every request
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Get token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set token in headers
    }
    return headers;
  },
});

const baseQuery1 = fetchBaseQuery({
  baseUrl: BASE_URL_LOCAL,
  credentials: "include", // Include credentials (cookies) with every request
});

// Base query with re-authentication logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("Initial API call made", result);
  // Check if the status is 403, indicating forbidden access (e.g., token expired)
  if (result?.error?.status === 403) {
    console.log("Access token expired. Attempting to refresh token.");
    // Request a new access token using the refresh token (sent via HTTP-only cookies)
    const refreshResult = await baseQuery1(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    console.log("Refresh token response:", refreshResult);
    // If refresh is successful and we get a new access token
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      const user = api.getState().auth?.user;
      const roles = api.getState().auth?.roles;
      // If user and roles are undefined, log out
      if (!user || !roles) {
        console.log("User or roles missing after refresh, logging out.");
        api.dispatch(logOut());
        return result; // Return the original failed result
      }

      // Store the new access token and update user and roles
      api.dispatch(setCredentials({ accessToken, user, roles }));

      console.log("New access token stored. Retrying original request...");

      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
      if (result?.error?.status === 403) {
        console.log("use to access unauthorized resource Logging out.");
        api.dispatch(logOut());
      }
    } else {
      console.log("Failed to refresh token. Logging out.");
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
