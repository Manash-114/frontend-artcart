import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from '../landingPage/data';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuggestedProducts = () => {

    const {id} = useParams();
    const products = useSelector(state => state.product)

    const selectedProducts = products.products.find(product => product.id === parseInt(id))
    
    const similarProducts  = products.products.filter(individualProduct => individualProduct.category === selectedProducts.category && individualProduct.id !== selectedProducts.id)

    
    const FilterItems = similarProducts.slice(0,5);
    console.log(FilterItems)

   

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
            <h4>Suggested Features</h4>
            <Wrapper>
                <Slider {...settings}>
                    {FilterItems.map((item) => (
                        <div className="card" key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />
                        </div>
                    ))}
                </Slider>
            </Wrapper>
        </Container>
    )
}

export default SuggestedProducts

const Container = styled.section`
    background-color: #f5fafa;
    height: 80vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h4{
        text-transform: uppercase;
    }
`
const Wrapper = styled.div`
    
  width: 70%;
  margin: 10px auto;
  padding: 20px 0;
    
  .card{
    height: 380px;
    border: 1px solid black;
  }
  .card > img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
    transition: transform 0.3s, box-shadow 0.3s; 
  }


img:hover {
  
    transform: scale(0.9);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); 
}

  .slick-slider{
    .slick-arrow{
      z-index: 100;
      height: 14%;
      width: 5%;
      border-radius: 50%;
      background-color: #cea1ecd2;
    }
  }
`