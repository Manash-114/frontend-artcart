import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { uploadImageToCloudinary } from "../../../apiCalls/uploadImageToCloudinary";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [showProductName, setShowProductName] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const token = useSelector((store) => store.auth.token);
  const handleCheckboxChange = () => {
    setShowProductName(!showProductName);
  };

  const handleFormSubmit = (e) => {
    const data = {
      name: "p1001",
      price: 3,
      description: "des2",
      stock: true,
      category: 2,
    };
    e.preventDefault();
    console.log("form submit");
    console.log(productImages);
    uploadImageToCloudinary(productImages, data, token);
  };

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <label htmlFor="productName">Product Name:</label>
      <input type="text" id="productName" name="productName" required />

      <label htmlFor="productPrice">Product Price:</label>
      <input type="number" id="productPrice" name="productPrice" required />

      <label htmlFor="productCategory">Product Category</label>
      <select id="productCategory" name="productCategory">
        <option value="Sketch">Sketch</option>
        <option value="Water Color">Water Color</option>
      </select>
      <label htmlFor="productDescription">Product Description:</label>
      <textarea
        id="productDescription"
        name="productDescription"
        rows="4"
        required
      ></textarea>

      <label htmlFor="sellerImage">
        Product Images {`(*Select multiple image)`}
      </label>
      <input
        type="file"
        id="sellerImage"
        name="sellerImage"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={(e) => {
          setProductImages(e.target.files);
        }}
      />

      <input type="submit" value="Confirm to add " />
    </StyledForm>
  );
};

export default AddProduct;

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-image: url("images/face.png"); /* Replace "images/face.png" with the path to your image */
  background-size: cover; /* Adjust background size as needed */
  background-position: center; /* Adjust background position as needed */

  select {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 15px;
  }

  label {
    width: 100%;
  }

  input[type="text"],
  input[type="number"],
  input[type="file"],
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }

  input[type="submit"] {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #0056b3;
  }
`;
