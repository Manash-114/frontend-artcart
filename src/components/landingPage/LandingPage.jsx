import React from 'react'
import Header from '../common/Header'
import HeroSection from './HeroSection'
import Footer from '../common/Footer'
import SliderSection from './SliderSection'
import Categories from './Categories'
import { categories } from './data'
import Services from './Services'
import Footer2 from '../common/Footer2'
import FeaturedProducts from './FeaturedProducts'

const 
LandingPage = () => {
  return (
    <div>
   
      <Header/>
      <SliderSection />
      <Categories data={categories}/>
      <Services />
       <HeroSection /> 
        <FeaturedProducts />
       <Footer2 /> 
    </div>
  )
}

export default LandingPage
