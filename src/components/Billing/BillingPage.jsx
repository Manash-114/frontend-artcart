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

const BillingPage = () => {
  const [value, setValue] = useState('1');
  const [deliverClicked, setDeliverClicked] = useState(false);
  const [visited1, setVisited1] = useState(true); // Tab 1 is visited by default
  const [visited2, setVisited2] = useState(false);
  const [visited3, setVisited3] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeliverClick = () => {
    setValue('2');
    setVisited2(true); // Mark Tab 2 as visited when it's selected
    setDeliverClicked(true);
  };

  const handleDeliverClick2 = () => {
    setValue('3');
    setVisited3(true); // Mark Tab 3 as visited when it's selected
    setDeliverClicked(true);
  };

  return (
    <Wrapper>
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
          <TabPanel value="1"><BillAddress setNextButtonDisabled={setNextButtonDisabled}/>
            <Button variant="contained"
              onClick={handleDeliverClick}
              disabled={nextButtonDisabled}
              style={{
                width: '14rem',
                height: '2.6rem',
                marginTop: "1.5rem",
                marginLeft: "12.5rem",
                backgroundColor: 'orange'
              }}
            >Deliver here</Button>
          </TabPanel>

          <TabPanel value="2"><OrderDetail />
            <Button variant="contained"
              onClick={handleDeliverClick2}
              style={{
                width: '14rem',
                height: '2.6rem',
                marginTop: "1rem",
                marginLeft: '9rem',
                backgroundColor: 'orange'
              }}
            >Confirm order</Button>
          </TabPanel>
          <TabPanel value="3"><PaymentDetail /></TabPanel>
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
