import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAddressId,
  addBillingAddress,
  updateCustomerInfo,
} from "../../reduxToolkit/features/productList/BillingAddressSlice";
import { addCustomerAddress } from "../../reduxToolkit/features/customerSlice";
import { logOut } from "../../reduxToolkit/features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";

const BillAddress = ({ handleDeliverClick }) => {
  const dispatch = useDispatch();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const selectedAddressId = useSelector(
    (store) => store.billingAddress.addressId
  );
  const { name, phoneNumber, alternatePhoneNumber } = useSelector(
    (store) => store.billingAddress
  );

  const initialAddressValues = {
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  };

  const initialCustomerValues = {
    customerName: name ? name : "",
    phoneNumber: phoneNumber ? phoneNumber : "",
    alternatePhoneNumber: alternatePhoneNumber ? alternatePhoneNumber : "",
  };

  const addressData = useSelector((store) => store.customer.address);
  const { status } = useSelector((store) => store.customer);

  const addressValidationSchema = yup.object({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City/District/Town is required"),
    state: yup.string().required("State is required"),
    locality: yup.string().required("Locality is required"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .length(6, "Pincode must be 6 digits"),
  });

  const customerValidationSchema = yup.object({
    customerName: yup.string().required("Customer Name is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    alternatePhoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Alternate phone number must be 10 digits")
      .nullable(),
  });

  const onSubmitAddress = async (values) => {
    setShowAddressForm(false);
    try {
      await dispatch(addCustomerAddress({ data: values })).unwrap();
      toast.success("Address added successfully");
    } catch (error) {
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      }
    }
  };

  const onSubmitCustomerDetails = (values) => {
    if (selectedAddressId) {
      dispatch(
        updateCustomerInfo({
          name: values.customerName,
          phoneNumber: values.phoneNumber,
          alternatePhoneNumber: values.alternatePhoneNumber,
        })
      );
      handleDeliverClick();
    } else {
      toast.error("Please select an address before proceeding.");
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleAddressSelect = (id) => {
    dispatch(updateAddressId(id));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center py-6 px-4 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row space-x-6 w-full max-w-4xl">
          {/* Left Section - Your Addresses */}
          <div className="md:w-1/2 w-full bg-white shadow-md p-6 rounded-lg">
            {addressData?.length > 0 ? (
              <>
                <Typography variant="h6" className="text-gray-800 mb-4">
                  Select Address
                </Typography>
                <RadioGroup
                  value={selectedAddressId || ""}
                  onChange={(event) => handleAddressSelect(event.target.value)}
                >
                  {addressData.map((ad) => (
                    <div
                      key={ad.id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-2 border"
                    >
                      <FormControlLabel
                        value={ad.id}
                        control={<Radio />}
                        label={`${ad.locality}, ${ad.city}, ${ad.state}, ${ad.pincode}`}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <Typography variant="h6" className="text-red-500">
                You don't have any address. Please add a new address.
              </Typography>
            )}

            {/* Add New Address Button */}
            {!showAddressForm && (
              <Button
                variant="contained"
                onClick={() => setShowAddressForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white mt-4 w-full"
              >
                {status === "loading" ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Add New Address"
                )}
              </Button>
            )}

            {/* New Address Form */}
            {showAddressForm && (
              <div className="mt-4">
                <Formik
                  initialValues={initialAddressValues}
                  validationSchema={addressValidationSchema}
                  onSubmit={onSubmitAddress}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-4">
                      <Field
                        name="address"
                        as={TextField}
                        label="Address"
                        multiline
                        rows={2}
                        fullWidth
                        error={touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                      />
                      <div className="flex space-x-4">
                        <Field
                          name="city"
                          as={TextField}
                          label="City"
                          fullWidth
                          error={touched.city && !!errors.city}
                          helperText={touched.city && errors.city}
                        />
                        <Field
                          as="select"
                          name="state"
                          className="w-full p-2 border rounded-md"
                        >
                          {indianStates.map((state) => (
                            <option value={state} key={state}>
                              {state}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <Field
                        name="pincode"
                        as={TextField}
                        label="Pincode"
                        fullWidth
                        error={touched.pincode && !!errors.pincode}
                        helperText={touched.pincode && errors.pincode}
                      />
                      <Field
                        name="locality"
                        as={TextField}
                        label="Locality"
                        fullWidth
                        error={touched.locality && !!errors.locality}
                        helperText={touched.locality && errors.locality}
                      />
                      <div className="space-y-2">
                        <Button
                          type="submit"
                          variant="contained"
                          className="bg-blue-500 hover:bg-blue-600 w-full mt-4 text-white"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setShowAddressForm(false)}
                          variant="outlined"
                          className="w-full text-blue-500 mt-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>

          {/* Right Section - Customer Information */}
          <div className="md:w-1/2 w-full bg-white shadow-md p-6 rounded-lg mt-6 md:mt-0">
            {selectedAddressId && (
              <>
                <Typography
                  variant="h6"
                  className="text-gray-800 mb-4 text-center"
                >
                  Contact Information
                </Typography>
                <Formik
                  initialValues={initialCustomerValues}
                  validationSchema={customerValidationSchema}
                  onSubmit={onSubmitCustomerDetails}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-4">
                      <Field
                        name="customerName"
                        as={TextField}
                        label="Customer Name"
                        fullWidth
                        error={touched.customerName && !!errors.customerName}
                        helperText={touched.customerName && errors.customerName}
                      />
                      <Field
                        name="phoneNumber"
                        as={TextField}
                        label="Phone Number"
                        fullWidth
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                      <Field
                        name="alternatePhoneNumber"
                        as={TextField}
                        label="Alternate Phone Number"
                        fullWidth
                        error={
                          touched.alternatePhoneNumber &&
                          !!errors.alternatePhoneNumber
                        }
                        helperText={
                          touched.alternatePhoneNumber &&
                          errors.alternatePhoneNumber
                        }
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-green-500 hover:bg-green-600 w-full mt-4 text-white"
                      >
                        Deliver Here
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillAddress;
