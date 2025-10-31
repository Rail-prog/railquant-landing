// /api/ai-process.js
export const config = { runtime: "edge" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Use POST" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const fileUrl = body?.fileUrl;
  if (!fileUrl) return json({ ok: false, error: "Missing fileUrl" }, 400);

  // Simulated validation
  if (!fileUrl.startsWith("http")) {
    return json({ ok: false, error: "Invalid file URL" }, 400);
  }

  // Mock AI result
  const rows = [
    { Item: "Cable tray", Quantity: 175, Unit: "m", Category: "Containment" },
    { Item: "Large cable", Quantity: 38, Unit: "m", Category: "Cables" },
    { Item: "Small cable", Quantity: 18, Unit: "m", Category: "Cables" },
    { Item: "Equipment base", Quantity: 12, Unit: "ea", Category: "Civils" },
  ];

  return json({
    ok: true,
    message: "Mock take-off complete.",
    fileUrl,
    rows,
  });
}

