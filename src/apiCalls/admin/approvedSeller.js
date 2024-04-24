import { BASE_URL, BASE_URL_LOCAL } from "../common-db";

export const approvedSeller = async (token, id, approvedStatus) => {
  const res = await fetch(
    `${BASE_URL_LOCAL}/api/admin/approve-seller/${id}/${approvedStatus}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    alert(resData.message);
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
