import React, { useEffect } from "react";
// import { getAllUnapprovedSeller } from "../../api/getAllUnapprovedSeller";

const ManageSeller = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    // getAllUnapprovedSeller(token);
  }, []);
  return (
    <div className="flex p-4">
      {/* left side */}
      <div className="border-2 border-red-600 h-72 w-[25%]">
        <div className="bg-gray-300 h-12 m-2 text-center">
          <h1>View Request</h1>
        </div>
        <div className="bg-gray-300 h-12 m-2 text-center">
          <h1>List-of-seller</h1>
        </div>
      </div>

      {/* right side */}
      <div className="border-2 border-green-400 h-72 w-[70%]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Seller name
              </th>
              <th scope="col" class="px-6 py-3">
                Aadhaar No
              </th>
              <th scope="col" class="px-6 py-3">
                AadhaarImage
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">White</td>
              <td class="px-6 py-4">Laptop PC</td>
              <td class="px-6 py-4">$1999</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">Black</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSeller;
