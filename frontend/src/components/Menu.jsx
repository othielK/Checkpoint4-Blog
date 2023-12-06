import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [posts, setPosts] = useState([]);

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
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/uploads/${
              post.img
            }`}
            alt=""
          />
          <Link className="link" to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <button type="submit">Read More</button>
        </div>
      ))}
    </div>
  );
}
