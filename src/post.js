import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";

// If you deploy to a subpath, you could set basename in future.
// For Vercel/custom domain, default is fine.
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/blog", element: <Blog /> },
  { path: "/post/:slug", element: <Post /> },
  // Fallback: send unknown routes to home (or make a 404 page later)
  { path: "*", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

