import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";
import Privacy from "./Privacy.jsx";
import Terms from "./Terms.jsx";
// If you also have success/cancel pages, import them too:
// import Success from "./Success.jsx";
// import Cancel from "./Cancel.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} /> */}
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);






