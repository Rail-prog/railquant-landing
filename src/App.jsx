import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import posts from "./posts"; // keep your blog posts file


// ✅ Pages
function Home() {
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_PRICE_PRO,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI software for rail construction estimating and drawing takeoffs.</h1>
      <p>
        Speed up quantities, reduce manual errors, and deliver Excel-ready
        outputs. Built for rail and civils estimators who need accuracy and
        repeatability.
      </p>

      <button>Book a discovery call</button>
      <button>Read product updates</button>

      <button onClick={startCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Start subscription"}
      </button>

      <h2>Latest insights</h2>
      {posts.map((post, idx) => (
        <div key={idx} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link to={`/blog/${idx}`}>Read more →</Link>
        </div>
      ))}
    </div>
  );
}

function SuccessPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>✅ Subscription Successful!</h1>
      <p>Thank you for subscribing. You now have access to RailQuant AI.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

function CancelPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>❌ Subscription Cancelled</h1>
      <p>Your subscription was not completed. You can try again anytime.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

function BlogPostPage({ id }) {
  const post = posts[id];
  if (!post) return <h2>Post not found</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/">← Back</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
      <Route
        path="/blog/:id"
        element={
          <RouteRenderer
            render={({ id }) => <BlogPostPage id={id} />}
          />
        }
      />
    </Routes>
  );
}

// Helper component to read URL params using a render function
import { useParams } from "react-router-dom";
function RouteRenderer({ render }) {
  const params = useParams();
  return render(params);
}


