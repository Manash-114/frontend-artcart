import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Order = () => {
  const [selectedValue, setSelectedValue] = useState("processing");
  const [data, setData] = useState([]);

  const deliverOrders = useSelector(
    (state) => state.customer.allDeliveredOrders
  );
  const undeliverOrders = useSelector(
    (state) => state.customer.allNotDeliveredOrders
  );

  useEffect(() => {
    if (selectedValue === "processing") {
      setData(deliverOrders);
    } else {
      setData(undeliverOrders);
    }
  }, [selectedValue, deliverOrders, undeliverOrders]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (selectedValue === "processing") {
      setData(deliverOrders);
    } else {
      setData(undeliverOrders);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex gap-8">
        <div className="bg-gray-100 rounded-lg p-4 w-1/4">
          <FormControl>
            <FormLabel id="order-status-label" className="text-xl mb-4">
              Order Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="order-status-label"
              defaultValue="processing"
              name="order-status"
              onChange={handleChange}
            >
              <FormControlLabel
                value="processing"
                control={<Radio />}
                label="On the way"
              />
              <FormControlLabel
                value="delivered"
                control={<Radio />}
                label="Delivered"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="flex-1 bg-gray-50 rounded-lg p-6">
          {data.length > 0 ? (
            data.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-start"
              >
                <div className="w-1/4">
                  <img
                    src={
                      order.productBelongsToOrder.products.productImages[0].name
                    }
                    alt={order.productBelongsToOrder.products.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 ml-6">
                  <p className="font-semibold text-lg">
                    {order.productBelongsToOrder.products.name.length > 20
                      ? order.productBelongsToOrder.products.name.slice(0, 30) +
                        "..."
                      : order.productBelongsToOrder.products.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    OrderId:{" "}
                    <span className="font-medium">{order.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity:{" "}
                    <span className="font-medium">
                      {order.productBelongsToOrder.productQuantity}
                    </span>
                  </p>
                  {order.productBelongsToOrder.courierName !== "NULL" && (
                    <p className="text-sm text-gray-500">
                      Courier Name:{" "}
                      <span className="font-medium">
                        {order.productBelongsToOrder.courierName}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-1/4 flex flex-col items-end">
                  <span
                    className={`px-4 py-1 rounded-full text-white text-sm ${
                      order.productBelongsToOrder.deliveryStatus === "SHIPPED"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.productBelongsToOrder.deliveryStatus === "SHIPPED"
                      ? "Delivered"
                      : "Pending"}
                  </span>
                  <p className="text-sm text-gray-500 mt-4">
                    Order Date:{" "}
                    {new Date(order.orderDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
