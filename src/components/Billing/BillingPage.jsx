import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import BillAddress from './BillAddress';
import OrderDetail from './OrderDetail';
import PaymentDetail from './PaymentDetail';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductInCart } from '../../reduxToolkit/features/productList/BillingAddressSlice';
import PaymentDetails from './PaymentDetails';

const BillingPage = () => {
  const [value, setValue] = useState('1');
  const [visited1, setVisited1] = useState(true); // Tab 1 is visited by default
  const [visited2, setVisited2] = useState(false);
  const [visited3, setVisited3] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeliverClick = () => {
    setValue('2');
    setVisited2(true); // Mark Tab 2 as visited when it's selected


  };
  const individualCartItem = useSelector(state => state.cart.cartItems);

  const productsInCart = individualCartItem.map(item => ({
    productId: item.id,
    cartQuantity: item.cartQuantity
  }));
  // console.log(productsInCart)

  const handleDeliverClick2 = () => {
    productsInCart.map(p=>(
      dispatch(updateProductInCart({ productId: p.productId, quantity: p.cartQuantity }))
    ))
    setValue('3');
    setVisited3(true); // Mark Tab 3 as visited when it's selected

  };

  return (
    <Wrapper>
      <div className="header">
        <img src='/images/Logo.jpg' alt='Logo'></img> <span className='art'> ArtCart</span>
      </div>
      <TabContext value={value}>
        <Container>
          <TabList onChange={handleChange} aria-label="head">
            <Tab
              className='item-head'
              icon={<LocationOnIcon />}
              label="Billing Address"
              value="1"
              disabled={!visited1} // Disable tab 1 if not visited
            />
            <Tab
              className='item-head'
              icon={<DescriptionIcon />}
              label="Order Details"
              value="2"
              disabled={!visited2} // Disable tab 2 if not visited
            />
            <Tab
              className='item-head'
              icon={<PaymentIcon />}
              label="Payment"
              value="3"
              disabled={!visited3} // Disable tab 3 if not visited
            />

          </TabList>
        </Container>
        <SubContainer>
          <TabPanel value="1">
            <BillAddress handleDeliverClick={handleDeliverClick} />
          </TabPanel>

          <TabPanel value="2"><OrderDetail />
            <Button variant="contained"
              onClick={handleDeliverClick2}
              style={{
                width: '14rem',
                height: '2.6rem',
                marginTop: "1rem",
                marginLeft: '10rem',
                backgroundColor: 'orange'
              }}
            >Confirm order</Button>
          </TabPanel>
          <TabPanel value="3"><PaymentDetails /></TabPanel>
        </SubContainer>
      </TabContext>
    </Wrapper>
  )
}

export default BillingPage

const Wrapper = styled.section`
  .header{
    background: linear-gradient(to right, #007bff, #00bfff); 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    height: 50px;
  }
  .header > img{
    height: 40px;
    width: 40px;
    border-radius: 2rem;
  }
  .art{
    margin-left: .5rem;
    color: white;
    font-size: 1.2rem;
    font-weight: 550;
  }
`
const Container = styled.div`
  border-bottom: 1px solid dimgray  ;
  border: 1px solid black;
  margin: auto 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52%;
  margin-left: 24%;

  .item-head{
    text-transform: capitalize;
    margin-left: 2rem;
  }
`
const SubContainer = styled.div`
  /* border: 1px solid black; */
  margin: 1.2rem 12%;
`
