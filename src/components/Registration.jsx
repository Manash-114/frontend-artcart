import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useLocation } from "react-router-dom";
import * as Yup from "yup";
import TextError from "./TextError";
import axios from "axios";
import { BASE_URL_LOCAL } from "../apiCalls/common-db";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

// Reusable FormField component
const FormField = ({ label, name, type }) => (
  <div className="mb-6">
    <label
      htmlFor={name}
      className="block text-lg font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <ErrorMessage name={name} component={TextError} />
  </div>
);

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const role = location.pathname.includes("seller") ? "seller" : "customer";
  const loginLink = role === "seller" ? "/seller/login" : "/login";

  const registerUser = async (values) => {
    try {
      const res = await axios.post(`${BASE_URL_LOCAL}/auth/signup`, values);
      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        toast.success("Registration successful!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values) => {
    setLoading(true);
    values["role"] = role;
    registerUser(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email Required")
      .email("Invalid Email Format"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <div className="h-screen mt-6 bg-cover bg-center flex justify-center items-center bg-gradient-to-r from-black/50 via-black/40 to-black/30 bg-[url('./images/nature.jpg')]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-[650px] h-auto md:h-[500px] bg-white flex flex-col md:flex-row shadow-lg">
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
            onSubmit={onSubmit}
          >
            <Form className="w-full max-w-xs">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Join ArtWork
              </h2>

              <FormField label="Email" name="email" type="email" />
              <FormField label="Password" name="password" type="password" />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 text-white text-sm md:text-lg font-bold py-2 rounded-md ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {loading ? <CircularProgress size={20} /> : "Submit"}
              </button>

              <p className="mt-4 text-gray-600">
                Already a member?{" "}
                <NavLink
                  className="text-green-600 font-bold hover:underline"
                  to={loginLink}
                >
                  Log in
                </NavLink>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
