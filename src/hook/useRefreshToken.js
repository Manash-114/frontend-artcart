import axios from "../apiCalls/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../reduxToolkit/features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const refresh = async () => {
    const resoponse = await axios.get("/auth/refresh-token", {
      withCredentials: true,
    });
    //as well as update state variable
    const data = {
      user: auth?.user,
      accessToken: resoponse.data.accessToken,
      roles: auth?.roles,
    };
    dispatch(setCredentials(data));
    console.log("refresh token " + resoponse.data.accessToken);
    return resoponse.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
