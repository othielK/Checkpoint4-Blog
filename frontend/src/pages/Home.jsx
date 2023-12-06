/* eslint-disable react/button-has-type */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const getPosts = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
        // setError(true);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="postimg">
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/images/uploads/${post.img}`}
                alt=""
              />
            </div>
            <div className="content">
              <Link className="link" to={`/posts/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
