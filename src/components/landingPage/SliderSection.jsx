import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { sliderItems } from "./data";
import { useNavigate } from "react-router-dom";

const SliderSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="w-full h-[90vh] flex relative overflow-hidden bg-gradient-to-b from-black/10 to-black/50">
      {/* Left Arrow */}
      <div
        className="w-12 h-12 bg-white flex justify-center items-center rounded-full absolute top-0 bottom-0 m-auto left-2 cursor-pointer opacity-50 z-10"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlined />
      </div>

      {/* Slides Wrapper */}
      <div
        className="flex h-full transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className="w-screen h-full flex items-center bg-gradient-to-br from-gray-700 to-gray-900"
          >
            {/* Image Container */}
            <div className="h-full flex-1 bg-gradient-to-br from-gray-500/50 via-gray-900/50 to-black/85">
              <img
                className="h-full w-full object-cover"
                src={item.img}
                alt={item.title}
              />
            </div>

            {/* Info Container */}
            <div
              className="flex-1 h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-700/50 to-gray-900/70 text-white"
              style={{ backgroundImage: `url('./images/background.jpg')` }}
            >
              <h1 className="text-5xl mb-4 text-center">{item.title}</h1>
              <p className="text-lg font-medium text-center mb-6 px-6 md:px-20">
                {item.desc}
              </p>
              <button
                onClick={() => {
                  navigate("/products");
                }}
                className="px-6 py-2 text-lg border-2 border-orange-500 text-white hover:bg-orange-500 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <div
        className="w-12 h-12 bg-white flex justify-center items-center rounded-full absolute top-0 bottom-0 m-auto right-2 cursor-pointer opacity-50 z-10"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default SliderSection;
