// api/upload.js
import Busboy from "busboy";

/** Generate fake AI take-off results */
function mockAnalyze(filename = "drawing.pdf") {
  const items = [];
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
    items.push({ item: "Cable troughing", unit: "m", qty: 175 });
    items.push({ item: "Lineside cabinet bases", unit: "ea", qty: 12 });
    items.push({ item: "Walking route (GRP)", unit: "m²", qty: 95 });
  }

  return {
    filename,
    confidence: 0.72,
    items,
  };
}

/** Parse multipart form-data */
function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const files = [];

    busboy.on("file", (field, file, info) => {
      const { filename, mimeType } = info;
      file.resume(); // drain stream
      files.push({ filename, mimeType });
    });

    busboy.on("finish", () => resolve(files));
    busboy.on("error", reject);
    req.pipe(busboy);
  });
}

/** Serverless API handler (works on Vercel) */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const files = await parseMultipart(req);
    if (!files.length) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const result = mockAnalyze(files[0].filename);
    return res.status(200).json({ ok: true, analysis: result });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
