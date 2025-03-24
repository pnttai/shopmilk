import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import "../index.css";

const Footer = () => {
  return (
    <footer className="border-t footer-1">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved 2025</p>
        <div className="flex items-center gap-6 justify-center">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaSquareInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;