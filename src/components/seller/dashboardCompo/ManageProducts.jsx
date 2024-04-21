import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import DataTable from 'react-data-table-component';

const data=[
  {
      "id": "31f2918e-ca5f-4044-b933-99edaabceb45",
      "name": "P4",
      "price": 100,
      "description": "des1",
      "stock": true,
      "productImages": [
          {
              "id": "4b83ce76-c3ff-4de9-83e4-8e5407d06928",
              "name": "iffe"
          },
          {
              "id": "52482d57-ae35-4418-92f1-f24d6523c83a",
              "name": "fdsm"
          },
          {
              "id": "c1d67ddf-c1fa-49b7-838f-fcd1073c47df",
              "name": "fdse"
          }
      ],
      "category": {
          "id": 2,
          "name": "cat-2"
      },
      "seller": {
          "id": 2,
          "name": null,
          "email": "seller2@gmail.com",
          "profileImage": null,
          "aadhaarNo": null,
          "aadhaarImage": null,
          "phoneNumber": null,
          "regDate": "2024-04-02T12:29:24.728765",
          "approved": false,
          "profileCompleted": false
      },
      "reviews": [
        {
          "id":1,
          "cName":"K Behrazi",
          "description": "It is a good product",
          "rating":4
        }
      ]
  },
  {
      "id": "4ce61481-3c26-460f-a6da-e9e2f338c326",
      "name": "P3",
      "price": 100,
      "description": "des1",
      "stock": true,
      "productImages": [
          {
              "id": "79d68465-e671-45e9-b4f9-0ce65cc5fe1f",
              "name": "iffe"
          },
          {
              "id": "2c2a1142-411f-491f-a263-36e52648df73",
              "name": "fdsm"
          },
          {
              "id": "720a740a-44ef-4e33-ab93-ec010fc4085d",
              "name": "fdse"
          }
      ],
      "category": {
          "id": 2,
          "name": "cat-2"
      },
      "seller": {
          "id": 2,
          "name": null,
          "email": "seller2@gmail.com",
          "profileImage": null,
          "aadhaarNo": null,
          "aadhaarImage": null,
          "phoneNumber": null,
          "regDate": "2024-04-02T12:29:24.728765",
          "approved": false,
          "profileCompleted": false
      },
      "reviews": [
        {
          "id":1,
          "cName":"Manash",
          "description": "It is a good product",
          "rating":5
        },
        {
          "id":3,
          "cName":"Chanchal",
          "description": "It is a nice product",
          "rating":5
        }
      ]
    }
]

const ManageProducts = () => {


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
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="pName" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
        <div class="mt-2">
          <input id="pName" name="pName" type="text" autocomplete="pName" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label for="pPrice" class="block text-sm font-medium leading-6 text-gray-900">Product Price</label>
        <div class="mt-2">
          <input id="pPrice" name="pPrice" type="number" autocomplete="pPice" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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
          <textarea id="password" name="password" type="text" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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