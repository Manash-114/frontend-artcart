import { BASE_URL } from "../common-db";

export const getAllCategories = async (token, setCategories) => {
  const res = await fetch(`${BASE_URL}/api/admin/category`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    setCategories(resData);
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
