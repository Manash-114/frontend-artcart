// import { updateNewOrders } from "../../reduxToolkit/features/sellerSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const getAllnewOrders = async (token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/seller/new-order`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    console.log("new orders", resData);
    dispatch(updateNewOrders(resData));
  } else {
    alert("Internal server error while getting orders");
  }
};
