import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import BillAddress from './BillAddress';
import OrderDetail from './OrderDetail';
import PaymentDetail from './PaymentDetail';

const BillingPage = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Wrapper>
      <TabContext value={value}>
      <Container>
          <TabList onChange={handleChange} aria-label="head">
            <Tab className='item-head' icon={<LocationOnIcon/>} label="Billing Address" value="1" />
            <Tab className='item-head' icon={<DescriptionIcon/>} label="Order Details" value="2" />
            <Tab className='item-head' icon={<PaymentIcon/>} label="Payment" value="3" />
          </TabList>
      </Container>
      <SubContainer>
        <TabPanel value="1"><BillAddress/></TabPanel>
        <TabPanel value="2"><OrderDetail/></TabPanel>
        <TabPanel value="3"><PaymentDetail/></TabPanel>
        </SubContainer>
      </TabContext>
    </Wrapper>
  )
}

export default BillingPage

const Wrapper = styled.section``
const Container = styled.div`
  border-bottom: 1px solid dimgray  ;
  /* border: 1px solid black; */
  margin: auto 12%;
  display: flex;
  justify-content: center;
  align-items: center;

  .item-head{
    text-transform: capitalize;
    margin-left: 2rem;
  }
`
const SubContainer = styled.div`
  /* border: 1px solid black; */
  margin: 1.2rem 12%;
`
