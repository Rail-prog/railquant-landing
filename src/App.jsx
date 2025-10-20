import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";
import posts from "./posts.js";
import { stripePromise } from "./stripe.js";

export default function App() {
  const navigate = useNavigate();

  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  async function startCheckout() {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_1SK3vC0Z7E068IehR4NCOpIx",
          mode: "subscription",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout error");

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error(err);
      alert("Could not start checkout. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* … keep your UI as you had it … */}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              {/* hero / features / insights / contact / footer ... */}
            </main>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}
