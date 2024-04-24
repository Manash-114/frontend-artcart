import { BASE_URL, BASE_URL_LOCAL } from "../common-db";

export const getAllUnapprovedSeller = async (
  token,
  setUnapprovedSellerList
) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/admin/all-unapproved-seller`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    setUnapprovedSellerList(resData);
    // setCategories(resData);
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
