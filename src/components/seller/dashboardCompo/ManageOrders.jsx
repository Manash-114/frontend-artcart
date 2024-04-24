import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllnewOrders } from "../../../apiCalls/seller/getAllnewOrders";
import { acceptOrder } from "../../../apiCalls/seller/acceptOrder";

const ManageOrders = () => {
  // const [orders, setOrders] = useState([]); // State to hold fetched order data
  // const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  // const [error, setError] = useState(null); // State for error handling
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    getAllnewOrders(token, dispatch);
  }, []);

  const data = useSelector((store) => store.seller.newOrders);
  const address = data.map((row) => row.address);
  const columns = [
    {
      name: "Order id",
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
        const [anchorEl1, setAnchorEl1] = useState(null);
        //   const [anchorEl2, setAnchorEl2] = useState(null)
        const handleClick1 = (event) => {
          setAnchorEl1(event.currentTarget);
        };
        const handleClick2 = (event) => {
          // setAnchorEl2(event.currentTarget);
        };

        const handleClose1 = () => {
          setAnchorEl1(null);
        };
        //   const handleClose2 = () => {
        //     // setAnchorEl2(null);
        //   };

        const open1 = Boolean(anchorEl1);
        //   const open2 = Boolean(anchorEl2);

        const id1 = open1 ? "simple-popover" : undefined;
        //   const id2 = open2 ? 'normal-popover' : undefined;

        return (
          <div className="mt-4">
            <Button
              aria-describedby={id1}
              variant="contained"
              onClick={handleClick1}
            >
              Show Address
            </Button>
            <Popover
              id={id1}
              open={open1}
              anchorEl={anchorEl1}
              onClose={handleClose1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div>
                  <div>City: {row.address.city}</div>
                  <div>State: {row.address.state}</div>
                  <div>Zip Code: {row.address.zipCode}</div>
                  <div>Street: {row.address.street}</div>
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
        // const [anchorEl1, setAnchorEl1] = useState(null)
        const [anchorEl2, setAnchorEl2] = useState(null);
        // const handleClick1 = (event) => {
        //     setAnchorEl1(event.currentTarget);

        //   };
        const handleClick2 = (event) => {
          setAnchorEl2(event.currentTarget);
        };

        //   const handleClose1 = () => {
        //     setAnchorEl1(null);
        //   };
        const handleClose2 = () => {
          setAnchorEl2(null);
        };

        //   const open1 = Boolean(anchorEl1);
        const open2 = Boolean(anchorEl2);

        //   const id1 = open1 ? 'simple-popover' : undefined;
        const id2 = open2 ? "normal-popover" : undefined;

        return (
          <div className="mt-4">
            <Button
              aria-describedby={id2}
              variant="contained"
              onClick={handleClick2}
            >
              Show Product
            </Button>
            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorEl2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div>
                  <div>
                    {row.productsBelongsToOrder.map((prdct) => (
                      <div className="border border-3 p-3 m-4">
                        <h1 className="font-bold">
                          Product Id: {prdct.products.id}
                        </h1>
                        <h1 className="font-bold">
                          Product Name: {prdct.products.name}
                        </h1>

                        <h1 className="font-bold">
                          Product Quantity: {prdct.productQuantity}
                        </h1>
                      </div>
                    ))}
                  </div>
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
          setSelectedValue(event.target.value);
        };
        return (
          <div className="mt-5 p-3">
            <select
              id="courier"
              name="courier"
              value={selectedValue}
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Courier</option>
              <option value="e-kart">E-Kart</option>
              <option value="ecom-express">Ecom-Express</option>
              <option value="delhivery">Delhivery</option>
            </select>
            <p className="mt-2">You selected: {selectedValue}</p>
          </div>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => {
        const [dis, SetDis] = useState("");

        const handleClick = () => {
          SetDis("disabled");
          console.log(dis);
          console.log("shipped");
          //send data to backend

          const orderAccept = {
            orderId: row.orderId,
            courierName: selectedValue,
          };

          console.log("order accept data", orderAccept);
          acceptOrder(orderAccept, token, dispatch);
        };

        //
        return (
          <button
            type="button"
            className={`border border-2 rounded-md p-2 hover:bg-gray-100 font-bold ${
              dis ? "cursor-not-allowed" : ""
            }`}
            onClick={handleClick}
            disabled={dis} // Disabling the button
          >
            Proceed To Ship
          </button>
        );
      },
    },
  ];

  // Function to fetch order data from the API using Axios
  // const fetchOrders = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get('https://fakestoreapi.com/carts'); // Replace with your API URL
  //     setOrders(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Fetch orders on component mount
  // useEffect(() => {
  //   fetchOrders();
  //   console.log(address);
  // }, []);

  return <DataTable columns={columns} data={data} pagination />;
};

export default ManageOrders;

// <div>
//           {orders.map((order) => (
//             <OrderRow key={order.id}>
//               <OrderInfo>
//                 <OrderTime>{order.date}</OrderTime>
//                 {/* <CustomerName>{order.customerName}</CustomerName> */}
//                 {/* <Address>{order.address}</Address> */}
//                 {order.products.map((product) => (
//                   <ProductDetails key={product.productId}>
//                     <p>{product.productId} (Qty: {product.quantity})</p>
//                   </ProductDetails>
//                 ))}
//                 <button style={{ width: "70px", backgroundColor: "blue" }}><TiTick /></button>
//                 <button style={{ width: "70px", backgroundColor: "red" }}><RxCross1 /></button>
//                 {/* Add more fields as needed */}
//               </OrderInfo>
//               {/* Add buttons or actions related to the order */}
//             </OrderRow>
//           ))}
//         </div>

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TiTick } from "react-icons/ti";
// import { RxCross1 } from "react-icons/rx";

// // ManageOrders component
// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchOrders = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get('https://fakestoreapi.com/carts'); // Replace with your API URL
//       setOrders(response.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div  className=" h-600 bg-gray-100">
//       {isLoading ? (
//         <p className="text-center py-4">Loading orders...</p>
//       ) : error ? (
//         <p className="text-center py-4 text-red-500">Error fetching orders: {error}</p>
//       ) : (
//         <div style={{ overflowY: 'scroll' }} className="flex flex-col">
//           {orders.map((order) => (
//             <div key={order.id} className="flex items-center border-b border-gray-300 p-4 rounded-md shadow-sm">
//               <div className="flex-grow">
//                 <p className="text-lg font-medium mb-2">{order.date}</p>
//                 {/* Add product details here */}
//                 <div className="flex flex-wrap">
//                   {order.products.map((product) => (
//                     <div key={product.productId} className="mr-4 mb-2">
//                       <p className="text-gray-600">{product.productId} (Qty: {product.quantity})</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="w-8 h-8 bg-blue-500 text-white rounded-full">
//                   <TiTick />
//                 </button>
//                 <button className="w-8 h-8 bg-red-500 text-white rounded-full">
//                   <RxCross1 />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;

// const orderedProduct = data.productsBelongsToOrder;

const OrdersContainer = styled.div`
  overflow-y: scroll;
  max-height: 600px; /* Adjust max-height as needed */
`;

const OrderRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none; /* Remove border for last row */
  }
`;

const OrderInfo = styled.div`
  flex: 1;
  width: 100%; /* Take up the remaining space in the row */
  display: flex;
  flex-wrap: wrap; /* Allow product details to wrap if needed */
`;

const OrderTime = styled.div`
  font-weight: bold;
  width: 30%;
`;

const CustomerName = styled.div`
  font-style: italic;
  width: 20%;
`;

const Address = styled.div`
  color: #888;
  width: 30%;
`;

const ProductDetails = styled.div`
  margin-right: 10px; /* Add spacing between product details */
  width: 100px;
`;
