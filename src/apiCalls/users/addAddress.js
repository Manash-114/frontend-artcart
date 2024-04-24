import { updateAddress } from "../../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const addAddress = async (data, token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/customer/new-address`, {
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
    dispatch(updateAddress(resData));
  } else {
    alert("Internal server error while adding addresss");
  }
};
