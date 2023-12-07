/* eslint-disable react/button-has-type */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Logo from "../assets/images/Logo8.png";
import "../styles/app.css";
import ExportContext from "../contexts/Context";

export default function Navbar() {
  const { infoUser, logout } = useContext(ExportContext.Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // from usecontext
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img className="logos" src={Logo} alt="" />
        </Link>
      </div>
      <div className="links">
        {infoUser.id ? (
          <>
            <span> 👋{infoUser.firstname} !</span>
            <Link to="/logout" className="link" onClick={handleLogout}>
              <h6>
                {" "}
                <IoLogOut /> Logout
              </h6>
            </Link>
          </>
        ) : (
          <Link className="link" to="/login">
            <h6>
              {" "}
              <IoLogIn /> Login
            </h6>
          </Link>
        )}

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
