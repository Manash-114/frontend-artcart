import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { uploadImageToCloudinary } from "../../../apiCalls/uploadImageToCloudinary";
import { useSelector } from "react-redux";
import { BASE_URL_LOCAL } from "../../../apiCalls/common-db";
import Spinner from "../../common/Spinner";

const AddProduct = () => {
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
    fetch(`${BASE_URL_LOCAL}/api/category`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProductCategory(res);
      });
  }, []);
  return (
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
  );
};

export default AddProduct;

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
