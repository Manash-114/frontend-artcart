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









const ManageProducts = () => {

  const [data, setData] = useState([]);
  const [productName,SetProductName] = useState("");
  const [price,SetPrice] = useState("");
  const [stock,SetStock] = useState(false);
  const [des,SetDes] = useState("");



  const token="eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW5hc2giLCJpYXQiOjE3MTM4MTA0NTIsImV4cCI6MTcxMzg5Njg1MiwiZW1haWwiOiJjaGFuQGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX1NFTExFUiJ9.f0l8-ELIQ55Y5YXnvJuJMJq452Uyxs4LlUmZdOU_x1E";
  
  
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

      

      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        try {
          const response = await axios.post('https://your-api-endpoint', {
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
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Product Details</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label for="pName" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
        <div class="mt-2">
          <input 
          id="pName" 
          name="pName" 
          type="text" 
          autocomplete="pName" 
          onChange={(e) => setProductName(e.target.value)}
          required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label for="pPrice" class="block text-sm font-medium leading-6 text-gray-900">Product Price</label>
        <div class="mt-2">
          <input 
          id="pPrice" 
          name="pPrice" 
          type="number" 
          autocomplete="pPice" 
          required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
          <label htmlFor="stock" className='m-3 ml-0'>Stock</label>
          <input type="checkbox"  />
      </div>
      <div>
      <div className="mt-5 pb-3 ">
          <label htmlFor="category " className='pb-6'>Select Category</label>
          <select id="category" name="category" value={selectedValue} onChange={handleChange} className="w-full   border rounded focus:outline-none focus:border-blue-500">
            <option value="">Select Courier</option>
            <option value="e-kart">E-Kart</option>
            <option value="ecom-express">Ecom-Express</option>
            <option value="delhivery">Delhivery</option>
            
          </select>
          <p className="mt-2">You selected: {selectedValue}</p>
        </div>
      </div>


      <div>
        <div class="flex items-center justify-between">
          <label for="pDes" class="block text-sm font-medium leading-6 text-gray-900">Product Description</label>
          
        </div>
        <div class="mt-2">
          <textarea 
          id="password" 
          name="password" 
          type="text" 
          autocomplete="current-password" 
          required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>







      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
      </div>
    </form>

    
  </div>
</div>
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