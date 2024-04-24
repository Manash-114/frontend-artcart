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
import { getAllProducts } from "../../../apiCalls/seller/getAllProducts";

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

        const handleClick1 = (event) => {
          setAnchorEl1(event.currentTarget);
        };
        const handleClose1 = () => {
          setAnchorEl1(null);
        };

        const open1 = Boolean(anchorEl1);

        const id1 = open1 ? "simple-popover" : undefined;

        const [selectedValue, setSelectedValue] = useState("");

        const handleChange = (event) => {
          setSelectedValue(event.target.value);
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
                    <form class="space-y-6" action="#" method="POST">
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
                            value={row.name}
                            autocomplete="pName"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            value={row.price}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="stock" className="m-3 ml-0">
                          Stock
                        </label>
                        <input type="checkbox" />
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
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
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
                          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update
                        </button>
                      </div>
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
