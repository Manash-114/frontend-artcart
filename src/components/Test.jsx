import React from "react";
import login from "../apiCalls/test/login";
import axios from "axios";
import { useGetUserQuery } from "../reduxToolkit/features/user/userApiSlice";

const Test = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Test</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.map((data) => (
            <li key={data}>{data}</li> // Adjust according to your user object structure
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Test;
