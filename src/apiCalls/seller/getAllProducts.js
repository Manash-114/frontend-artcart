// import {
//   updateAllProduct,
//   updateNewOrders,
// } from "../../reduxToolkit/features/sellerSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const getAllProducts = async (token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/seller/all-products`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    dispatch(updateAllProduct(resData));
  } else {
    alert("Internal server error while getting products");
  }
};
