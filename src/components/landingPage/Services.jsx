import React from "react";

const Services = () => {
  return (
    <section className="h-auto bg-inherit py-10">
      <h1 className="text-3xl font-semibold text-center text-green-100 mb-6">
        Services
      </h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-24">
        <div className="delivery-container bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg p-6 shadow-md text-center">
          <div
            className="image-section bg-cover bg-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4"
            style={{ backgroundImage: "url('./images/de.png')" }}
          />
          <h1 className="text-xl font-semibold">Free Delivery</h1>
          <p className="mt-2 text-sm font-medium">
            Free Shipping on Orders above 500
          </p>
        </div>

        <div className="delivery-container bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg p-6 shadow-md text-center">
          <div
            className="image-section bg-cover bg-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4"
            style={{ backgroundImage: "url('./images/pay.png')" }}
          />
          <h1 className="text-xl font-semibold">Safe Payment</h1>
          <p className="mt-2 text-sm font-medium">Secure Payment Gateway</p>
        </div>

        <div className="delivery-container bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg p-6 shadow-md text-center">
          <div
            className="image-section bg-cover bg-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4"
            style={{ backgroundImage: "url('./images/s.png')" }}
          />
          <h1 className="text-xl font-semibold">Support</h1>
          <p className="mt-2 text-sm font-medium">24/7 Customer Support</p>
        </div>

        <div className="delivery-container bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg p-6 shadow-md text-center">
          <div
            className="image-section bg-cover bg-center h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4"
            style={{ backgroundImage: "url('./images/re.png')" }}
          />
          <h1 className="text-xl font-semibold">Return Policy</h1>
          <p className="mt-2 text-sm font-medium">30-Days Return Guarantee</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
