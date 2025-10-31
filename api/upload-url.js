// src/components/UploadTakeoff.jsx
import React, { useState } from "react";

export default function UploadTakeoff() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState(null);

  async function startTakeoff() {
    setMsg("");
    setResult(null);

    if (!file) return setMsg("Please select a PDF or CAD file first.");
    setBusy(true);

    try {
      // Step 1: get upload URL
      const res = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, type: file.type }),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { errorText: await res.text() };

      if (!res.ok || !data.url)
        throw new Error(data.error || data.errorText || "Upload URL failed");

      // Step 2: PUT to S3
      const put = await fetch(data.url, {
        method: "PUT",
        headers: data.headers,
        body: file,
      });
      if (!put.ok) throw new Error("S3 upload failed");

      // Step 3: call AI process
      const ai = await fetch("/api/ai-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: data.url.split("?")[0] }),
      });
      const aiData = await ai.json();
      if (!ai.ok || !aiData.ok)
        throw new Error(aiData.error || "AI take-off failed");

      setResult(aiData.rows);
      setMsg("✅ Take-off complete.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-md">
      <h3 className="text-lg font-semibold mb-1">Drawing Upload & AI Take-off</h3>
      <p className="text-sm text-slate-600 mb-3">
        Upload a PDF or CAD file. RailQuant AI will detect and quantify elements
        automatically and export them for validation.
      </p>

      <input
        type="file"
        accept=".pdf,.dwg,.dxf,image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <button
        onClick={startTakeoff}
        disabled={!file || busy}
        className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold disabled:opacity-50"
      >
        {busy ? "Processing …" : "Start Take-off"}
      </button>

      {msg && <p className="mt-3 text-sm text-slate-700">{msg}</p>}

      {result && (
        <table className="mt-4 w-full text-sm border-collapse border border-slate-200">
          <thead className="bg-slate-100">
            <tr>
              {Object.keys(result[0]).map((h) => (
                <th key={h} className="border border-slate-200 p-1">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j} className="border border-slate-200 p-1">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
