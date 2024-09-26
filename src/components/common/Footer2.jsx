import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer2 = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-300 to-blue-400 py-10">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section - Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/Logo.jpg"
                alt="logo-image"
                className="h-12 w-12 rounded-full"
              />
              <p className="text-teal-600 font-semibold text-xl">Artcart</p>
            </div>
            <p className="mt-4 max-w-xs text-gray-600">
              Discover Your Perfect Piece: Uncover the Beauty of Art on Artcart
              Today!
            </p>
            <ul className="mt-8 flex gap-6">
              {/* Social Icons */}
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon className="h-6 w-6" />
                </a>
              </li>
              {/* Add other social icons here */}
            </ul>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Grow With Us</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Become A Seller
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Become Affiliate
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Meet the Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Helpful Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:text-gray-900"
                  >
                    Returns Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <p className="text-xs text-gray-500 text-center">
          &copy; 2024. Artcart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
