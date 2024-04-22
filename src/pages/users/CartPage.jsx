import React, { useEffect } from 'react'
import Cart from '../../components/users/Cart'
import Header from '../../components/common/Header'
import Footer2 from '../../components/common/Footer2'

const CartPage = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <div>
      <Header />
      <Cart/>
      <Footer2/>
    </div>
  )
}

export default CartPage
