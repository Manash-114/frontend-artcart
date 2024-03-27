import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup';
import TextError from '../TextError';


const initialValues = {
  email: "",
};
const onSubmit = values => {

  // values["role"] = "admin"
  // console.log( values)
  // axios.post('https://art-cart-backend-production.up.railway.app/auth/signup', values)
  //  .then(res => {
  //    console.log(res.data)
  //  })
  //  .then(err => console.log(err))
  console.log(values)
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email Required").email("Invalid Email Format"),
  password: Yup.string().required("Password Required").min(8, 'Password must be at least 8 characters'),
});
const SellerProfileForm = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="imageSection">
          image
        </div>
        <div className="info">
          <Formik 
             initialValues = {initialValues}
             validationSchema={validationSchema}
             onSubmit={onSubmit}
          >
            <Form>
              <h2 className="title">Personal Information</h2>
              <div className="form-control">
                <label htmlFor="email">Full Name</label>
                <br></br>
                <Field
                  type='email'
                  id="email"
                  name='email'
                />
                <ErrorMessage name='email' component={TextError} />
              </div>
              <button type='submit'>Submit</button>
              
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  )
}

export default SellerProfileForm

const Wrapper = styled.section`
  .container{
    width: 100%;
    height: 80vh;
    background-color: aqua;
    padding: 2rem;
  
  }
  .imageSection{
    width: 15rem;
    height: 18rem;
    border: 1px solid black;
    border-radius: 1rem;
  }
  .info{
    width: 70%;
    height: 100%;
    padding: 1rem;
    border-radius: 1rem; 
    border: 1px solid black;

  }

`
