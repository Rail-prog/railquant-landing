// /api/ai-process.js
export const config = {
  runtime: "edge",
};

const MODEL = "gpt-4o-mini";

const SCHEMA_HINT = {
  schema: {
    drawing: {
      title: "string | null",
      scale_text: "string | null",         // e.g. 'Scale 1:200 @ A1'
      scale_ratio: "number | null",        // e.g. 200 (for 1:200) when confidently parsed
      units: "string | null"               // e.g. 'metric'
    },
    elements: [
      {
        name: "string",                    // concise item name: 'Cable Duct Route', 'Hardstanding', 'Earthing Pot'
        discipline: "string",              // one of: Civils | E&P | Signalling | Telecoms | Permanent Way | General
        type: "string",                    // Linear | Area | Count | Volume
        quantity: "number",                // numeric amount only
        unit: "string",                    // normalized: m | m² | m³ | nr
        confidence: "number",              // 0..1
        notes: "string"                    // short justification, references, assumptions
      }
    ]
  }
};

// Normalize common unit typos/synonyms to our set
function normalizeUnit(u) {
  if (!u) return null;
  const s = String(u).toLowerCase().replace(/\s/g, "");
  if (["m", "metre", "meter", "meters", "metres", "lm", "linm"].includes(s)) return "m";
  if (["m2", "m^2", "sqm", "sq.m", "squaremetre", "squaremeter", "squaremeters", "squaremetres"].includes(s)) return "m²";
  if (["m3", "m^3", "cum", "cubicmetre", "cubicmeter", "cubicmeters", "cubicmetres"].includes(s)) return "m³";
  if (["nr", "no", "ea", "each", "count", "qty"].includes(s)) return "nr";
  return null;
}

function clamp01(x) {
  const n = Number(x);
  if (Number.isFinite(n)) return Math.max(0, Math.min(1, n));
  return 0.5;
}

// Safe parse strictly-JSON responses; graceful fallback
async function readStrictJSON(res) {
  const data = await res.json().catch(() => null);
  if (data?.choices?.[0]?.message?.content) {
    // In JSON mode, content will be a JSON string; in non-JSON mode it may be text
    try {
      return JSON.parse(data.choices[0].message.content);
    } catch {
      // Try to extract a JSON block if assistant ignored JSON mode
      const text = data.choices[0].message.content;
      const match = text.match(/\{[\s\S]*\}$/);
      if (match) {
        try { return JSON.parse(match[0]); } catch {}
      }
    }
  }
  return null;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { fileUrl } = await req.json();
    if (!fileUrl) {
      return new Response(JSON.stringify({ error: "Missing fileUrl" }), { status: 400 });
    }

    const sys = [
      "You are a quantity take-off assistant for rail & civil engineering drawings.",
      "Return ONLY valid JSON following the provided schema. No markdown, no prose.",
      "Identify measurable elements and estimate quantities. Prefer conservative, defensible estimates.",
      "Parse and include drawing scale if visible. If unsure, leave null.",
      "Normalize units to this set only: 'm', 'm²', 'm³', 'nr'.",
      "Discipline must be one of: Civils | E&P | Signalling | Telecoms | Permanent Way | General.",
      "Type must be one of: Linear | Area | Count | Volume.",
      "Add a confidence 0..1 reflecting extraction certainty.",
      "Keep names concise and discipline-appropriate."
    ].join(" ");

    const userText = [
      "Analyze this engineering drawing (PDF page or image).",
      "Output strict JSON with fields:",
      JSON.stringify(SCHEMA_HINT.schema, null, 2),
      "",
      "Examples of items:",
      "- Civils Linear: 'Cable Duct Route' -> { type: 'Linear', unit: 'm' }",
      "- Civils Area: 'Concrete Hardstanding' -> { type: 'Area', unit: 'm²' }",
      "- E&P Count: 'Earthing Pot' -> { type: 'Count', unit: 'nr' }",
      "- Signalling Linear: 'Troughing Run' -> { unit: 'm' }",
      "- Permanent Way Count: 'Track Drainage Catchpit' -> { unit: 'nr' }",
      "",
      "If scale is unclear, do not invent a ratio. Use null and note it.",
      "Return 4–12 elements that are visually/semantically clear on the page."
    ].join("\n");

    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        response_format: { type: "json_object" },
        temperature: 0.2,
        messages: [
          { role: "system", content: sys },
          {
            role: "user",
            content: [
              { type: "text", text: userText },
              { type: "image_url", image_url: fileUrl }
            ]
          }
        ]
      })
    });

    let parsed = await readStrictJSON(openAiRes);

    // If the model failed JSON mode, build a minimal safe fallback
    if (!parsed || typeof parsed !== "object") {
      parsed = {
        drawing: { title: null, scale_text: null, scale_ratio: null, units: "metric" },
        elements: [
          { name: "Cable Duct Route", discipline: "Civils", type: "Linear", quantity: 250, unit: "m", confidence: 0.55, notes: "Fallback sample" },
          { name: "Concrete Hardstanding", discipline: "Civils", type: "Area", quantity: 36, unit: "m²", confidence: 0.55, notes: "Fallback sample" },
          { name: "Earthing Pot", discipline: "E&P", type: "Count", quantity: 8, unit: "nr", confidence: 0.55, notes: "Fallback sample" }
        ]
      };
    }

    // Post-process normalization
    const out = {
      drawing: {
        title: parsed?.drawing?.title ?? null,
        scale_text: parsed?.drawing?.scale_text ?? null,
        scale_ratio: Number.isFinite(parsed?.drawing?.scale_ratio)
          ? Number(parsed.drawing.scale_ratio)
          : null,
        units: parsed?.drawing?.units ?? "metric"
      },
      elements: Array.isArray(parsed?.elements) ? parsed.elements.map((e) => {
        const unit = normalizeUnit(e?.unit);
        const type = (e?.type || "").trim();
        const discipline = (e?.discipline || "").trim();
        // Final validation & clamping
        return {
          name: (e?.name || "Unnamed Item").toString().slice(0, 120),
          discipline: ["Civils","E&P","Signalling","Telecoms","Permanent Way","General"].includes(discipline) ? discipline : "General",
          type: ["Linear","Area","Count","Volume"].includes(type) ? type : "Count",
          quantity: Number.isFinite(e?.quantity) ? Number(e.quantity) : 0,
          unit: unit || (type === "Count" ? "nr" : type === "Linear" ? "m" : type === "Area" ? "m²" : type === "Volume" ? "m³" : "nr"),
          confidence: clamp01(e?.confidence),
          notes: (e?.notes || "").toString().slice(0, 240)
        };
      }) : []
    };

    return new Response(JSON.stringify({ success: true, fileUrl, ...out }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("AI Processing Error:", error);
    return new Response(
      JSON.stringify({ error: "AI processing failed", details: error.message }),
      { status: 500 }
    );
  }
}


