// api/ai-process.js
// Edge runtime API that ALWAYS returns JSON (no more "Unexpected token ..." in the client)

export const config = { runtime: "edge" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export default async function handler(req) {
  // Enforce POST
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed. Use POST." }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const fileUrl = body?.fileUrl;
  if (!fileUrl || typeof fileUrl !== "string") {
    return json({ ok: false, error: "Missing or invalid 'fileUrl'." }, 400);
  }

  // Optional: verify the file is reachable (HEAD is cheap)
  try {
    const head = await fetch(fileUrl, { method: "HEAD", cache: "no-store" });
    if (!head.ok) {
      return json({
        ok: false,
        error: `Could not reach file (status ${head.status}). Make sure the URL is public.`,
      }, 400);
    }
  } catch (err) {
    return json({
      ok: false,
      error: `Fetching file failed: ${String(err?.message || err)}`,
    }, 400);
  }

  // If you want to flip on real AI parsing later, you can check for the key here:
  // const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  // For now, we return a deterministic mock result so the UI pipeline fully works.

  // -------- Mock AI result (edit freely) --------
  const items = [
    { Item: "Cable tray", Quantity: 175, Unit: "metres", Layer: "ELECTRICAL", Category: "Containment" },
    { Item: "Large cable", Quantity: 38, Unit: "metres", Layer: "ELECTRICAL", Category: "Cables" },
    { Item: "Small cable", Quantity: 18, Unit: "metres", Layer: "ELECTRICAL", Category: "Cables" },
    { Item: "Equipment base", Quantity: 12, Unit: "each", Layer: "CIVILS", Category: "Bases" },
  ];

  // Build CSV for convenience
  const headers = Object.keys(items[0] || {});
  const csvLines = [
    headers.join(","),
    ...items.map((row) =>
      headers.map((h) => {
        const v = row[h] ?? "";
        // basic CSV escaping
        return /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
      }).join(",")
    ),
  ];
  const csv = csvLines.join("\n");

  // Return JSON
  return json({
    ok: true,
    message: "AI take-off completed (mock). Replace with real model when ready.",
    fileUrl,
    columns: headers,
    rows: items,
    csv, // handy if your client wants to generate a download
  });
}
