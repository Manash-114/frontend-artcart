import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Tab, Box } from "@mui/material";
import React, { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import BillAddress from "./BillAddress";
import OrderDetail from "./OrderDetail";
import PaymentDetails from "./PaymentDetails";
import { useDispatch, useSelector } from "react-redux";
import { updateProductInCart } from "../../reduxToolkit/features/productList/BillingAddressSlice";
import Header from "../common/Header";
import Footer2 from "../common/Footer2";

const BillingPage = () => {
  const [value, setValue] = useState("1");
  const [visited1, setVisited1] = useState(true);
  const [visited2, setVisited2] = useState(false);
  const [visited3, setVisited3] = useState(false);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeliverClick = () => {
    setValue("2");
    setVisited2(true);
  };

  const productsInCart = useSelector((state) =>
    state.cart.cartItems.map((item) => ({
      productId: item.id,
      cartQuantity: item.cartQuantity,
    }))
  );

  const handleDeliverClick2 = () => {
    productsInCart.forEach((p) =>
      dispatch(
        updateProductInCart({
          productId: p.productId,
          quantity: p.cartQuantity,
        })
      )
    );
    setValue("3");
    setVisited3(true);

    const paymentData = { amount: 123 }; // Replace with actual payment details
    generatePaymentWithRazopay(paymentData, token, dispatch); // Make sure this function is defined elsewhere
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-14">
      {/* Tab Container */}
      <TabContext value={value}>
        <Box className="border-b border-gray-300 bg-gradient-to-r from-blue-50 via-yellow-50 to-indigo-50 p-6 rounded-md max-w-4xl mx-auto mt-4">
          <TabList
            onChange={handleChange}
            aria-label="billing steps"
            className="flex justify-center flex-wrap"
          >
            <Tab
              className="mx-4 capitalize"
              icon={<LocationOnIcon />}
              label="Billing Address"
              value="1"
              disabled={!visited1}
            />
            <Tab
              className="mx-4 capitalize"
              icon={<DescriptionIcon />}
              label="Order Details"
              value="2"
              disabled={!visited2}
            />
            <Tab
              className="mx-4 capitalize"
              icon={<PaymentIcon />}
              label="Payment"
              value="3"
              disabled={!visited3}
            />
          </TabList>
        </Box>

        {/* Tab Panels */}
        <div className="p-8 max-w-4xl mx-auto">
          <TabPanel value="1">
            <BillAddress handleDeliverClick={handleDeliverClick} />
          </TabPanel>
          <TabPanel value="2">
            <OrderDetail />
            <Button
              variant="contained"
              onClick={handleDeliverClick2}
              className="bg-orange-500 hover:bg-orange-600 w-full sm:w-56 h-10 mt-4 text-white mx-auto block"
            >
              Confirm order
            </Button>
          </TabPanel>
          <TabPanel value="3">
            <PaymentDetails />
          </TabPanel>
        </div>
      </TabContext>
    </div>
  );
};

export default BillingPage;
