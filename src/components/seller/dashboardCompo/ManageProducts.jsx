import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import DataTable from "react-data-table-component";
import { updateAllProduct } from "../../../reduxToolkit/features/sellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_LOCAL } from "../../../apiCalls/common-db";
import { getAllProducts } from "../../../apiCalls/seller/getAllProducts";
import { updateProduct } from "../../../apiCalls/seller/updateProduct";
import Spinner from "../../common/Spinner";

import { uploadImageToCloudinaryForUpdate } from "../../../apiCalls/uploadImageToCloudinaryForUpdate";
import { useNavigate } from 'react-router-dom';




const ManageProducts = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.seller.allProduct);
  useEffect(() => {
    getAllProducts(token, dispatch);
  }, []);

  const columns = [
    {
      name: "Product Name",
      cell: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      cell: (row) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      cell: (row) => (row.price ? "inStock" : "Out of Stock"),
      sortable: true,
    },
    {
      name: "Category",
      cell: (row) => row.category.name,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => {
        const [anchorEl1, setAnchorEl1] = useState(null);
        const [pID,SetPID]=useState("");
        const [showImageTag,SetShowImageTag]=useState(false);
        

        const handleClick1 = (event) => {
          setAnchorEl1(event.currentTarget);
          SetPID(row.id);
          console.log(row.id);
        };
        const handleClose1 = () => {
          setAnchorEl1(null);
          SetShowImageTag(false)
          setIsLoading(false);
        };

        const open1 = Boolean(anchorEl1);

        const id1 = open1 ? "simple-popover" : undefined;

        // const [selectedValue, setSelectedValue] = useState("");

        // const handleChange = (event) => {
        //   setSelectedValue(event.target.value);
        // };

        const [showProductName, setShowProductName] = useState(false);
        const [productImages, setProductImages] = useState([]);
        const token = useSelector((store) => store.auth.token);
        
        const [isLoading, setIsLoading] = useState(false);
        const [productData, setProductData] = useState({
          name: row.name,
          price: row.price,
          description: row.description,
          stock: row.stock,
          
        });

        const navigate=useNavigate();

        const handleFormSubmit = (e) => {
         

          e.preventDefault();
          setIsLoading(true);
          console.log("form submit " + JSON.stringify(productData));
          // console.log(productImages);

          //if check for image update
          if(showImageTag)
                      uploadImageToCloudinaryForUpdate(productImages, productData, token, setIsLoading,pID);
          else{
            
            const productImagesUrl = [];
            row.productImages.map((productImage) => productImagesUrl.push(productImage.name));
            productData["productImages"] = productImagesUrl;
            const updatedProductData = { ...productData, productImages: productImagesUrl };
            setProductData(updatedProductData)
            const jsonData = JSON.stringify(updatedProductData);
            console.log(jsonData);
            updateProduct(jsonData,token,setIsLoading,pID)
          }

          window.location.reload();
          



          

         
          
          
          // updateProduct = async (data, token, setIsLoading,pID) => {

        };

       
      
        



        return (
          <div className="m2-2 ">
            <Button
              aria-describedby={id1}
              variant="contained"
              onClick={handleClick1}
            >
              Edit Product Details
            </Button>
            <Popover
              id={id1}
              open={open1}
              anchorEl={anchorEl1}
              onClose={handleClose1}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Update Product Details
                    </h2>
                  </div>

                  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" method="POST" onSubmit={handleFormSubmit} >
                      <div>
                        <label
                          for="pName"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Name
                        </label>
                        <div class="mt-2">
                          <input
                            id="pName"
                            name="pName"
                            type="text"
                            autocomplete="pName"
                            required
                            
                            value={productData.name}
                            onChange={(e) => {
                              setProductData({
                                ...productData,
                                ["name"]: e.target.value,
                              });
                            }}
                            class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="pPrice"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Price
                        </label>
                        <div class="mt-2">
                          <input
                            id="pPrice"
                            name="pPrice"
                            type="number"
                            autocomplete="pPice"
                            required
                            value={productData.price}
                            onChange={(e) => {
                              setProductData({
                                ...productData,
                                ["price"]: e.target.value,
                              });
                            }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        
                        <input 
                        type="radio" 
                        id="inStock" 
                        name="stockStatus" 
                        className="" 
                        value={true}
                        onChange={
                          (e)=>{
                            setProductData({
                              ...productData,
                              ["stock"]: true,
                              
                            });
                            console.log(e.target.value)
                          }}
                          />
                        <label 
                        for="inStock" 
                        className="ml-2">In Stock</label>
                        <input 
                        type="radio" 
                        id="outOfStock" 
                        name="stockStatus" 
                        className="ml-5" 
                        onChange={
                          (e)=>{
                            setProductData({
                              ...productData,
                              ["stock"]: false,
                              
                            });
                            console.log(e.target.value)
                          }}
                          />
                        <label 
                        for="outOfStock" 
                        className="ml-2">Out of Stock</label>
                      </div>
                      

                      <div>
                        <div class="flex items-center justify-between">
                          <label
                            for="pDes"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Product Description
                          </label>
                        </div>
                        <div class="mt-2">
                          <textarea
                            id="password"
                            name="password"
                            type="text"
                            autocomplete="current-password"
                            required
                            value={productData.description}
                            onChange={(e) => {
                              setProductData({
                                ...productData,
                                ["description"]: e.target.value,
                              });
                            }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="showImage">Want to Change Product Image ?</label>
                        <input type="checkbox" className="ml-4" onChange={() => SetShowImageTag(!showImageTag)} />
                      </div>

                        
                     {
                      showImageTag && 
                      <div className="p-4 block w-[270px] rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <label htmlFor="ProductImage" className="">
                            Product Images {`(*Select multiple)`}
                          </label>
                          <input
                            type="file"
                            id="pImage"
                            name="pImage"
                            accept=" .jpg, .jpeg, .png ,.webp"
                            multiple
                            
                            className="mt-3"
                            onChange={(e) => {
                              setProductImages(e.target.files);
                              
                            }}
                          />
                       </div>
                     } 

                      <div>
                        <button
                          type="submit"
                          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update
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
              </Typography>
            </Popover>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} pagination />;
};

export default ManageProducts;
