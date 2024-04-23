import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import styled from 'styled-components';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import DataTable from 'react-data-table-component';

const NewOrders = () => {

    const data=[
        {
            "orderId": "O11",
            "address": {
                "id": "c294db22-4775-46c9-b10d-f91d711fa007",
                "city": "Dhemaji",
                "state": "Assam",
                "zipCode": "787057",
                "street": "gowal"
            },
            "productsBelongsToOrder": [
                {
                    "id": "7b95880f-c495-4ac1-9411-79f268522f4e",
                    "productQuantity": 2,
                    "deliveryStatus": "ORDERED",
                    "courierName": "notAssigned",
                    "products": {
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
                        }
                    }
                },
                {
                    "id": "80237a93-a8ec-4e05-a0c5-218f755e5e26",
                    "productQuantity": 1,
                    "deliveryStatus": "ORDERED",
                    "courierName": "notAssigned",
                    "products": {
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
                        }
                    }
                },
                {
                    "id": "b66aa89b-c8a2-4be2-8c0d-fe28f5a2099e",
                    "productQuantity": 2,
                    "deliveryStatus": "ORDERED",
                    "courierName": "notAssigned",
                    "products": {
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
                        }
                    }
                },
                {
                    "id": "fee34120-3ff5-48dc-90cb-42d8684b4bc5",
                    "productQuantity": 1,
                    "deliveryStatus": "ORDERED",
                    "courierName": "notAssigned",
                    "products": {
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
                        }
                    }
                }
            ]
        }
    ]
  
    
  const columns = [
    {
      name: 'Order id',
      cell: row => (row.orderId),
      sortable: true,
      
    },
    {
        name: 'Customer Name',
        cell: row => ('Customer Name'),
        sortable: true,
        
    },
    {
      name: 'Address',
      cell: (row) =>{
        
        const [anchorEl1, setAnchorEl1] = useState(null)
//   const [anchorEl2, setAnchorEl2] = useState(null)
const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
    
  };
  const handleClick2 = (event) => {
    // setAnchorEl2(event.currentTarget);
    
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
//   const handleClose2 = () => {
//     // setAnchorEl2(null);
//   };

  const open1 = Boolean(anchorEl1);
//   const open2 = Boolean(anchorEl2);

  const id1 = open1 ? 'simple-popover' : undefined;
//   const id2 = open2 ? 'normal-popover' : undefined;
        
        
        
        
        return (
        
        <div className='mt-4'>
        <Button aria-describedby={id1} variant="contained" onClick={handleClick1}>
          Show Address
        </Button>
        <Popover
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <div>
            <div>City: {row.address.city}</div>
            <div>State: {row.address.state}</div>
            <div>Zip Code: {row.address.zipCode}</div>
            <div>Street: {row.address.street}</div>
            </div>
          </Typography>
        </Popover>
      </div>
      )}
      
    },
    {
      name: 'Product',
      cell: (row) =>{


        
  const [anchorEl2, setAnchorEl2] = useState(null)

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    
  };


  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const open2 = Boolean(anchorEl2);


  const id2 = open2 ? 'normal-popover' : undefined;


        return(
        
            <div className='mt-4'>
            <Button aria-describedby={id2} variant="contained" onClick={handleClick2}>
              Show Product
            </Button>
            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorEl2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div>
                <div>{row.productsBelongsToOrder.map(prdct=>(
                    <div className='border border-3 p-3 m-4'>
    
                      <h1 className='font-bold'>Product Name: {prdct.products.name}</h1>
                      <h1 className='font-bold'>Delivery Status: {prdct.deliveryStatus}</h1>
                      <h1 className='font-bold'>Product Quantity: {prdct.productQuantity}</h1>
                      <h1 className='font-bold'>Product Price: {prdct.products.price}</h1>
                      <h1 className='font-bold'>Product Stock: {prdct.products.stock? 'In Stock':'Out of Stock'}</h1>
                      
                    </div>
                    
                ))}
                 </div>
               
                </div>
              </Typography>
            </Popover>
          </div>
          )
    
        }
      
    },
    {
      name: 'Select Courier',
      cell: (row) =>{
        const [selectedValue, setSelectedValue] = useState('');

  
        const handleChange = (event) => {
          
          setSelectedValue(event.target.value);
        };
        return(
            <div className="mt-5 p-3">
          
          <select id="courier" name="courier" value={selectedValue} onChange={handleChange} className="w-full px-4 py-1 border rounded focus:outline-none focus:border-blue-500">
            <option value="">Select Courier</option>
            <option value="e-kart">E-Kart</option>
            <option value="ecom-express">Ecom-Express</option>
            <option value="delhivery">Delhivery</option>
            
          </select>
          <p className="mt-2">You selected: {selectedValue}</p>
        </div>
          )
      }
      
    },
    {
        name:'Action',
        cell: row =>{ 

            const [dis,SetDis]=useState("");

            const handleClick =()=>{
                SetDis("disabled")
                console.log(dis);
            }

            // 
            return(
                <button 
            type="button" 
            className={`border border-2 rounded-md p-2 hover:bg-gray-100 font-bold ${dis ? 'cursor-not-allowed' : ''}`} 
            onClick={handleClick}
            disabled={dis} // Disabling the button
        >
            Proceed To Ship
        </button>
            )},

    }
    
    



  ];



  
  

 

  return (
   
    

    <DataTable
			columns={columns}
			data={data}
      pagination
      
		/>
    
  );
}

export default NewOrders