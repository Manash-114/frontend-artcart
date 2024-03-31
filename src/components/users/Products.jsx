import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionDetails, AccordionSummary, Button, Pagination, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { categories, price } from '../landingPage/data';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';



const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedValue, setSelectedValue] = useState("");



  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  }

  const product = useSelector(state => state.product);
  console.log(product)
  const { products } = product;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const scrollToElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <Container>
      <ImageSection>
        <h1>Shop for art from creators you love</h1>
      </ImageSection>
      <FilterTop>
        <div className="filter-content" id='ref'>
          <div className="title">Product List (0)</div>
          <div className="search">
            <SearchIcon />
            <input type='text' placeholder='Search Arts' />
          </div>
          <div className="sort">

            <label htmlFor="dropdown">Sort By </label>

            <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
              <option value="default">Select Option</option>
              <option value="ascending">Low to High</option>
              <option value="descending">High to Low</option>
            </select>
          </div>
        </div>
      </FilterTop>
      <SubContainer>

        <LeftFilter>
          <h2>Filter</h2>
          <Accordion

          >
            <AccordionSummary >
              <Typography variant='h5' id='category'>Categories <ArrowDropDownIcon /></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  categories.map((item, index) => (
                    <List>
                      <Button key={index} variant='outlined'>{item.title}</Button>
                    </List>
                  ))
                }
              </Typography>
            </AccordionDetails>

          </Accordion>
          <Accordion

          >
            <AccordionSummary >
              <Typography variant='h5' id='price'>Price <ArrowDropDownIcon /></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {
                  price.map((item, index) => (
                    <List key={item.id}>
                      <Button key={index} variant='outlined' color='success'>{item.range}</Button>
                    </List>
                  ))
                }
              </Typography>
            </AccordionDetails>

          </Accordion>

        </LeftFilter>

        {/* product-container */}
        <ProductContainer>
          <ProductList currentProducts = {currentProducts}/>
          <StyledPagination>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              color="primary"
              onChange={(event, page) => {setCurrentPage(page); scrollToElementById('ref');}}
            />
          </StyledPagination>
        </ProductContainer>
      </SubContainer>


    </Container>
  )
}

export default Products

const StyledPagination = styled.div`
border-top: 0.4px solid black;
padding: 12px;
 margin-top: 50px;
 display: flex;
 justify-content: center;
 align-items: center;
 font-weight: 500;
`
const List = styled.div`
  width: auto;
  height: auto;
`
const Container = styled.div`
  height: 220vh;
  `
const ImageSection = styled.div`
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.023), rgba(0, 0, 0, 0.393)), url('/images/theme1.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    
    h1{
      text-transform: uppercase;
      font-size: 40px;
      width: 50%;
      text-align: center;
    }
  `
const FilterTop = styled.div`
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    .filter-content{
      height: 60px;
      width: 100%;
      background-color: #e3ecec;
      display: flex;
      justify-content: space-between;
      padding: 0 15%;
      align-items: center;

    }
    .search{
        padding: 0 10px;
        width: 20%;
        height: 40px;
        background-color: white;
        border: 1px solid black;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        input{
          height: 32px;
          width: 100%;
          border: none;
          outline: none;
          font-size: 15px;
          font-weight: 400;
        }
      }
      .sort{
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #dropdown{
        margin-left: 10px;
        height: 35px;
        border-radius: 10px;
        width: 40%;
        padding-left: 10px;
      }
      
  `
const SubContainer = styled.div`
 
  padding: 10px 7%;
  display: flex;
  gap: 50px;
`
const LeftFilter = styled.div`
  background-color: #e5ebeb91;
  display: flex;
  flex-direction: column;
  
  padding: 10px;
  flex: .3;
  border: 1px solid black;

  h2{
    
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 40px;
  }
  #category{
    width: 100%;
    display: flex;
    font-size: 16px;
    font-weight: 540;
    text-transform: uppercase;
    justify-content: space-between;
  }
  #price{
    width: 100%;
    display: flex;
    font-size: 16px;
    font-weight: 540;
    text-transform: uppercase;
    justify-content: space-between;
  }
  Button{
    font-size: 14px;
    font-weight: 530;
    width: 90%;
    margin-left: 20px;
  }

 
`
const ProductContainer = styled.div`
  flex: 1.1;
 
`
