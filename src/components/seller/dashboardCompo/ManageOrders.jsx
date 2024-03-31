import React from 'react'
import styled from 'styled-components';
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

const orders = [
    {
      id: 1,
      time: '10:00 AM',
      customerName: 'John Doe',
      address: '123 Main St, City, Country',
      // Add more fields as needed
    },
    {
      id: 2,
      time: '11:30 AM',
      customerName: 'Jane Smith',
      address: '456 Elm St, Town, Country',
      // Add more fields as needed
    },
    {
        id: 3,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },

      {
        id: 4,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },
      {
        id: 5,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },
      {
        id: 6,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },
      {
        id: 7,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },
      {
        id: 8,
        time: '11:30 AM',
        customerName: 'Jane Smith',
        address: '456 Elm St, Town, Country',
        // Add more fields as needed
      },
    // Add more orders as needed
  ];


const ManageOrders = () => {
  return (
        <OrdersContainer>
             <div >
            {orders.map(order => (
            <OrderRow key={order.id}>
                <OrderInfo>
                <OrderTime>{order.time}</OrderTime>
                <CustomerName>{order.customerName}</CustomerName>
                <Address>{order.address}</Address>
                <button style={{width:"70px", backgroundColor: "blue"  }} ><TiTick /></button>
                <button style={{ width: "70px", backgroundColor: "red" }}><RxCross1 /></button>
                {/* Add more fields as needed */}
                </OrderInfo>
                {/* Add buttons or actions related to the order */}
            </OrderRow>
        ))}
    </div>
        </OrdersContainer>
       
    
    
  )
}

export default ManageOrders


const OrdersContainer = styled.div`
  overflow-y: scroll;
  max-height: 600px; /* Adjust max-height as needed */
`;

const OrderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none; /* Remove border for last row */
  }
`;



// Styled component for individual elements within the row
const OrderInfo = styled.div`
  flex: 1;
  width: 10%;
 
`;

const OrderTime = styled.div`
  font-weight: bold;
  width: 10%;
`;

const CustomerName = styled.div`
  font-style: italic;
  width: 10%;
`;

const Address = styled.div`
  color: #888;
`;