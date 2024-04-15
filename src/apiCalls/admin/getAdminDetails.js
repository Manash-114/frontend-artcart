import { currentUser, signIn } from "../../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "../common-db";

const getAdminDetails = async (tokenFromLocal, navigate, dispatch) => {
  try {
    const res = await fetch(`${BASE_URL_LOCAL}/api/admin/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenFromLocal}`,
      },
    });
    const resData = await res.json();
    if (resData.status != 403) {
      dispatch(signIn(tokenFromLocal));
      dispatch(currentUser(resData));
    } else {
      navigate("/signin");
    }
  } catch (error) {
    console.log("server error", error);
    navigate("/signin");
  }
};

export default getAdminDetails;
