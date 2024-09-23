import React from "react";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:7002/api/signin",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true, // This ensures cookies (including HTTP-only cookies) are sent and stored
      }
    );

    // Store the access token in localStorage (since this is accessible by JavaScript)
    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);

    console.log("Login successful, access token stored in localStorage.");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export default login;
