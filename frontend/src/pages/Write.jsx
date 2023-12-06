/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, AlertTitle } from "@mui/material";
import "../styles/write.css";
import axios from "axios";
import moment from "moment";
import ExportContext from "../contexts/Context";

export default function Write() {
  const { infoUser } = useContext(ExportContext.Context);
  const [value, setValue] = useState("");
  console.info(value);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();

  const getPost = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts/${infoUser.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info("Response from getPost:", response.data);
        setSelectedPost({
          title: response.data.title,
          description: response.data.description,
          img: response.data.img,
        });
      })
      .catch((err) => {
        console.error("Error getting post:", err);
      });
  };

  useEffect(() => {
    getPost(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.info(selectedPost);
  }, [selectedPost]);

  const sendFormData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", value);
    formData.append("img", file);
    formData.append("date", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
    formData.append("userid", infoUser.id);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/post`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.info(response);
        setSuccess(response.data.message);
        setError(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error);
      });
  };

  return (
    <div className="add">
      <form onSubmit={sendFormData}>
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <br />
        <div className="menu">
          <div className="item">
            {/* <h2>Publish</h2> */}
            {/* <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span> */}
            <input
              style={{ display: "none" }}
              type="file"
              name=""
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="buttons">
              {/* <button>Save as a draft</button> */}
              {/* <button onSubmit={sendFormData}>Publish</button> */}
              <input type="submit" value="Publish" onSubmit={sendFormData} />
            </div>
          </div>
        </div>
      </form>
      <div className="alerte">
        {success ?? (
          <Alert severity="success">
            <AlertTitle>Post créée avec succés</AlertTitle>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error">
            <AlertTitle>
              Merci de remplir tous les champs obligatoires
            </AlertTitle>
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}
