import React, { useState } from "react";
import NewOrders from "./dashboardCompo/NewOrders";

const OrdersList = () => {
  const [showNewOrders, setShowNewOrders] = useState(true);

  return (
    <div className="orders-list p-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Toggle buttons */}
      <div className="toggle-buttons flex justify-center space-x-4 mb-6">
        <button
          className={`toggle-button ${
            showNewOrders ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } px-4 py-2 rounded shadow`}
          onClick={() => setShowNewOrders(true)}
        >
          New Orders
        </button>
        <button
          className={`toggle-button ${
            !showNewOrders ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } px-4 py-2 rounded shadow`}
          onClick={() => setShowNewOrders(false)}
        >
          All Orders
        </button>
      </div>

      {/* Conditional Rendering for New Orders or All Orders */}
      {showNewOrders ? (
        <div className="new-orders bg-white p-6 rounded-lg shadow-lg">
          {/* Render the New Orders list here */}
          <NewOrders />
        </div>
      ) : (
        <div className="all-orders bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {/* Render the All Orders list here */}
          <ul className="list-disc list-inside">
            {/* <li className="py-2">Order #3</li>
            <li className="py-2">Order #4</li> */}
            <p>No order Found</p>
            {/* Add more orders here */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
