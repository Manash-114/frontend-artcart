import { addNewCategory } from "../../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "../common-db";

export const saveCategory = async (token, cName, dispatch) => {
  const data = {
    name: cName,
  };
  const res = await fetch(`${BASE_URL_LOCAL}/api/admin/category`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    dispatch(addNewCategory(resData.data));
    alert(resData.message);
  } else {
    alert("Internal server error while adding category");
  }

  //   setCategories(res);
};
