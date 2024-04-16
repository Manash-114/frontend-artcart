import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminBody = () => {
  const navigate = useNavigate();

  const handleClickCategories = () => {
    console.log("clicked categories");
    navigate("/admin/categories");
  };

  const handleClickSeller = () => {
    console.log("clicked seller");
  };

  const handleClickCourier = () => {
    console.log("clicked courier");
  };
  return (
    <div className="border-2 border-green-600 flex justify-center items-center mt-5 h-full">
      <div className="border-4 bg-gray-500 p-3 w-[30%] h-52 flex flex-col justify-center items-center">
        <h2 className="font-semibold text-3xl">Manage Categories</h2>
        <img
          onClick={handleClickCategories}
          className="w-32 h-32 rounded-full mt-4"
          src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
          alt=""
        />
      </div>
      <div className="border-4 bg-gray-500 p-3 w-[30%] h-52 flex flex-col justify-center items-center">
        {/* <h2 className="font-semibold text-3xl">Manage Seller</h2> */}
        <Link className="font-semibold text-3xl" to={"/admin/manageseller"}>
          ManageSeller
        </Link>
        <img
          onClick={handleClickSeller}
          className="w-32 h-32 rounded-full mt-4"
          src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
          alt=""
        />
      </div>
      <div className="border-4 bg-gray-500 p-3 w-[30%] h-52 flex flex-col justify-center items-center">
        <h2 className="font-semibold text-3xl">Manage Courier</h2>
        <img
          onClick={handleClickCourier}
          className="w-32 h-32 rounded-full mt-4"
          src="https://cdn.pixabay.com/photo/2022/02/08/02/56/shipping-7000647_1280.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminBody;
