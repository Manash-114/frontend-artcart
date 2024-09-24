import axios from "./axios";
// Function to refresh the access token
const getRefreshToken = async (authState, updateCredentials, handlelogOut) => {
  try {
    const response = await axios.get("/auth/refresh-token", {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;
    // Use a callback function to update the credentials in the Redux store
    updateCredentials({
      ...authState,
      token: newAccessToken,
    });
    return newAccessToken;
  } catch (error) {
    // Check if the error is related to the refresh token expiry or invalidity
    if (error.response.status === 401) {
      // 401 typically indicates that the refresh token has expired or is invalid
      // Call the logout function to log out the user
      console.log(`error with code ${error?.status}`);
      handlelogOut();
    } else {
      // Handle other errors (e.g., network errors)
      throw error;
    }
  }
};

export default getRefreshToken;
