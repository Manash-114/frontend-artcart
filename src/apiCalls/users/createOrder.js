import { updateAddress } from "../../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "../common-db";
import toast, { Toaster } from "react-hot-toast";
export const createOrder = async (data, token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/customer/order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 201) {
    const resData = await res.json();
    toast.success("Order done Successfully!");
    console.log(resData);
    //reset all billing address details
    // dispatch(updateAddress(resData));
  } else {
    alert("Internal server error while creating order");
  }
};
