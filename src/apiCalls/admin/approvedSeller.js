import toast from "react-hot-toast";
import { BASE_URL, BASE_URL_LOCAL } from "../common-db";
import { approveSeller } from "../../reduxToolkit/features/adminSlice";

export const approvedSeller = async (
  token,
  id,
  approvedStatus,
  navigate,
  dispatch
) => {
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
    toast.success(resData.message);
    dispatch(approveSeller(id));
  } else {
    alert("Internal server error");
  }

  //   setCategories(res);
};
