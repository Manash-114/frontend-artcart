import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchProducts } from '../../reduxToolkit/features/productList/ProductSlice'
import { Rating } from '@mui/material'


const ProductList = () => {
  const [value, setValue] = useState(2);
  const dispatch = useDispatch()
  const product = useSelector(state => state.product)
  console.log(product)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <Container>
      {product.loading && <div>Loading...</div>}
      {!product.loading && product.products.length ? (

        product.products.map((p) => {
          return (
            <GridItem key={p.id} className={`grid-items`}>
              <div className="image">
                <img src={p.image} alt='image'></img>
              </div>
              <div className="content">
                <div className="rate">
                  <Rating
                    className='star'
                    size='small'
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  ({p.rating.rate})
                </div>
                <div className="miniContainer">
                  <div className="dp">
                    <img src='public/images/profile.png' alt='profile'></img>
                  </div>
                  <div className="subContent">
                    <div className="title">{p.title.slice(0, 35)}..</div>
                    <div className="price"> {p.price}</div>

                  </div>

                </div>
                <span id='author'>{p.category}</span>
              </div>
            </GridItem>

          )
        })

      ) : null}
    </Container>
  )
}

export default ProductList

const Container = styled.section`
   
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   height: 100%;
   grid-gap: 20px 10px;
`
const GridItem = styled.div`
  border: 1px solid black;
  height: 330px;
  width: 85%;
  
  .image{
    border: 1px solid black;
    height: 70%;
    padding-top: 10px;
  }
  img{
    height: 80%;
    width: 100%;
    object-fit: contain;
  }
  .miniContainer{
    display: flex;
  }
  .dp{
    flex: 0.2;
    padding-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 25px;
      width: 25px;
    }
  }
  .subContent{
    flex: 1;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .title{
    font-weight: 540;
    font-size: 12px;
  }
  .price{
    color: green;
    font-weight: bold;
    font-size: 14px;
  }
  .star{
    padding-left: 10px;
  }
  #author{
    font-weight: 500;
    font-size: 13px;
    padding-left: 20%;
  }
`
