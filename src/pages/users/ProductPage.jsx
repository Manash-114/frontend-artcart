import React from 'react'
import Header from '../../components/common/Header'
import Footer2 from '../../components/common/Footer2'
import Products from '../../components/users/Products'


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
