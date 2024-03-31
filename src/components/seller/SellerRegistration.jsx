import React from 'react'
import styled from 'styled-components';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TextError from '../TextError';
import axios from "axios"


const initialValues = {
    sellerName:"",
    email: "",
    password: "",
    sellerPhone:"",
    sellerImage:"",
    aadhaarImage:"",
    aadhaarNo: "",






  };

  const validationSchema = Yup.object({
    sellerName: Yup.string().required("Please Enter your name"),
    email: Yup.string().required("Email Required").email("Invalid Email Format"),
    password: Yup.string().required("Password Required").min(8, 'Password must be at least 8 characters'),
    aadhaarNo: Yup.string().required("Please Enter Aadhaar Number").min(12,'Aadhaar Number must be at least 12 numbers')
    
  });

const SellerRegistration = () => {

    const onSubmit = values => {
  
        axios.post('https://art-cart-backend-production.up.railway.app/auth/signin', values)
         .then(res => {
           navigate('/')
           console.log(res.data)
         })
         .then(err => console.log(err))
      };
      
     const navigate = useNavigate();

  return (
    <Wrapper>
    <div className="container">
      <div className="imageSection">
        <div className="content">
          <h1>Join the largest artwork community</h1>
          <p id='content-p'>Get free access to millions peice of art, showcase, promote, sell & share your work with other members in the ArtWork Community.</p>
        </div>
      </div>

      <div className="registrationSection">

        <Formik 
        initialValues = {initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
         
        <Form style={{ overflowY: 'scroll' } }>
        <h2 className="title">Register as a Seller</h2>
        {/* <p>Become an ArtWork. <NavLink to="/register" className="log-in" >Join</NavLink></p> */}
          
        <div className="form-control">
            <label htmlFor="sellerName">Name*</label>
            <Field
              type='text'
              id="sellerName"
              name='sellerName'
            />
            <ErrorMessage name='sellerName' component={TextError} />
        </div>

        <div className="form-control">
            <label htmlFor="email">Email*</label>
            <Field
              type='email'
              id="email"
              name='email'
            />
            <ErrorMessage name='email' component={TextError} />
          </div>


          <div className="form-control">
            <label htmlFor="password">Password*</label>
            <Field
              type='password'
              id="password"
              name='password'
              
            />
            <ErrorMessage name='password' component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="sellerPhone">Phone No.*</label>
            <Field
              type='tel'
              id="sellerPhone"
              name='sellerPhone'
              pattern="^\+91[0-9]{10}$"
               title="Please enter a valid phone number starting with +91 and followed by 10 digits" 
               required
            />
            <ErrorMessage name='sellerPhone' component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="sellerImage">Profile Image*</label>
            <Field
              type='file'
              id="sellerImage"
              name='sellerImage'
              accept=".pdf, .jpg, .jpeg, .png" 
              required
            />
            <ErrorMessage name='ID Proof' component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="aadhaarImage">Aadhaar Image Proof*</label>
            <Field
              type='file'
              id="aadhaarImage"
              name='aadhaarImage'
              accept=".pdf, .jpg, .jpeg, .png" 
              required
            />
            <ErrorMessage name='ID Proof' component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="aadhaarNo">Aadhaar Number</label>
            <Field
              type='text'
              id="aadhaarNo"
              name='aadhaarNo'
              pattern="[0-9]{12}"
              title="Aadhaar number must be 12 digits" 
              required
            />
            <ErrorMessage name='Aadhaar No.' component={TextError} />
          </div>

          <div className="form-control">
            <div >
            <Field
              type='checkbox'
              id="checkPrivacy"
              name='checkPrivacy'
             
              required
            />
            <h4 className=''> I accept the <a href="/terms-of-service">Terms of Service</a>.</h4>
            
            
            <ErrorMessage name='please accept' component={TextError} />
            </div>
         
          </div>

         

          

          
          
          
          
          
          
          
          
          
          
          
          

          
          
          <button type='submit'>Login</button>
         
        </Form>

       
        </Formik>
      </div>
    </div>
  </Wrapper>
  )
}

export default SellerRegistration


const Wrapper = styled.div`
  overflow-y: scroll;
  height: 97vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.365), rgba(0,0,0,0.5)),url('./images/nature.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .container{
    width: 900px;
    height: 670px;
    background-color: white;
    display: flex;
    
  }
  .imageSection{
    flex: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.42)),url('./images/ship.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
  }
  .content{
    margin: 30px;
    height: 60%;
    
    
  }
  h1{
    width: 80%;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.2;
    color: #fff;
    margin-bottom: 30px;
  }
  #content-p{
    font-size: 20px;
    color: #fdfdfde5;
  }
  .registrationSection{
    background: #f8f8fef3;
   
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0px;
    border-radius: 1px solid black;
    
  }
  
  .title{
    color: #320808;
    font-weight: bold;
    font-size: 35px;
  }
  label{
    font-size: 18px;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }
  input[type='password'],
  input[type='text'],
  input[type='tel'],
  
  input[type='email']{
    display: block;
    width: 300px;
    padding: 6px 12px;
    font-size: 16px;
    line-height: 1.4;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right:25px;
    
  }
  

  p{
    font-size: 18px;
    margin-bottom: 20px;
  }
  .form-control{
    margin-bottom: 20px;
  }
  button{
    width: 100%;
    height: 40px;
    background-color: #18a021;
    border: 1px solid #ccc;
    color: white;
    text-transform: uppercase;
    margin-bottom: 20px;
    
  }
 
  .log-in{
    font-weight: bold;
    color: #26c029;
    text-decoration: none;
  }


  .error{
    color: red
  }


  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`