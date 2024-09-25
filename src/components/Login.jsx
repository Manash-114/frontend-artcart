import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import axios from "axios";
import { BASE_URL_LOCAL } from "../apiCalls/common-db";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import Header from "./common/Header";

import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useLoginMutation } from "../reduxToolkit/features/auth/authApiSlice";
import { setCredentials } from "../reduxToolkit/features/auth/authSlice";
import { fetchCustomerDetails } from "../reduxToolkit/features/customerSlice";
const initialValues = {
  email: "",
  password: "",
};

const handleAddAddress = (values) => {
  // addAddress(values, token, dispatch);
  console.log(`form data ${JSON.stringify(values)}`);
  dispatch(addCustomerAddress({ data: values }));
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email Required").email("Invalid Email Format"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const url = window.location.href;
  const d = url.split("/");
  const s = d[3];

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName || "/";

  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = async (values) => {
    setLoading(true); // Set loading to true during form submission
    try {
      const res = await axios.post(`${BASE_URL_LOCAL}/auth/signin`, values);
      const authData = {
        token: res.data.token,
        role: res.data.role,
      };
      console.log(`auth data = ${authData}`);
      localStorage.setItem("jwttoken", res.data.token);
      dispatch(signIn(authData));
      // getCurrentUser(res.data.token, navigate, dispatch);
      if (res.data.auth && res.data.role === "ROLE_CUSTOMER") {
        // navigate("/products");
        navigate(from, { replace: true });
      } else if (res.data.auth && res.data.role === "ROLE_SELLER") {
        // localStorage.setItem("jwttoken", res.data.token);
        // dispatch(signIn(res.data.token));
        navigate("/seller");
        // navigate(from, { replace: true });
      } else if (res.data.auth && res.data.role === "ROLE_ADMIN") {
        // localStorage.setItem("jwttoken", res.data.token);
        // dispatch(signIn(res.data.token));
        navigate("/admin/dashboard");
        // navigate(from, { replace: true });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  const handleSubmit = async (values) => {
    try {
      const userData = await login(values).unwrap();
      if (userData?.message) {
        toast.error(userData.message);
      } else {
        const data = {
          accessToken: userData?.accessToken,
          user: {
            email: values.email,
          },
          roles: userData?.roles,
        };
        dispatch(setCredentials(data));
        const role = userData?.roles;
        if (role === "ROLE_SELLER") navigate("/seller");
        else if (role === "ROLE_ADMIN") navigate("/admin");
        else {
          navigate(from, { replace: true });
          const res = await dispatch(fetchCustomerDetails()).unwrap();
          console.log(`customer data `);
          console.log(JSON.stringify(res));
        }
      }
    } catch (er) {
      toast.error("Internal Server error");
      console.log("error");
    }
  };

  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="imageSection">
          <div className="content">
            <h1>Join the largest artwork community</h1>
            <p id="content-p">
              Get free access to millions peice of art, showcase, promote, sell
              & share your work with other members in the ArtWork Community.
            </p>
          </div>
        </div>

        <div className="registrationSection">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <h2 className="title">Log In</h2>
              <p>
                Become an ArtWork.{" "}
                <NavLink
                  to={s === "seller" ? "/seller/signup" : "/signup"}
                  className="log-in"
                >
                  Join
                </NavLink>
              </p>
              <div className="form-control">
                <label htmlFor="email">Email-</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component={TextError} />
              </div>

              <button type="submit">
                {isLoading ? <CircularProgress size={20} /> : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: 97vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.365), rgba(0, 0, 0, 0.5)),
    url("./images/nature.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 900px;
    height: 670px;
    background-color: white;
    display: flex;
  }
  .imageSection {
    flex: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.42)),
      url("./images/ship.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
  }
  .content {
    margin: 30px;
    height: 60%;
  }
  h1 {
    width: 80%;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.2;
    color: #fff;
    margin-bottom: 30px;
  }
  #content-p {
    font-size: 20px;
    color: #fdfdfde5;
  }
  .registrationSection {
    background: #f8f8fef3;

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
    border-radius: 1px solid black;
  }

  .title {
    color: #320808;
    font-weight: bold;
    font-size: 35px;
  }
  label {
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }
  input[type="password"],
  input[type="email"] {
    display: block;
    width: 300px;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.4;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .form-control {
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    height: 40px;
    background-color: #18a021;
    border: 1px solid #ccc;
    color: white;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .log-in {
    font-weight: bold;
    color: #26c029;
    text-decoration: none;
  }
  .error {
    color: red;
  }
`;
