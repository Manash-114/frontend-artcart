import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { saveSellerDetails } from "../../reduxToolkit/features/sellerSlice";
import Spinner from "../common/Spinner";
import TextError from "../TextError";

const initialValues = {
  sellerName: "",
  sellerPhone: "",
  aadhaarNo: "",
};

const validationSchema = Yup.object({
  sellerName: Yup.string().required("Please Enter your name"),
  aadhaarNo: Yup.string()
    .required("Please Enter Aadhaar Number")
    .min(12, "Aadhaar Number must be at least 12 numbers"),
});

const SellerRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.seller);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleAadhaarImageChange = (e) => {
    const file = e.target.files[0];
    setAadhaarImage(file);
  };

  const onSubmitHandle = async (values) => {
    const ob = `{
        "name" : "${values.sellerName}",
        "aadhaarNo" : "${values.aadhaarNo}",
        "phoneNumber" :"${values.sellerPhone}"
      }`;
    const data1 = new FormData();
    data1.append("aadhaarImage", aadhaarImage);
    data1.append("profileImage", profileImage);
    data1.append("data", ob);

    try {
      const res = await dispatch(saveSellerDetails({ data: data1 })).unwrap();
    } catch (error) {
      toast.error("Internal Server error. Please try again after some time.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center bg-gray-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div
          className="flex-1 bg-cover bg-center md:h-auto h-64"
          style={{ backgroundImage: `url('./images/ship.jpg')` }}
        >
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold">
              Join the largest artwork community
            </h1>
            <p className="mt-4">
              Get free access to millions of pieces of art, showcase, promote,
              sell, & share your work with other members in the community.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 bg-gray-50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandle}
          >
            <Form className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Complete your profile
              </h2>

              <div className="form-control">
                <label
                  htmlFor="sellerName"
                  className="text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <Field
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                />
                <ErrorMessage name="sellerName" component={TextError} />
              </div>

              <div className="form-control">
                <label
                  htmlFor="sellerPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone No.*
                </label>
                <Field
                  type="tel"
                  id="sellerPhone"
                  name="sellerPhone"
                  pattern="^\+91[0-9]{10}$"
                  title="Please enter a valid phone number starting with +91 and followed by 10 digits"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                />
                <ErrorMessage name="sellerPhone" component={TextError} />
              </div>

              <div className="form-control">
                <label
                  htmlFor="sellerImage"
                  className="text-sm font-medium text-gray-700"
                >
                  Profile Image*
                </label>
                <Field
                  type="file"
                  id="sellerImage"
                  name="sellerImage"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleProfileImageChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                />
                <ErrorMessage name="sellerImage" component={TextError} />
              </div>

              <div className="form-control">
                <label
                  htmlFor="aadhaarImage"
                  className="text-sm font-medium text-gray-700"
                >
                  Aadhaar Image*
                </label>
                <Field
                  type="file"
                  id="aadhaarImage"
                  name="aadhaarImage"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleAadhaarImageChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                />
                <ErrorMessage name="aadhaarImage" component={TextError} />
              </div>

              <div className="form-control">
                <label
                  htmlFor="aadhaarNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Aadhaar Number
                </label>
                <Field
                  type="text"
                  id="aadhaarNo"
                  name="aadhaarNo"
                  pattern="[0-9]{12}"
                  title="Aadhaar number must be 12 digits"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                />
                <ErrorMessage name="aadhaarNo" component={TextError} />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Submit
              </button>

              {loading && (
                <div className="mt-4">
                  <Spinner />
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
