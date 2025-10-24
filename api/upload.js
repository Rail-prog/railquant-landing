// api/upload.js
// Minimal multipart parser + mock "AI" take-off.
// Works on Vercel serverless (Node) without Next.js.

import Busboy from "busboy";

/** Mock analyzer: returns quantities based on filename heuristics */
function mockAnalyze(filename = "drawing.pdf") {
  const items = [];

  // Some playful heuristics so demos feel real:
  const lower = filename.toLowerCase();
  if (lower.includes("track") || lower.includes("alignment")) {
    items.push({ item: "Ballasted track", unit: "m", qty: 320 });
    items.push({ item: "Sleepers", unit: "ea", qty: 520 });
    items.push({ item: "Rails (60E2)", unit: "m", qty: 640 });
  }
  if (lower.includes("drain") || lower.includes("wet")) {
    items.push({ item: "Drainage pipe (150mm)", unit: "m", qty: 110 });
    items.push({ item: "Catchpit chambers", unit: "ea", qty: 8 });
  }
  if (lower.includes("ohe") || lower.includes("masts") || lower.includes("overhead")) {
    items.push({ item: "OHE masts", unit: "ea", qty: 24 });
    items.push({ item: "Catenary wire", unit: "m", qty: 950 });
  }
  if (items.length === 0) {
    // Default if no keywords matched
    items.push({ item: "Cable troughing", unit: "m", qty: 175 });
    items.push({ item: "Lineside cabinet bases", unit: "ea", qty: 12 });
    items.push({ item: "Walking route (GRP)", unit: "m²", qty: 95 });
  }

  return {
    filename,
    confidence: 0.72, // pretend score
    items,
  };
}

/** Parse multipart form-data with Busboy (keeps memory usage modest) */
function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({ headers: req.headers });
      const files = [];
      const fields = {};

      busboy.on("file", (fieldname, file, info) => {
        const { filename, mimeType } = info;
        // We don’t actually need the bytes for the mock—just drain.
        file.on("data", () => {});
        file.on("end", () => {
          files.push({ fieldname, filename, mimeType });
        });
      });

      busboy.on("field", (name, val) => {
        fields[name] = val;
      });

      busboy.on("finish", () => resolve({ files, fields }));
      busboy.on("error", reject);

      req.pipe(busboy);
    } catch (err) {
      reject(err);
    }
  });
}

/** Vercel API handler */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Must disable body parsing — Vercel serverless leaves req as a stream for multipart
  // (No config file here; this is a pure Node handler. We simply parse via Busboy.)
  try {
    const { files } = await parseMultipart(req);

    if (!files.length) {
      return res.status(400).json({ error: "No file uploaded (field 'file' expected)." });
    }

    const first = files[0];
    const result = mockAnalyze(first.filename);

    return res.status(200).json({
      ok: true,
      analysis: result,
      message: "Mock take-off completed.",
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ ok: false, error: "Upload/parse failed." });
  }
}

