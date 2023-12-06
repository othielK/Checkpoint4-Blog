/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Edit from "../assets/images/edit.png";
import Delete from "../assets/images/delete.png";
import "../styles/single.css";
import Menu from "../components/Menu";
import ExportContext from "../contexts/Context";
import userImg from "../assets/images/user.png";

export default function Single() {
  const [post, setPost] = useState({});
  const [, setDelPost] = useState([]);
  const { id } = useParams();
  const { infoUser } = useContext(ExportContext.Context);
  console.info("infouser:", infoUser.id);
  const navigate = useNavigate();

  const getPost = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
        // setError(true);
      });
  };
  console.info("infouser:", infoUser.id);
  useEffect(() => {
    getPost();
  }, [id]);

  const deletePost = (postId) => {
    // event.preventDefault();
    console.info("postId", postId);
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${infoUser.id}/${postId}`
      )
      .then((response) => {
        setDelPost(response.data);
        console.info(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  useEffect(() => {
    deletePost();
  }, []);

  return (
    <div className="single">
      <div className="content">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/uploads/${
            post.img
          }`}
          alt=""
        />
        <div className="user">
          <img src={userImg} alt="user" />
          <div className="info">
            <p>
              <span>{post.firstname}</span>
              <br />
              Posted {moment(post.date).fromNow()}
            </p>
          </div>
          {infoUser.firstname === post.firstname && (
            <div className="edit">
              <Link className="write" to={`/post/${id}`}>
                <img className="ed" src={Edit} alt="" />
              </Link>
              <img
                className="del"
                src={Delete}
                alt=""
                onClick={() => deletePost(id)}
              />
            </div>
          )}
        </div>

        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <Menu />
    </div>
  );
}
