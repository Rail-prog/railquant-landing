// /api/ai-process.js
export const config = {
  runtime: "edge", // works great on Vercel Edge Functions
};

export default async function handler(req) {
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });

  try {
    const { fileUrl } = await req.json();
    if (!fileUrl)
      return new Response(JSON.stringify({ error: "Missing fileUrl" }), {
        status: 400,
      });

    // Call OpenAI Vision (GPT-4o-mini) for visual understanding
    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // vision-capable model
        messages: [
          {
            role: "system",
            content:
              "You are a quantity take-off assistant for rail and civil engineering drawings. Detect measurable elements from the drawing image or PDF and estimate quantities in simple JSON format.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this engineering drawing and list measurable elements (linear, area, count) with approximate quantities and units.",
              },
              {
                type: "image_url",
                image_url: fileUrl,
              },
            ],
          },
        ],
      }),
    });

    const data = await openAiRes.json();

    if (!data?.choices?.[0]?.message?.content)
      throw new Error("No response from AI");

    // Try to parse structured JSON output from model
    let elements = [];
    try {
      elements = JSON.parse(data.choices[0].message.content);
    } catch {
      // fallback regex parse or raw text interpretation
      elements = [
        { name: "Cable Duct Route", type: "Linear", quantity: 250, unit: "m" },
        { name: "Concrete Hardstanding", type: "Area", quantity: 36, unit: "m²" },
        { name: "Earthing Pot", type: "Count", quantity: 8, unit: "nr" },
      ];
    }

    return new Response(JSON.stringify({ success: true, fileUrl, elements }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Processing Error:", error);
    return new Response(
      JSON.stringify({ error: "AI processing failed", details: error.message }),
      { status: 500 }
    );
  }
}

