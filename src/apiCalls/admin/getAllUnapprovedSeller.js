import { updateSellerRequest } from "../../reduxToolkit/features/adminSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const getAllUnapprovedSeller = async (token, dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/admin/all-unapproved-seller`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    dispatch(updateSellerRequest(resData));
    // setUnapprovedSellerList(resData);
    // setCategories(resData);
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
