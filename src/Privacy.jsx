import React from "react";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-4">
          RailQuant AI (“we”, “our”, or “us”) respects your privacy and is committed to
          protecting your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data when you use our website and services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you voluntarily provide through contact forms,
          demo requests, or subscriptions, such as your name, email, and company details.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>To respond to inquiries or demo requests</li>
          <li>To improve our website and services</li>
          <li>To send relevant updates and product information (if subscribed)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Storage & Security</h2>
        <p className="mb-4">
          All information is stored securely on servers compliant with UK and EU data
          protection standards. We apply technical and organisational safeguards to
          prevent unauthorised access.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
        <p className="mb-4">
          We use trusted third-party platforms such as Web3Forms for form submissions,
          and Calendly for meeting scheduling. These providers process your data in
          accordance with their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Cookies</h2>
        <p className="mb-4">
          Our site uses cookies for analytics (via Google Analytics) to help us
          understand how visitors use the site. You can manage cookie preferences
          through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information.
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@railquant.co.uk" className="underline">
            privacy@railquant.co.uk
          </a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, you can reach us at:
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:support@railquant.co.uk" className="underline">
            support@railquant.co.uk
          </a>
        </p>

        <p className="text-sm text-slate-500 mt-10">
          © {new Date().getFullYear()} RailQuant AI. All rights reserved.
        </p>
      </div>
    </main>
  );
}

