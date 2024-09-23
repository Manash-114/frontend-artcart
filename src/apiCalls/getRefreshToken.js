import axios from "./axios";
// Function to refresh the access token
const getRefreshToken = async (authState, updateCredentials) => {
  try {
    const response = await axios.get("/auth/refresh-token", {
      withCredentials: true,
    });
    const newAccessToken = response.data.accessToken;
    const data = { ...authState };
    console.log(`New access token = ${newAccessToken}`);
    console.log(`old state of data`);
    console.log(data);

    // Use a callback function to update the credentials in the Redux store
    updateCredentials({
      ...authState,
      token: newAccessToken,
    });
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token: ", error);
    throw error;
  }
};

export default getRefreshToken;
