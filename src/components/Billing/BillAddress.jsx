import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { CurrencyRupee } from '@mui/icons-material';

const BillAddress = () => {


    const initialValues = {
        name: '',
        contact: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternativePhone: '',
    };

    const onSubmit = (values) => {
        // Submit the form data here
        console.log('Form data', values);

    };
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        contact: yup.string().required('Contact number is required').matches(/^[0-9]+$/, 'Contact number must only contain digits').min(10, 'Contact number must be at least 10 digits'),
        // Landmark and alternativePhone are optional, so no validation required
    });
    const [state, setState] = useState('');

    const handleChange = (event) => {
        setState(event.target.value);
    };


    return (
        <Wrapper>
            <Container>
                <div className="billing-address">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="form-control">
                                {/* address-detail */}
                                
                                <div className="address-bar">
                                    <div className="thirdrow">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Address (Area and Streets)"
                                            multiline
                                            rows={3}

                                            fullWidth
                                        />
                                    </div>
                                    <div className="fourthrow">
                                        <div className="pcity">
                                            <TextField id="outlined-basic" label="City/District/Town" variant="outlined"
                                                style={{
                                                    width: '18rem',
                                                    marginTop: ".5rem"
                                                }}
                                            />
                                        </div>
                                        <div className="pstate">
                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={state}
                                                    label="State"
                                                    onChange={handleChange}
                                                    style={{
                                                        width: '17.5rem',
                                                    }}
                                                >
                                                    <MenuItem value={"mp"}>Madhya Pradesh</MenuItem>
                                                    <MenuItem value={"as"}>Assam</MenuItem>
                                                    <MenuItem value={'mz'}>Mizoram</MenuItem>
                                                    <MenuItem value={"mg"}>Meghalaya</MenuItem>
                                                </Select>

                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="fifthrow">

                                        <div className="plandmark">
                                            <TextField id="outlined-basic" label="Landmark (Optional)" variant="outlined"
                                                style={{
                                                    width: '18rem',
                                                }}
                                            />
                                        </div>
                                        <div className="ppincode">
                                            <TextField
                                                id="outlined-number"
                                                label="Pincode"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                style={{
                                                    width: '18rem',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="sixthhrow">
                                        <div className="plocality">
                                            <TextField id="outlined-basic" label="Locality" variant="outlined"
                                                style={{
                                                    width: '18rem',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* personal-detail */}
                                <div className="person-detail">
                                    <div className="firstrow">
                                        <div className="pname">
                                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                                style={{
                                                    width: '18rem',

                                                }}
                                            />
                                        </div>
                                        <div className="pcontact">
                                            <TextField
                                                id="outlined-number"
                                                label="10-digit mobile number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                style={{
                                                    width: '18rem',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="secondrow">
                                        <div className="palternate-contact">
                                            <TextField
                                                id="outlined-number"
                                                label="Alternate Phone (Optional)"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                style={{
                                                    width: '18rem',
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Form>
                    </Formik>

                    {/* Different-section */}
                </div>
                <div className="price-detail">
                    <h2>Order Summary</h2>
                    <div className="mini-container">

                        <div className="desc1">
                            <ShoppingCartCheckoutOutlinedIcon />
                            <span id='cartid'><span className='count'>( 1 ) </span> items in cart</span>
                        </div>
                        <div className="item first">
                            <div className="desc order">Order Subtotal</div>
                            <div className="no">
                                <CurrencyRupeeOutlinedIcon
                                    style={{
                                        height: "1.2rem"
                                    }}
                                />200
                            </div>
                        </div>
                        <div className="item">
                            <div className="desc charge">Delivery Charges</div>
                            <div className="no" style={{ textDecoration: 'line-through', color: "red" }}>
                                <CurrencyRupee
                                    style={{
                                        height: "1.2rem",
                                        color: "red"
                                    }}
                                /><span id="number">10</span>
                            </div>
                        </div>
                        <div className="item">
                            <div className="desc total">Pre-Tax Total</div>
                            <div className="no">
                                <CurrencyRupeeOutlinedIcon
                                    style={{
                                        height: "1.2rem"
                                    }}
                                />200
                            </div>
                        </div>

                    </div>
                </div>
            </Container>

            <Button variant="contained"
                style={{
                    width: '14rem',
                    height: '2.6rem',
                    marginTop: "1rem",
                    backgroundColor: 'orange'
                }}
            >Deliver here</Button>
        </Wrapper>
    )
}

export default BillAddress
const Wrapper = styled.div`
    padding: .2rem 1rem;
`
const Container = styled.div`
    display: flex;
    gap: 4rem;

    .person-detail{
        border: 1px solid black;
        padding: 1rem 2rem;
        margin-top: 1rem;
    }
    .address-bar{
        border: 1px solid black;
       
        padding: 1rem 2rem;
    }
    #number{
        color: red;
        font-size: 1.2rem;
        
    }
    .count{
        font-size: 1.2rem;
        color: green;
        font-weight: 500;
    }
    /* border: 1px solid black; */
    .billing-address{
        flex: .8;
        /* border: 1px solid black; */
    }
    .price-detail{
        flex: .5;
        border: 1px solid black;
        width: 200px;
        height: 350px;
        
        h2{
            text-align: center;
            border-bottom: 1px dotted grey;
        }
    }
    .form-control{
        padding: 1rem;
    }
    .firstrow{
        /* border: 1px solid black; */
        height: 5.2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .secondrow{
        /* border: 1px solid black; */
        height: 5.4rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .thirdrow{
        height: 8rem;
    }
    .fourthrow{
        height: 5.4rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .fifthrow{
        height: 5.4rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .pname{

    }
    .pcontact{

    }
    .mini-container{
        padding: 0 2rem;
        align-items: center;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
    }
    .first{
        margin-top: 1rem;
    }
    .desc1{
        display: flex;
        align-items: center;
    }
    .no{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    

`