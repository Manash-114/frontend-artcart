import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { addProduct } from "../../../reduxToolkit/features/sellerSlice";
import { logOut } from "../../../reduxToolkit/features/auth/authSlice";

const AddProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const token = useSelector((store) => store.auth.token);
  const productCategory = useSelector((store) => store.product.productCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    stock: true,
    category: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!productData.name) {
      formErrors.name = "Product name is required.";
    }
    if (!productData.price || productData.price <= 0) {
      formErrors.price = "Valid price is required.";
    }
    if (!productData.description) {
      formErrors.description = "Product description is required.";
    }
    if (!productData.category) {
      formErrors.category = "Product category is required.";
    }
    if (productImages.length === 0) {
      formErrors.images = "At least one product image is required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const dispatch = useDispatch();
  const uploadImageToCloudinary = async (files) => {
    const productImagesUrl = [];
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
        productImagesUrl.push(resData.url);
      }
      return productImagesUrl;
    } catch (e) {
      toast.error("Error in uploading images try again after some time.");
      return null;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const productImage = await uploadImageToCloudinary(productImages);
      try {
        if (productImage !== null) {
          const dataToBeSent = { ...productData, productImages: productImage };
          const res = await dispatch(
            addProduct({ data: dataToBeSent })
          ).unwrap();
          console.log(res);
        } else {
          toast.error("Try again later.");
        }
      } catch (error) {
        console.log("server error ", error);
        if (error === "Invalid refresh token") {
          dispatch(logOut());
        }
      }

      setProductData({
        name: "",
        price: "",
        description: "",
        stock: true,
        category: "",
      });
      setProductImages([]);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-screen items-center justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Add New Product
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in the details to add a new product.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Product Name */}
            <div>
              <label
                htmlFor="pName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <div className="mt-1">
                <input
                  id="pName"
                  name="pName"
                  type="text"
                  value={productData.name}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      name: e.target.value,
                    });
                  }}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="pPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1">
                <input
                  id="pPrice"
                  name="pPrice"
                  type="number"
                  value={productData.price}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      price: e.target.value,
                    });
                  }}
                  className={`w-full px-3 py-2 border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    });
                  }}
                  className={`w-full px-3 py-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="productCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={productData.category}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    category: e.target.value,
                  });
                }}
                className={`w-full px-3 py-2 mt-1 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="">Select a category</option>
                {productCategory.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Product Images */}
            <div>
              <label
                htmlFor="pImage"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images
              </label>
              <input
                type="file"
                id="pImage"
                name="pImage"
                accept=".jpg, .jpeg, .png, .webp"
                multiple
                className="mt-2 w-full text-sm text-gray-500"
                onChange={(e) => {
                  setProductImages(e.target.files);
                }}
              />
              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
