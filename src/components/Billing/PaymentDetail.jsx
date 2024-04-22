import React from 'react'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button } from '@mui/material';
import TextError from '../TextError';

const PaymentDetail = () => {
    return (
        <Wrapper>
            <Container>
                <h2>Payment Method</h2>
                <div className="credit-cart">
                    <CreditCardOutlinedIcon />Credit Card
                </div>
                <div className="mini-container">
                    <Formik
                        initialValues={{
                            cardNumber: '',
                            expiryDate: '',
                            cvv: '',
                            cardholderName: ''
                        }}
                        validationSchema={Yup.object({
                            cardNumber: Yup.string()
                                .required('Required')
                                .matches(/^\d{16}$/, 'Must be 16 digits'),
                            expiryDate: Yup.string()
                                .required('Required')
                                .matches(/^\d{2}\/\d{2}$/, 'Invalid date format (MM/YY)'),
                            cvv: Yup.string()
                                .required('Required')
                                .matches(/^\d{3}$/, 'Must be 3 digits'),
                            cardholderName: Yup.string()
                                .required('Required')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            console.log(values);
                        }}
                    >
                        <Form>
                            <div className="form-control">
                                <label htmlFor="cardholderName">Cardholder Name</label><br />
                                <Field name="cardholderName" type="text"/>
                                <ErrorMessage name="cardholderName"  component={TextError} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="cardNumber">Card Number</label><br />
                                <Field name="cardNumber" type="text" placeholder="0000 - 0000 - 0000 - 0000"  />
                                <ErrorMessage name="cardNumber" component={TextError} />
                            </div>
                            <div className="bottom">
                                <div className="form-control">
                                    <label htmlFor="expiryDate">Expiration Date (MM/YY)</label><br />
                                    <Field name="expiryDate" type="text" />
                                    <ErrorMessage name="expiryDate" component={TextError} />
                                </div>
                                <div className="form-control cv">
                                    <label htmlFor="cvv">CVV</label><br />
                                    <Field name="cvv" type="text" />
                                    <ErrorMessage name="cvv" component={TextError} />
                                </div>
                            </div>


                        </Form>
                    </Formik>
                </div>
            </Container>
            <Button variant="contained"
                style={{
                    width: '14rem',
                    height: '2.6rem',
                    marginTop: "1.4rem",
                    backgroundColor: 'green'
                }}
                type='submit'
            >Confirm Payment</Button>
        </Wrapper>
    )
}

export default PaymentDetail

const Wrapper = styled.section`
    /* border: 1px solid black; */
    padding: 0 15rem;
`
const Container = styled.div`
    border: 1px solid black;

    h2{
        text-align: center;
    }
    .credit-cart{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 2rem;
        padding-left: 1rem;
        color: #0b4c67;
    }
    .mini-container{
        border: 1px solid black;
       
        margin-top: 1rem;
        padding: 1rem;
    }
    input{
        height: 2rem;
        width: 50%;
        font-size: medium;
    }
    .form-control{
       margin-top: .8rem;
    }
    .bottom{
        margin-top: .8rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /* border: 1px solid black; */
        
    }
    .cv{
        margin-left: 2rem;
    }
`