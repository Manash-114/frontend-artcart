import React from "react";

const HeroSection = () => {
  return (
    <section className="border-t border-yellow-500 h-[80vh] py-10 px-5 lg:px-16">
      <div className="container mx-auto h-full flex flex-col justify-center">
        {/* Hero Content */}
        <div className="hero-content py-8 lg:py-16">
          <h1 className="text-3xl lg:text-5xl font-bold capitalize text-white mb-8">
            Discover the endless possibilities of Artcart's unique marketplace
          </h1>

          <ul className="list-disc ml-4 space-y-4 text-lg text-gray-200">
            <li>
              Artcart connects buyers and sellers, providing a platform for art
              enthusiasts to buy and sell their creations.
            </li>
            <li>Find the perfect artwork for your collection</li>
            <li>Sell your art to a global audience</li>
            <li>Connect with fellow artists and art lovers</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
