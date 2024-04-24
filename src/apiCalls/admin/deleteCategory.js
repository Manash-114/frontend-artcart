import { BASE_URL, BASE_URL_LOCAL } from "../common-db";

export const deleteCategory = async (token, categoryId) => {
  const res = await fetch(
    `${BASE_URL_LOCAL}/api/admin/category/${categoryId}`,
    {
      method: "DELETE",
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
