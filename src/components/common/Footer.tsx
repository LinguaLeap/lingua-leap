// Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-600 dark:bg-sky-blue-800 text-white pt-8 pb-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white dark:text-opacity-85 hover:text-rich-navy dark:hover:text-teal-600 hover:border-white transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="text-white dark:text-opacity-85 hover:text-rich-navy dark:hover:text-teal-600 hover:border-white transition-all duration-300"
          >
            About Us
          </Link>

          <Link
            to="/contact-us"
            className="text-white dark:text-opacity-85 hover:text-rich-navy dark:hover:text-teal-600 hover:border-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-rich-navy dark:hover:text-teal-600 transition-all duration-300 dark:text-opacity-85"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-rich-navy dark:hover:text-teal-600 transition-all duration-300 dark:text-opacity-85"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-rich-navy dark:hover:text-teal-600 transition-all duration-300 dark:text-opacity-85"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg hover:text-rich-navy dark:hover:text-teal-600 transition-all duration-300 dark:text-opacity-85"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div>
        <div className="container mx-auto text-xs mt-4 text-center opacity-60">
          &copy; {new Date().getFullYear()} Language Exchange App
        </div>
      </div>
    </footer>
  );
};

export default Footer;
