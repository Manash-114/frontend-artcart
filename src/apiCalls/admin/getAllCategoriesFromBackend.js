import { updateCategory } from "../../reduxToolkit/features/authSlice";
import { BASE_URL, BASE_URL_LOCAL } from "../common-db";

export const getAllCategoriesFromBackend = async (dispatch) => {
  const res = await fetch(`${BASE_URL_LOCAL}/public/category`, {
    method: "GET",
  });

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    dispatch(updateCategory(resData));
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
