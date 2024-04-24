import { addProduct } from "./seller/addProduct";

export const uploadImageToCloudinary = async (
  files,
  data,
  token,
  setIsLoading
) => {
  const productImagesUrl = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "artcart");
      data.append("cloud_name", "dqhrisflx");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqhrisflx/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const resData = await res.json();
      productImagesUrl.push(resData.url);
    }
    //   console.log(productImagesUrl);
    data["productImages"] = productImagesUrl;
    const jsonData = JSON.stringify(data);
    //   now send this data to backend along with other data
    addProduct(jsonData, token, setIsLoading);
  } catch (e) {
    console.log(e);
    alert("server error");
  }
};
