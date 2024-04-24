import { updateAddress } from "../../reduxToolkit/features/authSlice";
import {
  updateAllNotDeliverdOrders,
  updateAllOrders,
} from "../../reduxToolkit/features/customerSlice";
import { BASE_URL_LOCAL } from "../common-db";
export const getAllUndeliveredOrders = async (token, dispatch) => {
  const res = await fetch(
    `${BASE_URL_LOCAL}/api/customer/un-delivered-orders`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const resData = await res.json();
    dispatch(updateAllNotDeliverdOrders(resData));
  } else {
    alert("Internal server error while fetching orders");
  }
};
