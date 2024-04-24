import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import DataTable from 'react-data-table-component';

import { BASE_URL } from '../../common/config';
import { useSelector } from 'react-redux';









const ManageProducts = () => {

  const [data, setData] = useState([]);
  const [productName,SetProductName] = useState("");
  const [price,SetPrice] = useState("");
  const [stock,SetStock] = useState(false);
  const [des,SetDes] = useState("");


  const {token} = useSelector(store=>store.auth);
  
  
  // State to hold fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/seller/all-products`,{
          headers: {
            Authorization: `Bearer ${token}` // Include 'Bearer' prefix for some authentication schemes
          }
        });
        setData(response.data); 
        // Assuming your API returns an array of objects
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally handle errors gracefully
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []);




  const columns = [
    {
      name: 'Product Name',
      cell: row => (row.name),
      sortable: true,
      
    },
    {
        name: 'Price',
        cell: row => (row.price),
        sortable: true,
        
    },
    {
      name: 'Stock',
      cell: row => (row.price ?'inStock': 'Out of Stock'),
      sortable: true,
      
   },
  {
    name: 'Category',
    cell: row => (row.category.name),
    sortable: true,
    
  },
  // {
  //   name: 'Delete Product',
  //   cell: row => {

  //     return(
  //       <button onClick={handleDelete}>Delete</button>
  //     )},
    
    
  // },

    {
      name: 'Action',
      cell: (row) =>{
        
        const [anchorEl1, setAnchorEl1] = useState(null)

        const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
      };
      const handleClose1 = () => {
        setAnchorEl1(null);
     };


      const open1 = Boolean(anchorEl1);


      const id1 = open1 ? 'simple-popover' : undefined;

            
      const [selectedValue, setSelectedValue] = useState('');

  
      const handleChange = (event) => {
        
        setSelectedValue(event.target.value);
      };

      //--------------

      const [showProductName, setShowProductName] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const token = useSelector((store) => store.auth.token);
  const [productCategory, setProductCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    stock: true,
    category: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("form submit " + JSON.stringify(productData));
    console.log(productImages);
    uploadImageToCloudinary(productImages, productData, token, setIsLoading);
  };

  useEffect(() => {
    fetch(`${BASE_URL_LOCAL}/public/category`, {
      method:"GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProductCategory(res);
      });
  }, []);



      //-------------

      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        try {
          const response = await axios.post(`${BASE_URL}`, {
            productName,
            productPrice,
            hasStock,
            category: selectedValue,
            // Other data if needed
          });
    
          console.log('Product updated successfully:', response.data);
          // Handle successful update (e.g., close Popover, display success message)
    
        } catch (error) {
          console.error('Error updating product:', error);
          // Handle errors (e.g., display error message)
        }
      };

        
        
        return (
        
        <div className='m2-2 '>
        <Button aria-describedby={id1} variant="contained" onClick={handleClick1}>
          Edit Product Details
        </Button>
        <Popover
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>
          <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="pName"
                  name="pName"
                  type="text"
                  required
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      ["name"]: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="pPrice"
                  name="pPrice"
                  type="number"
                  required
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      ["price"]: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                  required
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      ["description"]: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <label htmlFor="productCategory" className="mr-5">
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={productData.category}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    ["category"]: e.target.value,
                  });
                }}
              >
                <option value="">Select a category</option>
                {productCategory.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <label htmlFor="ProductImage" className="mb-6">
                Product Images {`(*Select multiple image)`}
              </label>
              <input
                type="file"
                id="pImage"
                name="pImage"
                accept=" .jpg, .jpeg, .png ,.webp"
                multiple
                className="mt-4"
                onChange={(e) => {
                  setProductImages(e.target.files);
                }}
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
            {isLoading && (
              <div className="mt-4">
                <Spinner />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  
          </Typography>
        </Popover>
      </div>
      )}
      
    },
  
    
    



  ];



  
  

  // Function to fetch order data from the API using Axios
  // const fetchOrders = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.get('https://fakestoreapi.com/carts'); // Replace with your API URL
  //     setOrders(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Fetch orders on component mount
  // useEffect(() => {
  //   fetchOrders();
  //   console.log(address);
  // }, []);

  return (
   
    

    <DataTable
			columns={columns}
			data={data}
      pagination
      
		/>
    
    
  );
}

export default ManageProducts