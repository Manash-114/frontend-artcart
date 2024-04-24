import { BASE_URL_LOCAL } from "../common-db";


export const updateProduct = async (data, token, setIsLoading,pID) => {
  
  const res = await fetch(`${BASE_URL_LOCAL}/api/seller/update-product/${pID}`, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    const resData = await res.json();
    setIsLoading(false);
    alert("Product Update successfully");
    
    console.log(resData);
  } else {
    alert("Internal server error while updating product");
  }
};
