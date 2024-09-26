import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  approveOrder,
  fetchNewOrders,
} from "../../../reduxToolkit/features/sellerSlice";
import { logOut } from "../../../reduxToolkit/features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const NewOrders = () => {
  const [selectedCouriers, setSelectedCouriers] = useState({}); // State to track selected couriers per row
  const [loadingRows, setLoadingRows] = useState({}); // Track loading state per row
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const handleAllNewOrders = async () => {
    try {
      await dispatch(fetchNewOrders()).unwrap();
    } catch (error) {
      console.log("error:", error);
      if (error === "Invalid refresh token") dispatch(logOut());
    }
  };

  const handleOrderAccept = async (acceptOrder, orderId) => {
    try {
      setLoadingRows((prev) => ({ ...prev, [orderId]: true })); // Set loading state for the specific row
      const res = await dispatch(approveOrder({ data: acceptOrder })).unwrap();
      toast.success("Done.");
    } catch (error) {
      if (error === "Invalid refresh token") dispatch(logOut());
      else toast.error(error);
    } finally {
      setLoadingRows((prev) => ({ ...prev, [orderId]: false })); // Reset loading state after completion
    }
  };

  useEffect(() => {
    handleAllNewOrders();
  }, []);

  const data = useSelector((store) => store.seller.newOrders);

  const handleCourierChange = (orderId, value) => {
    setSelectedCouriers((prev) => ({
      ...prev,
      [orderId]: value, // Track courier selection per orderId
    }));
  };

  const columns = [
    {
      name: "Order ID",
      cell: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "Customer Name",
      cell: (row) => row.billingAddress.customerName,
      sortable: true,
    },
    {
      name: "Address",
      cell: (row) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? "address-popover" : undefined;

        return (
          <div>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Show Address
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div className="text-gray-700">
                  <div>City: {row.address.city}</div>
                  <div>State: {row.address.state}</div>
                  <div>Zip Code: {row.address.pincode}</div>
                  <div>Street: {row.address.address}</div>
                </div>
              </Typography>
            </Popover>
          </div>
        );
      },
    },
    {
      name: "Product",
      cell: (row) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? "product-popover" : undefined;

        return (
          <div>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Show Product
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div className="text-gray-700">
                  {row.productsBelongsToOrder.map((prdct) => (
                    <div
                      key={prdct.products.id}
                      className="border border-gray-300 rounded p-3 my-4"
                    >
                      <h1 className="font-semibold">
                        Product ID: {prdct.products.id}
                      </h1>
                      <h1 className="font-semibold">
                        Product Name: {prdct.products.name}
                      </h1>
                      <h1 className="font-semibold">
                        Quantity: {prdct.productQuantity}
                      </h1>
                    </div>
                  ))}
                </div>
              </Typography>
            </Popover>
          </div>
        );
      },
    },
    {
      name: "Select Courier",
      cell: (row) => {
        const handleChange = (event) => {
          handleCourierChange(row.orderId, event.target.value); // Pass the orderId and selected value
        };
        return (
          <div>
            <select
              id="courier"
              name="courier"
              value={selectedCouriers[row.orderId] || ""} // Select value per orderId
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Courier</option>
              <option value="e-kart">E-Kart</option>
              <option value="ecom-express">Ecom-Express</option>
              <option value="delhivery">Delhivery</option>
            </select>
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedCouriers[row.orderId] || "None"}
            </p>
          </div>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => {
        const handleShip = async () => {
          const courierName = selectedCouriers[row.orderId];
          if (courierName) {
            const orderAccept = {
              orderId: row.orderId,
              courierName: selectedCouriers[row.orderId],
            };
            await handleOrderAccept(orderAccept, row.orderId); // Pass orderId to track loading state
          } else {
            toast.error("Select a courier.");
          }
        };

        return (
          <button
            type="button"
            onClick={handleShip}
            className="border border-gray-400 rounded px-4 py-2 text-sm font-semibold bg-white hover:bg-gray-100 transition-all"
            disabled={loadingRows[row.orderId]} // Disable only the button for the specific row
          >
            {loadingRows[row.orderId] ? (
              <CircularProgress size={20} />
            ) : (
              "Proceed To Ship"
            )}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">New Orders</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          className="text-sm"
          customStyles={{
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "14px",
                backgroundColor: "#f8fafc",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default NewOrders;
