import React from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Test = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Carousel>
      <h2>Carousal tutorial</h2>

      <Slider {...settings}>
      <div className="box">
        <h3>1</h3>
      </div>
      <div className="box">
        <h3>2</h3>
      </div>
      <div className="box">
        <h3>3</h3>
      </div>
      <div className="box">
        <h3>4</h3>
      </div>
      <div className="box">
        <h3>5</h3>
      </div>
      </Slider>
    </Carousel>
  )
}

export default Test
const Carousel = styled.div`
  padding: 5rem;
  background-color: #7b7878;
  color: #fff;
  height: 100vh;

  .box{
    background-Color: #60b060;
    height: 300px;
  }
  .box h3{
    text-align: center;
  }
  .slick-slide div{
    margin: 0 1rem;
  }
  .slick-next{
    right: 20px !important;
  }
  .slick-prev{
    left: 40px !important;
    z-index: 99;
  }
  .slick-dots li.slick-active button:before{
    color: #5dcf5d !important;
  }
  .slick-dots li button:before{
    color: #fff;
    font-size: 1rem;
    top: 2rem;
  }
`