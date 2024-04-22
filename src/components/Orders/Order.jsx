import React from 'react'
import styled from 'styled-components'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { NavLink } from 'react-router-dom';

const Order = () => {
    return (
        <Wrapper>
            <Container>
                <Left>
                    <h2>Filters</h2>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Order Status</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="processing"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="processing" control={<Radio />} label="On the way" />
                            <FormControlLabel value="delivered" control={<Radio />} label="Delivered" />
                            <FormControlLabel value="cancelled" control={<Radio />} label="Cancelled" />
                        </RadioGroup>
                    </FormControl>

                </Left>
                <Right>
                    <div className="search-bar">
                        <TextField placeholder='Search your orders here' id="serch" style={{
                            width: '70%',
                            marginRight: "1rem"
                        }} InputProps={{
                            style: {
                                height: '2.5rem',
                            },
                        }} />
                        <Button variant="contained" startIcon={<SearchIcon />} style={
                            { width: "12rem" }
                        }>
                            search
                        </Button>
                    </div>

                    {/* order-product */}

                    <NavLink to="/orders/details" className="product-container">
                        <div className="image">
                            <img src='/images/scenery4.jpg' alt='title' />
                        </div>
                        <div className="title">
                            <p>Lakmé Sunscreen - SPF 50 .. </p>
                        </div>
                        <div className="price">
                            <CurrencyRupeeIcon />345
                        </div>
                        <div className="status">
                            <p>Status</p>
                            <span>Your order has been packed</span>
                        </div>
                    </NavLink>


                </Right>
            </Container>
        </Wrapper>
    )
}

export default Order

const Wrapper = styled.div`
    /* border: 1px solid black; */
    min-height: 60vh;
    padding: 2rem 10rem;
`
const Container = styled.section`
    padding-top: 1rem;
    /* border: 1px solid black; */
    display: flex;
    gap: 4rem;
    min-height: 50vh;
`
const Left = styled.div`
     border: 1px solid black;
     flex: .3;
     padding-left: 2rem;

     #demo-radio-buttons-group-label{
        margin-bottom: 1rem;
     }
`
const Right = styled.div`
     border: 1px solid black;
     flex: 1;
     padding: 1rem;

     .search-bar{

     }

     .product-container{
        border: 1px solid black;
        display: flex;
        margin-top: 1.5rem;
        padding: 10px;
       height: 100px;
     }
     .image{
        height: 100px;
        width: 100px;
        flex: .5;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
     }
     .title{
        flex: .8;
        /* border: 1px solid black; */
        padding-left: 1rem;
     }
     .price{
        flex: .3;
        /* border: 1px solid black; */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 16px;
     }
     .status{
        flex: .7;
        /* border: 1px solid black; */
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        padding-left: 10px;

        p{
            font-weight: 550;
        }
     }
`