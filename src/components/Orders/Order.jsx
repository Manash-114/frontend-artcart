import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {

  const [selectedValue, setSelectedValue] = useState("processing")

  const [data, setData] = useState([]);


  //deliver
  const deliverOrders = useSelector((state) => state.customer.allDeliveredOrders);
  console.log("deliver value:", deliverOrders);

  //undeliver
  const undeliverOrders = useSelector((state) => state.customer.allNotDeliveredOrders);

  // console.log("Undeliver value:", UndeliverOrders);
  useEffect(() => {
    if (selectedValue === "processing") {
      setData(deliverOrders);
    } else {
      setData(undeliverOrders);
    }
  }, [selectedValue, deliverOrders, undeliverOrders]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    if (selectedValue === "processing") {
      setData(deliverOrders)
    } else {
      setData(UndeliverOrders)
    }
  };
  return (
    <Wrapper>
      <Container>
        <Left>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Order Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="processing"
              name="radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel
                value="processing"
                control={<Radio />}
                label="Delivered"
              />
              <FormControlLabel
                value="delivered"
                control={<Radio />}
                label="On the way"
              />
            </RadioGroup>
          </FormControl>
        </Left>
        <Right>
          {/* <div className="search-bar">
            <TextField
              placeholder="Search your orders here"
              id="serch"
              style={{
                width: "70%",
                marginRight: "1rem",
              }}
              InputProps={{
                style: {
                  height: "2.5rem",
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              style={{ width: "12rem" }}
            >
              search
            </Button>
          </div> */}

          {/* order-product */}
          {
            data.length > 0 ? (
              data.map((order) => (
                <div className="product-container">
                  <div className="image">
                    <img
                      src={order.productBelongsToOrder.products.productImages[0].name}
                      alt={order.productBelongsToOrder.products}
                    />
                  </div>
                  <div className="title">
                    <p className="pname">
                      {order.productBelongsToOrder.products.name.length > 20
                        ? order.productBelongsToOrder.products.name.slice(0, 30) +
                        ".."
                        : order.productBelongsToOrder.products.name}
                    </p>
                    <p className="orderId">
                      OrderId: <span className="OId">{order.orderId}</span>
                    </p>
                    <p className="orderId">
                      Quantity: <span className="OId">{order.productBelongsToOrder.productQuantity}</span>
                    </p>
                    {order.productBelongsToOrder.courierName !== "NULL" && (
                      <p className="courier">
                        Courier Name: <span className="cId">{order.productBelongsToOrder.courierName}</span>
                      </p>
                    )}

                  </div>
                  <div className="status">
                    <p>Status</p>
                    <span
                      className="statusId"
                      style={{
                        backgroundColor:
                          order.productBelongsToOrder.deliveryStatus === "SHIPPED"
                            ? "#0edb1c"
                            : "#0caae3",
                      }}
                    >
                      {order.productBelongsToOrder.deliveryStatus === "SHIPPED"
                        ? "Delivered"
                        : "Pending"}
                    </span>


                    <span className="date">
                      Order Date: {new Date(order.orderDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>

                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )
          }

        </Right>
      </Container>
    </Wrapper>
  );
};

export default Order;

const Wrapper = styled.div`
  /* border: 1px solid black; */
  min-height: 60vh;
  padding: 2rem 10rem;
`;
const Container = styled.section`
  padding-top: 1rem;
  /* border: 1px solid black; */
  display: flex;
  gap: 4rem;
  min-height: 50vh;
`;
const Left = styled.div`
 border: 1px solid #03112099;
  border-radius: 20px;
  flex: 0.2;
  padding-left: 2rem;
  display: flex;
  justify-content: flex-start;
  #demo-radio-buttons-group-label {
    font-size: 1.2rem;
    margin: 2rem auto;
    color: black;
  }
  
`;
const Right = styled.div`
  border: 1px solid #2003034b;
  border-radius: 10px;
  flex: .8;
  padding: 1rem;

  .search-bar {
  }

  .product-container {
    border: 1px solid #03112099;
  border-radius: 10px;
    display: flex;
    margin-top: 1.5rem;
    padding: 10px;
   
  }
  .image {
    height: 120px;
    flex: 0.4;
    /* border: 1px solid black; */
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .title {
    flex: 0.8;
    /* border: 1px solid black; */
    padding: .5rem 1rem;
  }
  .price {
    flex: 0.3;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 16px;
  }
  .status {
    flex: 0.7;
    border-left: 1px solid #079724;
    /* border: 1px solid black; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 15px;

    p {
      font-weight: 550;
    }
  }
  .pname{
    font-weight: 550;
  }
  .courier{
    font-size: .8rem;
    padding-top: 1.8rem;
  }
  .cId{
    font-weight: 600;
  }
  .orderId{
    font-size: .8rem;
    padding-top: 10px;
  }
  .OId{
    font-weight: 550;
  }
  .statusId{
    background-color: #09c63c;
    margin-top: .5rem;
    color: white;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 25px;
    border-radius: 10px;
  }
  .date{
    margin-top: 1rem;
    font-size: .9rem;
  }
`;
