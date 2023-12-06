import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Logo from "../assets/images/Logo6.png";
import "../styles/app.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img className="logos" src={Logo} alt="" />
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/login">
          {/* <IoLogIn /> */}
          <h6>
            {" "}
            <IoLogIn /> Login
          </h6>
        </Link>
        <Link className="write" to="/write">
          <h6>
            {" "}
            <FaEdit /> Post
          </h6>
        </Link>
      </div>
    </div>
  );
}
