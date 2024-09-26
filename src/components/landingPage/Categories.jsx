import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ data }) => {
  return (
    <section className="h-[80vh] bg-gradient-to-t from-black/60 to-gray-800/5">
      <h2 className="text-2xl font-semibold text-center text-white mt-16 mb-10">
        Featured Category
      </h2>

      <div className="grid grid-cols-3 grid-rows-2 gap-4 px-24 h-[75%]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 bg-cover bg-center flex justify-center items-center text-2xl text-white`}
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <Link to={`/products/${item.cat}`} className="absolute inset-0" />
            <button className="uppercase bg-black/50 text-gray-300 py-2 px-6 transition-shadow duration-300 hover:shadow-lg text-sm sm:text-base md:text-lg lg:text-xl">
              {item.cat}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
