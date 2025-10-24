// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";
import posts from "./posts.js";
import FeatureCard from "./components/FeatureCard.jsx";
import CalendlyEmbed from "./components/CalendlyEmbed.jsx";
import { startCheckout } from "./stripe";
import UploadTakeoff from "./components/UploadTakeoff.jsx";

const ONE_OFF_PRICE = import.meta.env.VITE_STRIPE_PRICE_ONE_OFF || "";

export default function App() {
  const latest = React.useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    []
  );

  const handleBuyOneOff = () => startCheckout({ priceId: ONE_OFF_PRICE });
  const handleSubscribePro = () => startCheckout();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">
              RQ
            </div>
            <span className="font-semibold">RailQuant AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-900 text-slate-600">Features</a>
            <a href="#how" className="hover:text-slate-900 text-slate-600">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 text-slate-600">Pricing</a>
            <a href="#contact" className
