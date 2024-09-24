import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { uploadImageToCloudinaryForUpdate } from "../../../apiCalls/uploadImageToCloudinaryForUpdate";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const data = useSelector((store) => store.seller.allProducts);

  const columns = [
    {
      name: "Product Name",
      cell: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      cell: (row) => `₹ ${row.price}`,
      sortable: true,
    },
    {
      name: "Stock",
      cell: (row) => (row.stock === true ? "In Stock" : "Out of Stock"),
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
        const [showImageTag, SetShowImageTag] = useState(false);
        const [productImages, setProductImages] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [productData, setProductData] = useState({
          name: row.name,
          price: row.price,
          description: row.description,
          stock: row.stock,
        });

        const handleClick1 = (event) => {
          setAnchorEl1(event.currentTarget);
        };

        const handleClose1 = () => {
          setAnchorEl1(null);
          SetShowImageTag(false);
          setIsLoading(false);
        };

        const open1 = Boolean(anchorEl1);
        const id1 = open1 ? "simple-popover" : undefined;

        const handleFormSubmit = (e) => {
          e.preventDefault();
          setIsLoading(true);

          if (showImageTag) {
            uploadImageToCloudinaryForUpdate(
              productImages,
              productData,
              token,
              setIsLoading,
              pID
            );
          } else {
            const productImagesUrl = row.productImages.map((img) => img.name);
            productData["productImages"] = productImagesUrl;
            updateProduct(
              JSON.stringify(productData),
              token,
              setIsLoading,
              row.id
            );
          }
        };

        return (
          <div>
            <Button
              aria-describedby={id1}
              variant="contained"
              className="bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              onClick={handleClick1}
            >
              Edit Product
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
              className="w-full"
            >
              <Typography sx={{ p: 2 }}>
                <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Update Product
                  </h2>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="pName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                      <input
                        id="pName"
                        name="pName"
                        type="text"
                        required
                        value={productData.name}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            name: e.target.value,
                          })
                        }
                        className="p-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="pPrice"
                        className="text-sm font-medium text-gray-700"
                      >
                        Product Price
                      </label>
                      <input
                        id="pPrice"
                        name="pPrice"
                        type="number"
                        required
                        value={productData.price}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            price: e.target.value,
                          })
                        }
                        className="p-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="inStock"
                          name="stockStatus"
                          value={true}
                          checked={productData.stock === true}
                          onChange={() =>
                            setProductData({ ...productData, stock: true })
                          }
                          className="form-radio"
                        />
                        <label
                          htmlFor="inStock"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          In Stock
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="outOfStock"
                          name="stockStatus"
                          value={false}
                          checked={productData.stock === false}
                          onChange={() =>
                            setProductData({ ...productData, stock: false })
                          }
                          className="form-radio"
                        />
                        <label
                          htmlFor="outOfStock"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          Out of Stock
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="pDes"
                        className="text-sm font-medium text-gray-700"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="pDes"
                        name="pDes"
                        required
                        value={productData.description}
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            description: e.target.value,
                          })
                        }
                        className="p-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showImage"
                        checked={showImageTag}
                        onChange={() => SetShowImageTag(!showImageTag)}
                        className="form-checkbox"
                      />
                      <label htmlFor="showImage" className="ml-2 text-sm">
                        Change Product Image?
                      </label>
                    </div>

                    {showImageTag && (
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="pImage"
                          className="text-sm font-medium text-gray-700"
                        >
                          Upload New Product Images
                        </label>
                        <input
                          type="file"
                          id="pImage"
                          name="pImage"
                          accept=".jpg, .jpeg, .png, .webp"
                          multiple
                          className="block w-full border border-gray-300 rounded-md"
                          onChange={(e) => setProductImages(e.target.files)}
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                      Update Product
                    </button>

                    {isLoading && <Spinner />}
                  </form>
                </div>
              </Typography>
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Products</h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={{
          rows: {
            style: {
              minHeight: "64px",
              fontSize: "16px",
            },
          },
          headCells: {
            style: {
              fontWeight: "bold",
              fontSize: "18px",
            },
          },
        }}
      />
    </div>
  );
};

export default ManageProducts;
