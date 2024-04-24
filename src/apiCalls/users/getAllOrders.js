import { updateAddress } from "../../reduxToolkit/features/authSlice";
import { updateAllOrders } from "../../reduxToolkit/features/customerSlice";
import { BASE_URL_LOCAL } from "../common-db";
export const getAllOrders = async (token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/customer/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    dispatch(updateAllOrders(resData));
  } else {
    alert("Internal server error while fetching orders");
  }
};
