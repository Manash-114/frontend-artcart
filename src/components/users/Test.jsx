import React from 'react'
import styled from 'styled-components';
import { images } from '../landingPage/data';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';

const Test = () => {
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
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
    <Container>
      <Wrapper>
              <Slider {...settings}>
              {images.map((item) =>(
                   <div className="card">
                    <img src={item.image} alt={item.id} />
                 </div>
              ))}
              </Slider>
 
            </Wrapper>
            </Container>
  )
}

export default Test

const Container = styled.div`
  background-color: aqua;
  height: 100vh;
`
const Wrapper = styled.div`
  width: 70%;
  margin: 10px auto;
  padding: 20px 0;

  .card{
    height: 500px;
  }
  .card > img{
    height: 100%;
    width: 98%;
    object-fit: cover;
  }

 
  .slick-slider{
    .slick-arrow{
      z-index: 100;
      height: 9%;
      width: 5%;
      border-radius: 50%;
      background-color: #dfeca1b9;
    }
  }
`