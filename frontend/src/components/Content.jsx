import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Single from "../pages/Single";
import Write from "../pages/Write";
import Update from "../pages/Update";

export default function Content() {
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Single />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:id" element={<Update />} />
      </Routes>
    </section>
  );
}
