// /* eslint-disable react/style-prop-object */
import React from "react";
import Logo from "../assets/images/Logo6.png";
import "../styles/app.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <img src={Logo} alt="" />
        <span>
          Made with <span className="red-heart">♥️</span>
          <br />
          <b>React,Node,Express,MySQL</b>
        </span>
      </div>
    </footer>
  );
}
