import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ This line is crucial for Tailwind to load
import "./index.css";

import App from "./App.jsx";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/success" element={<Success />} />
      <Route path="/canceled" element={<Cancel />} />
      {/* Fallback */}
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);






