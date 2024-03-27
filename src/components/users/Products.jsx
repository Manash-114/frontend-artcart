  import React from 'react'
  import styled from 'styled-components'

  const Products = () => {
    return (
      
      <Container>
        <ImageSection>
          <h1>Shop for art from creators you love</h1>
        </ImageSection>
        <FilterTop>
          <div className="filter-content">
            <div className="title">a</div>
            <div className="search">b</div>
            <div className="sort">c</div>
          </div>
        </FilterTop>
        <SubContainer>
        <LeftFilter>Filters</LeftFilter>
        <ProductContainer>
          
        </ProductContainer>
        </SubContainer>
        

      </Container>
    )
  }

  export default Products

  const Container = styled.div`
    height: 100vh;

  `
  const ImageSection = styled.div`
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.023), rgba(0, 0, 0, 0.393)), url('public/images/theme1.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    h1{
      font-size: 45px;
      width: 50%;
      text-align: center;
    }
  `
  const FilterTop = styled.div`
    height: 200px;
    background-color: aqua;
  `
  const SubContainer = styled.div``
  const LeftFilter = styled.div``
  const ProductContainer = styled.div``
