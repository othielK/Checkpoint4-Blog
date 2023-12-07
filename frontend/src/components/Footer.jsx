// /* eslint-disable react/style-prop-object */
import React from "react";
import "../styles/app.css";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../assets/images/Logo8.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <img src={Logo} alt="" />

        {/* Social Media Section */}
        <div className="social-media-section">
          <div className="social-icons">
            <FaTwitter />
            <FaLinkedin />
            <FaGithub />
            <MdEmail />
          </div>
          <b>&copy; 2023 Dev Tech Blog</b>
        </div>
      </div>
    </footer>
  );
}
