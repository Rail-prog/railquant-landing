// /api/mock-process.js
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { fileUrl } = req.body;
    if (!fileUrl) return res.status(400).json({ error: "Missing fileUrl" });

    // Fake AI results
    const elements = [
      { name: "Trough Route", type: "Linear", quantity: 254.3, unit: "m" },
      { name: "Earthing Pot", type: "Count", quantity: 12, unit: "nr" },
      { name: "LOC Hardstanding", type: "Area", quantity: 22.6, unit: "m²" },
      { name: "Cable Route", type: "Linear", quantity: 184.9, unit: "m" },
    ];

    res.status(200).json({
      success: true,
      fileUrl,
      elements,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI processing failed" });
  }
}

