import { currentUser, signIn } from "../reduxToolkit/features/authSlice";
import { BASE_URL_LOCAL } from "./common-db";

const getUserFromToken = async (tokenFromLocal, dispatch) => {
  try {
  } catch (error) {
    console.log("server error", error);
    // alert("server error");
    // navigate("/login");
  }
};

export default getUserFromToken;
