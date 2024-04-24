import { BASE_URL_LOCAL } from "../common-db";

export const addProduct = async (data, token, setIsLoading) => {
  const res = await fetch(`${BASE_URL_LOCAL}/api/seller/add-product`, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 201) {
    const resData = await res.json();
    setIsLoading(false);
    alert("Product add successfully");
    console.log(resData);
  } else {
    alert("Internal server error while adding product");
  }
};
