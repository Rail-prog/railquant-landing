// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Success from "./Success";
import Cancel from "./Cancel";
import { stripePromise } from "./stripe";

function Home() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;

      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Set your Price ID in Vercel as VITE_STRIPE_PRICE_PRO
        body: JSON.stringify({ priceId: import.meta.env.VITE_STRIPE_PRICE_PRO }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data?.error || "Checkout failed");
      }

      // We return a URL from the API to redirect to Stripe Checkout
      window.location.href = data.url || data.sessionUrl;
    } catch (err) {
      alert(`Checkout failed: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 980, margin: "40px auto", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>RailQuant AI</h1>
        <nav style={{ display: "flex", gap: 16 }}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link to="/success">Success (test)</Link>
          <Link to="/cancel">Cancel (test)</Link>
        </nav>
      </header>

      <section style={{ textAlign: "center", marginTop: 60 }}>
        <h2>AI software for rail construction estimating and drawing takeoffs.</h2>
        <p>Speed up quantities, reduce manual errors, and deliver Excel-ready outputs.</p>

        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
          <a className="btn" href="#contact">Book a discovery call</a>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Redirecting..." : "Start subscription"}
          </button>
        </div>
      </section>

      {/* Add your other sections (features, pricing, blog, etc.) here */}
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}


