import React from 'react';

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);





