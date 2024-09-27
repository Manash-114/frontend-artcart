import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import {
  fetchSellerProducts,
  updateProduct,
} from "../../../reduxToolkit/features/sellerSlice";
import toast, { Toaster } from "react-hot-toast";
import { logOut } from "../../../reduxToolkit/features/auth/authSlice";
import { CircularProgress } from "@mui/material";

const ManageProducts = () => {
  const data = useSelector((store) => store.seller.allProducts);
  const dispatch = useDispatch();
  const [rowLoading, setRowLoading] = useState({}); // Tracks loading state per row

  const uploadImageToCloudinary = async (files, productId) => {
    const productImagesUrlFromCloudinary = [];
    setRowLoading((prevState) => ({
      ...prevState,
      [productId]: { ...prevState[productId], isLoadingForCloud: true },
    }));

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "artcart");
        formData.append("cloud_name", "dqhrisflx");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqhrisflx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const resData = await res.json();
        productImagesUrlFromCloudinary.push(resData.url);
      }

      setRowLoading((prevState) => ({
        ...prevState,
        [productId]: { ...prevState[productId], isLoadingForCloud: false },
      }));
      return productImagesUrlFromCloudinary;
    } catch (e) {
      toast.error("Error in uploading images. Try again.");
      setRowLoading((prevState) => ({
        ...prevState,
        [productId]: { ...prevState[productId], isLoadingForCloud: false },
      }));
      return [];
    }
  };

  const handleUpdateProduct = async (productData) => {
    setRowLoading((prevState) => ({
      ...prevState,
      [productData.productId]: {
        ...prevState[productData.productId],
        isLoading: true,
      },
    }));

    try {
      const res = await dispatch(
        updateProduct({ data: productData, productId: productData.productId })
      ).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      }
    } finally {
      setRowLoading((prevState) => ({
        ...prevState,
        [productData.productId]: {
          ...prevState[productData.productId],
          isLoading: false,
        },
      }));
    }
  };

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
        const [anchorEl, setAnchorEl] = useState(null);
        const [productImages, setProductImages] = useState([]);
        const [productData, setProductData] = useState({
          productId: row.id,
          name: row.name,
          price: row.price,
          description: row.description,
          stock: row.stock,
        });
        const [showImageTag, setShowImageTag] = useState(false);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const open = Boolean(anchorEl);
        const id = open ? "simple-popover" : undefined;

        const handleClose = () => {
          setAnchorEl(null);
          setShowImageTag(false);
        };

        const handleFormSubmit = async (e) => {
          e.preventDefault();
          if (showImageTag) {
            const productImagesUrl = await uploadImageToCloudinary(
              productImages,
              productData.productId
            );
            if (productImagesUrl.length !== 0) {
              productData["productImages"] = productImagesUrl;
              handleUpdateProduct(productData);
              handleClose();
            } else {
              toast.error("Error in uploading file. Try again.");
            }
          } else {
            const productImagesUrl = row.productImages.map((img) => img.name);
            productData["productImages"] = productImagesUrl;
            handleUpdateProduct(productData);
            handleClose();
          }
        };

        const isRowLoading = rowLoading[row.id] || {};

        return (
          <div>
            <Button
              aria-describedby={id}
              variant="contained"
              className="bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              onClick={handleClick}
            >
              {isRowLoading.isLoading || isRowLoading.isLoadingForCloud ? (
                <Spinner />
              ) : (
                "Edit Product"
              )}
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
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
                        onChange={() => setShowImageTag(!showImageTag)}
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
                    {isRowLoading.isLoadingForCloud && <Spinner />}
                  </form>
                </div>
              </Typography>
            </Popover>
          </div>
        );
      },
    },
  ];

  const fetchProducts = async () => {
    try {
      await dispatch(fetchSellerProducts()).unwrap();
    } catch (error) {
      if (error === "Invalid refresh token") {
        dispatch(logOut());
      } else {
        console.log("Server error ", error);
      }
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Manage Products
        </h1>
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
    </>
  );
};

export default ManageProducts;
