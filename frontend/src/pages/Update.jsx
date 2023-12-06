/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/write.css";
import axios from "axios";
// import moment from "moment";
// import ExportContext from "../contexts/Context";

export default function Write() {
  //   const { infoUser } = useContext(ExportContext.Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedPost, setSelectedPost] = useState({
    title: "",
    description: "",
    img: "",
  });
  const [value, setValue] = useState(""); // Assuming this is the content of the ReactQuill editor
  const [file, setFile] = useState(null);

  const getPost = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.info("Response from getPost:", response.data);
        setSelectedPost({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          img: response.data.img,
        });
        setValue(response.data.description);
      })
      .catch((err) => {
        console.error("Error getting post:", err);
      });
  };

  const sendFormData = (event) => {
    event.preventDefault();

    console.info("Form Data:", {
      title: selectedPost.title,
      description: value,
      img: file,
      //   date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      //   userid: infoUser.id,
    });

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/post/${selectedPost.id}`,

        {
          title: selectedPost.title,
          description: value,
          img: file,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        // setError(err.response.data.error);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    console.info(selectedPost);
  }, [selectedPost]);

  return (
    <div className="add">
      {selectedPost && (
        <form onSubmit={sendFormData}>
          <div className="content">
            <input
              type="text"
              placeholder={selectedPost.title}
              value={selectedPost.title}
              onChange={(event) =>
                setSelectedPost({
                  ...selectedPost,
                  title: event.target.value,
                })
              }
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
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                value={selectedPost.file}
                onChange={(e) => setFile(e.target.files[0])}
                // onChange={setFile}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              <div className="buttons">
                <input type="submit" value="UPDATE" />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
