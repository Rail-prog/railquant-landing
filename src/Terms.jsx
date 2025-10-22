import React from "react";

export default function Terms() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms of Service</h1>
        <p className="text-sm text-slate-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-4">
          Welcome to RailQuant AI. By accessing or using our website and services,
          you agree to comply with and be bound by the following terms. Please
          read them carefully before using our platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Services</h2>
        <p className="mb-4">
          You agree to use RailQuant AI’s tools and website only for lawful purposes
          and in accordance with these Terms. Misuse of the platform may result in
          suspension or termination of access.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Intellectual Property</h2>
        <p className="mb-4">
          All content, trademarks, and software on this site are the property of
          RailQuant AI or its licensors. You may not reproduce, distribute, or
          modify any materials without written permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. User Content</h2>
        <p className="mb-4">
          Any content or feedback you provide to us may be used to improve our
          services. You retain ownership of your data, but grant us a limited,
          non-exclusive license to process it for operational purposes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Liability Disclaimer</h2>
        <p className="mb-4">
          Our software and website are provided “as is.” While we aim for high
          accuracy, RailQuant AI is not liable for errors, omissions, or damages
          arising from the use of outputs or data interpretations.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts or services at
          our discretion if these terms are violated.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws
          of England and Wales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact</h2>
        <p className="mb-4">
          For questions regarding these Terms, contact us at:
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

