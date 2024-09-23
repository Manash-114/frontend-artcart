import React from "react";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../reduxToolkit/features/auth/authSlice";
import { useSelector } from "react-redux";

const Welcome = () => {
  const token = useSelector(selectCurrentToken);
  //   const token = "";
  return (
    <div>
      {token && <p>Token = {token}</p>}
      <Link to={"/user"}>To user List</Link>
    </div>
  );
};

export default Welcome;
