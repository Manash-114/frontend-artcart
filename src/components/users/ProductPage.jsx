import React from 'react'
import Header from '../common/Header'
import Footer2 from '../common/Footer2'
import Products from './Products'
import ProductList from './ProductList'

const ProductPage = ({data}) => {
  return (
    <div>
      <Header />
      <Products />
      <Footer2 />
    </div>
  )
}

export default ProductPage
