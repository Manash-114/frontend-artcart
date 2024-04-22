import { currentUser, signIn } from "../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "./common-db";

const getCurrentUser = async (tokenFromLocal, navigate, dispatch) => {
  try {
    const url = window.location.href;
    const d = url.split("/");
    const s = d[3];
    console.log("url ", s);
    let res = null;

    if (s === "" && tokenFromLocal === null) {
      navigate("/");
      return;
    }

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
    } else {
      res = await fetch(`${BASE_URL_LOCAL}/api/customer`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenFromLocal}`,
        },
      });
    }

    const resData = await res.json();
    if (resData.status == 403) {
      navigate("/login");
    } else {
      console.log("data" + resData);
      dispatch(signIn(tokenFromLocal));
      dispatch(currentUser(resData));
    }
  } catch (error) {
    console.log("server error", error);
    alert("server error");
    navigate("/login");
  }
};

export default getCurrentUser;
