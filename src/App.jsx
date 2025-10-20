import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Blog from "./Blog.jsx";
import Post from "./Post.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";
import posts from "../posts.js";
import { stripePromise } from "../stripe.js";

function Navbar() {
  return (
    <header className="border-b border-slate-200">
      <nav className="container flex h-14 items-center justify-between">
        <Link to="/" className="font-bold">
          RailQuant AI
        </Link>
        <div className="flex gap-6 text-sm">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <Link to="/blog">Blog</Link>
          <a href="#contact">Contact</a>
        </div>
        <a
          href="#pricing"
          className="btn btn-primary"
        >
          Book a demo
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();

  const startCheckout = async () => {
    const stripe = await stripePromise;
    // create session
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: import.meta.env.VITE_STRIPE_PRICE_PRO,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`
      })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(`Checkout failed: ${data.error || "Unknown error"}`);
      return;
    }
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <section className="container py-16">
      <h1 className="h1 max-w-4xl">
        AI software for rail construction estimating and drawing takeoffs.
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-slate-600">
        Speed up quantities, reduce manual errors, and deliver Excel-ready outputs.
        Built for rail and civils estimators who need accuracy and repeatability.
      </p>
      <div className="mt-8 flex gap-3">
        <a className="btn btn-primary" href="#contact">Book a discovery call</a>
        <Link className="btn btn-secondary" to="/blog">Read product updates</Link>
        <button className="btn btn-secondary" onClick={startCheckout}>Start subscription</button>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="container py-12">
      <h2 className="h2">Built for rail & civils estimating</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Drawing takeoffs", "Extract quantities directly from PDFs/CAD with AI-assisted selection."],
          ["Excel-ready outputs", "Standardised CSV/XLS with named items, units, and breakdowns."],
          ["Repeatable templates", "Item libraries + mapping to keep outputs consistent."],
          ["Team review", "Comments/approvals so QA is fast and visible."],
          ["UK data hosting", "Optional UK-only hosting for sensitive projects."],
          ["API & integrations", "SharePoint, OneDrive, or your CDE for faster workflows."]
        ].map(([title, body]) => (
          <div className="card" key={title}>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="container py-12">
      <h2 className="h2">Pricing</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold">Starter</h3>
          <p className="mt-1 text-3xl font-bold">£0</p>
          <ul className="mt-3 list-disc pl-5 text-slate-600">
            <li>Up to 2 projects</li>
            <li>Excel export</li>
            <li>Email support</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold">Pro</h3>
          <p className="mt-1 text-3xl font-bold">£149</p>
          <ul className="mt-3 list-disc pl-5 text-slate-600">
            <li>Unlimited projects</li>
            <li>Templates & libraries</li>
            <li>Priority support</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold">Team</h3>
          <p className="mt-1 text-3xl font-bold">Custom</p>
          <ul className="mt-3 list-disc pl-5 text-slate-600">
            <li>SAML/SSO</li>
            <li>UK-only hosting option</li>
            <li>Onboarding & training</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function LatestInsights() {
  return (
    <section className="container py-12">
      <h2 className="h2">Latest insights</h2>
      <div className="mt-6 grid gap-6">
        {posts.slice(0, 3).map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="card hover:bg-slate-50">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="text-sm text-slate-500">{p.date}</span>
            </div>
            <p className="mt-2 text-slate-600">{p.excerpt}</p>
            <span className="mt-3 inline-block text-sm font-medium text-slate-900">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="container py-8 text-sm text-slate-600">
        © {new Date().getFullYear()} RailQuant AI
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <LatestInsights />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}



