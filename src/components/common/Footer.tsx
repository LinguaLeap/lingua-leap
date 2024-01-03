// Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="content-wrapper mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:border-b-2 hover:border-white transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="text-white hover:border-b-2 hover:border-white transition-all duration-300"
          >
            About Us
          </Link>

          <Link
            to="/contact-us"
            className="text-white hover:border-b-2 hover:border-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-cyan-500 transition-all duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-cyan-500 transition-all duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-cyan-500 transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-cyan-500 transition-all duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
