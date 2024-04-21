import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
const AddProduct = () => {


    const [showProductName, setShowProductName] = useState(false);

    const handleCheckboxChange = () => {
        setShowProductName(!showProductName);
    };
  return (
    <>
     {/* <label htmlFor="productName">Product Name:</label>
      <input type="text" id="productName" name="productName" required />

      <label htmlFor="productPrice">Product Price:</label>
      <input type="number" id="productPrice" name="productPrice" required />

      <label htmlFor="productCategory">Product Category</label>
        <select id="productCategory" name="productCategory">
        <option value="Sketch">Sketch</option>
        <option value="Water Color">Water Color</option>
        </select>

        
      
      


      <label htmlFor="productDescription">Product Description:</label>
      <textarea id="productDescription" name="productDescription" rows="4" required></textarea>

      <label htmlFor="sellerImage">Product Images {`(*Select multiple image)`}</label>
            <input
              type='file'
              id="sellerImage"
              name='sellerImage'
              accept=".pdf, .jpg, .jpeg, .png" 
              multiple
            />

      <input type="submit" value="Confirm to add " /> */}

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="pName"
                  name="pName"
                  type="text"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="pPrice"
                  name="pPrice"
                  type="number"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="pName"
                  name="pName"
                  type="text"
                  
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                  <label htmlFor="productCategory" className='mr-5'>Product Category</label>
                  <select id="productCategory" name="productCategory">
                  <option value="Sketch">Sketch</option>
                  <option value="Water Color">Water Color</option>
                  </select>
            </div>
            
            <div className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
            <label htmlFor="ProductImage" className='mb-6'>Product Images {`(*Select multiple image)`}</label>
            <input
              type='file'
              id="pImage"
              name='pImage'
              accept=" .jpg, .jpeg, .png" 
              multiple
              className='mt-4'
            />
            </div>
            

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
     
 
  )
}

export default AddProduct

// const StyledForm = styled.form`
//   max-width: 400px;
//   margin: 0 auto;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-image: url("images/face.png"); /* Replace "images/face.png" with the path to your image */
//   background-size: cover; /* Adjust background size as needed */
//   background-position: center; /* Adjust background position as needed */


//   select{
//     width: 100%;
//     border: 1px solid #ccc;
//     border-radius: 3px;
//     box-sizing: border-box;
//     padding:10px;
//     margin-bottom: 15px;
//   }

//   // label{
//   //   width: 100%;
//   // }


//   input[type="text"],
//   input[type="number"],
//   input[type="file"],
//   textarea {
//     width: 100%;
//     padding: 10px;
//     margin-bottom: 15px;
//     border: 1px solid #ccc;
//     border-radius: 3px;
//     box-sizing: border-box;
   
//   }

//   input[type="submit"] {
//     background-color: #007bff;
//     color: white;
//     padding: 10px 20px;
//     border: none;
//     border-radius: 3px;
//     cursor: pointer;
//   }

//   input[type="submit"]:hover {
//     background-color: #0056b3;
//   }
// `;