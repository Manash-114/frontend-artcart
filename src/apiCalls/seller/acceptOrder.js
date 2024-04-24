import { acceptOrderAndUpdate } from "../../reduxToolkit/features/sellerSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const acceptOrder = async (data, token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/seller/accept-order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    // setIsLoading(false);
    // alert("Product add successfully");
    console.log(resData);
    dispatch(acceptOrderAndUpdate(data.orderId));
  } else {
    alert("Internal server error while accept order");
  }
};
