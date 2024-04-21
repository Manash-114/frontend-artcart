import { currentUser, signIn } from "../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "./common-db";

const getCurrentUser = async (tokenFromLocal, navigate, dispatch) => {
  try {
    const url = window.location.href;
    const d = url.split("/");
    const s = d[3];
    console.log(s);
    let res = null;

    if (s === "admin") {
      res = await fetch(`${BASE_URL_LOCAL}/api/admin/profile`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenFromLocal}`,
        },
      });
    } else if (s === "seller") {
      res = await fetch(`${BASE_URL_LOCAL}/api/seller`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenFromLocal}`,
        },
      });
    }

    const resData = await res.json();
    if (resData.status != 403) {
      dispatch(signIn(tokenFromLocal));
      dispatch(currentUser(resData));
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.log("server error", error);
    alert("server error");
    navigate("/login");
  }
};

export default getCurrentUser;
