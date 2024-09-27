import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../reduxToolkit/features/auth/authApiSlice";
import {
  logOut,
  setCredentials,
} from "../reduxToolkit/features/auth/authSlice";
import { fetchCustomerDetails } from "../reduxToolkit/features/customerSlice";

const initialValues = {
  email: "",
  password: "",
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
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Fix typo from pathName to pathname
  console.log(`from url ${from}`);
  const [login, { isLoading }] = useLoginMutation();

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
        if (role === "ROLE_SELLER") {
          if (from == "/") navigate("/seller");
          else navigate(from);
        } else if (role === "ROLE_ADMIN") {
          if (from == "/") navigate("/admin");
          else navigate(from);
        } else {
          navigate(from, { replace: true }); // Redirect to the last visited page
          await dispatch(fetchCustomerDetails()).unwrap();
        }
      }
    } catch (error) {
      toast.error("Internal Server Error");
      if (error == "Invalid refresh token") dispatch(logOut());
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center bg-gradient-to-r from-black/50 via-black/40 to-black/30 bg-[url('./images/nature.jpg')]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-[700px] h-auto md:h-[500px] mt-10 bg-white flex flex-col md:flex-row shadow-lg">
        <div className="flex-1 bg-cover bg-center flex items-center bg-[url('./images/ship.jpg')] bg-gradient-to-r from-black/50 to-black/40">
          <div className="m-8 text-white">
            <h1 className="text-2xl md:text-4xl font-bold uppercase mb-4 md:mb-8">
              Join the largest artwork community
            </h1>
            <p className="text-sm md:text-lg">
              Get free access to millions of pieces of art, showcase, promote,
              sell & share your work with other members in the ArtWork
              Community.
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white flex flex-col items-center py-8 px-4 md:py-16 md:px-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-full max-w-xs">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Log In
              </h2>
              <p className="text-gray-600 mb-4 md:mb-8">
                Become an ArtWork member.{" "}
                <NavLink
                  to="/signup"
                  className="text-green-600 font-bold hover:underline"
                >
                  Join
                </NavLink>
              </p>

              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm md:text-lg font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm md:text-lg font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white text-sm md:text-lg font-bold py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                {isLoading ? <CircularProgress size={20} /> : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
