import { BASE_URL, BASE_URL_LOCAL } from "../common-db";

export const getAllCategories = async (token, setCategories) => {
  console.log("token" + token);
  const res = await fetch(`${BASE_URL_LOCAL}/api/category`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    setCategories(resData);
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
