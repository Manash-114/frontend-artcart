import React from 'react'

const Footer = () => {
  return (
    <>
        <footer class="w-full h-36 bg-gray-900  text-white mb-0 p-3 pb-6
         flex flex-col md:flex-row flex-wrap justify-evenly md:px-12">
            <div class="flex flex-wrap flex-col justify-evenly  ">
                <div class="font-serif text-2xl font-bold text-indigo-600">ArtCart</div>
                <p class="font-bold cursor-pointer ">Email us : support@artcart.com</p>
                <img src="" alt=""/>
            </div>
            <div class="flex flex-wrap flex-col justify-evenly  ">
                <h2 class="font-bold text-xl mt-2">ArtCart</h2>
                <div class="w-32 h-1 border-b-2 border-yellow-400
                 rounded-2xl my-1">
                 
                </div>
                <div>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">About us</p>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">FAQS</p>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">Privacy Policy</p>
                </div>

                
            </div>
            <div class="flex flex-wrap flex-col justify-evenly  ">
                <h2 class="font-bold text-xl mt-2">Follow Us</h2>
                <div class="w-32 h-1 border-b-2 border-yellow-400
                 rounded-2xl my-1">
                 
                </div>
                <div>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">IG</p>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">FB</p>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">Twitter</p>
                </div>
                
                
            </div>
            <div class="flex flex-wrap flex-col justify-evenly  ">
                <h2 class="font-bold text-xl mt-2">Grow with us</h2>
                <div class="w-32 h-1 border-b-2 border-yellow-400
                 rounded-2xl my-1">
                 
                </div>
                <div>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">Be a Seller</p>
                    <p class="cursor-pointer font-semibold hover:text-indigo-500">Become an Affiliate</p>
                   
                </div>
                
                
            </div>
            
        </footer>
        <div class="bg-gray-900 text-center text-gray-300 p-7">All @copyright reserved 2024</div>
    </>
  )
}

export default Footer