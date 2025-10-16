import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, LineChart, Layers, FileSpreadsheet, ShieldCheck, Zap, Download, Calculator, Ruler } from "lucide-react";

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md bg-white/80 backdrop-blur p-6 ${className}`}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide">{children}</span>
);

const Button = ({ children, href = "#", onClick, className = "" }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm hover:shadow transition ${className}`}
  >
    {children}
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">RQ</div>
              <span className="font-semibold">RailQuant AI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="hover:text-slate-900">Features</a>
              <a href="#how" className="hover:text-slate-900">How it works</a>
              <a href="#pricing" className="hover:text-slate-900">Pricing</a>
              <a href="#contact" className="hover:text-slate-900">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button href="#contact" className="bg-slate-900 text-white">Book a demo</Button>
            </div>
          </div>
        </Container>
      </header>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 items-center gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>AI for Rail & Civils</Badge>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
                Generate take‑offs & BQQs from drawings in minutes.
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                RailQuant AI reads PDFs and CAD exports, extracts quantities for troughing, UTX, LOC suites, chambers, drainage, and more—then builds a priced Bill of Quantities using your own rates.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#contact" className="bg-slate-900 text-white"><Sparkles className="mr-2 h-4 w-4"/>Get early access</Button>
                <Button href="#demo" className="bg-white border">Watch demo</Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> GDPR-friendly</div>
                <div className="flex items-center gap-2"><Zap className="h-4 w-4"/> Private by design</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <Card className="p-0 overflow-hidden">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div className="text-sm">Sample Take‑off</div>
                  <div className="text-xs opacity-80">.PDF → Quantities</div>
                </div>
                <div className="p-6 grid gap-4">
                  {[
                    { icon: Ruler, label: "Troughing C/1/37", qty: "1,240 m" },
                    { icon: Layers, label: "9‑way Multiduct", qty: "180 m" },
                    { icon: FileSpreadsheet, label: "Turning Chamber 900mm", qty: "12 ea" },
                    { icon: Calculator, label: "LOC Base + Hardstanding", qty: "4 sets" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                      <div className="flex items-center gap-3">
                        <row.icon className="h-5 w-5"/>
                        <div className="font-medium">{row.label}</div>
                      </div>
                      <div className="text-slate-600">{row.qty}</div>
                    </div>
                  ))}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500 mb-2">BQQ Export</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold">£ 318,420</div>
                      <Button className="bg-slate-900 text-white"><Download className="h-4 w-4 mr-2"/>Export XLSX</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center opacity-70 text-xs">
            <div>Network Rail standards</div>
            <div>NR/L2/CIV/003</div>
            <div>BS 1192 / ISO 19650</div>
            <div>CSV • XLSX • PDF</div>
          </div>
        </Container>
      </section>

      <section id="features" className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Built for estimators & PMs</h2>
            <p className="mt-3 text-slate-600">Purpose‑built for rail civils: Summerhill‑style level crossings, LOCs, UTXs, troughing, chambers, drainage and signage bases—without manual counting.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Drawing ingestion", desc: "Upload PDFs or CAD exports; we parse layers, symbols, legends and schedules." },
              { icon: Calculator, title: "Auto take‑off", desc: "Extract quantities for standard NR details and custom items with validation logs." },
              { icon: FileSpreadsheet, title: "BQQ builder", desc: "Map items to your coding; apply stored rates to output priced BoQs instantly." },
              { icon: LineChart, title: "Price memory", desc: "Reuse your historic Waux GRP & Candy rates. Flag outliers for review." },
              { icon: ShieldCheck, title: "Data privacy", desc: "On‑prem or private cloud. Your drawings & rates never train public models." },
              { icon: Zap, title: "Integrations", desc: "Export to Excel, Candy, and CSV. API for ERPs coming soon." },
            ].map((f, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <f.icon className="h-5 w-5"/>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {["Audit trail","Manual adjust & lock","Export templates"].map((b, j) => (
                    <li key={j} className="flex items-center gap-2"><Check className="h-4 w-4"/>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="how" className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Upload drawings", text: "Drop the full set: plans, schedules, and standard detail references." },
              { step: 2, title: "Review take‑off", text: "Check extracted items and edit quantities with audit trail." },
              { step: 3, title: "Export priced BQQ", text: "Apply your rate library and download XLSX/CSV." },
            ].map((s,i)=> (
              <Card key={i}>
                <div className="text-5xl font-extrabold text-slate-200">0{s.step}</div>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="demo" className="py-16">
        <Container>
          <Card>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Interactive demo (coming soon)</h3>
                <p className="text-slate-600 text-sm">We’ll walk through a sample Summerhill Level Crossing pack and generate the BoQ live.</p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4"/> LOC suites</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4"/> UTXs</div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4"/> Troughing</div>
                </div>
              </div>
              <div className="w-full md:w-80 h-48 rounded-xl bg-slate-100 grid place-items-center text-slate-400">Demo Placeholder</div>
            </div>
          </Card>
        </Container>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-slate-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, ROI‑first pricing</h2>
            <p className="mt-3 text-slate-600">Includes updates and support. Cancel anytime.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{
              name: "Solo",
              price: "£149/mo",
              blurb: "Freelance estimator or PM",
              features: ["Up to 5 projects/mo", "XLSX/CSV export", "Rate library"],
              cta: "Start trial"
            },{
              name: "Team",
              price: "£399/mo",
              blurb: "3–10 users",
              features: ["Unlimited projects", "Shared rate libraries", "Review & lock"],
              cta: "Book a demo"
            },{
              name: "Enterprise",
              price: "Custom",
              blurb: "Larger orgs & on‑prem",
              features: ["SSO, audit & logs", "Private cloud / on‑prem", "API & support SLAs"],
              cta: "Talk to sales"
            }].map((p, i) => (
              <Card key={i}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="text-slate-600 text-sm">{p.blurb}</p>
                  </div>
                  <div className="text-2xl font-extrabold">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2"><Check className="h-4 w-4"/>{f}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href="#contact" className="bg-slate-900 text-white w-full">{p.cta}</Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16">
        <Container>
          <Card>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold">Book a discovery call</h3>
                <p className="text-slate-600 mt-2 text-sm">Tell us about your estimating workflow. We’ll show you how RailQuant AI can cut take‑off time by 60–80% and standardise BQQs across projects.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4"/> NDA available</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4"/> UK‑based data hosting option</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4"/> Excel‑first outputs</li>
                </ul>
              </div>     
  action="https://formspree.io/f/mwpryenb"
  method="POST"
>
  <input
    className="rounded-xl border px-4 py-3"
    placeholder="Name"
    name="name"
    required
  />
  <input
    className="rounded-xl border px-4 py-3"
    placeholder="Email"
    name="email"
    type="email"
    required
  />
  <textarea
    className="rounded-xl border px-4 py-3"
    placeholder="What drawings do you work with?"
    rows={4}
    name="message"
    required
  />
  <button
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm hover:shadow transition"
    type="submit"
  >
    Send
  </button>
</form>
            </div>
          </Card>
          </main>
        </Container>
      </section>

      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} RailQuant AI. All rights reserved.
      </footer>
    </div>
  );
}
