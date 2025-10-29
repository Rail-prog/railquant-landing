// src/components/UploadSection.jsx
import React, { useState } from "react";

export default function UploadSection() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [elements, setElements] = useState([]);

  const handleUploadAndProcess = async () => {
    try {
      if (!file) return alert("Please choose a file first.");

      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) throw new Error("Upload failed");
      setStatus("File uploaded. Processing with AI...");

      const aiRes = await fetch("/api/ai-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: uploadData.fileUrl }),
      });
      const aiData = await aiRes.json();

      if (!aiData.success) throw new Error("AI takeoff failed");

      setElements(aiData.elements);
      setStatus("AI take-off completed. Preparing Excel export...");

      const exportRes = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ elements: aiData.elements }),
      });
      const blob = await exportRes.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "RailQuant_Takeoff.xlsx";
      link.click();

      setStatus("✅ Process complete — Excel downloaded!");
    } catch (e) {
      console.error(e);
      setStatus("❌ Something went wrong: " + e.message);
    }
  };

  return (
    <div className="border border-slate-200 bg-white rounded-2xl p-6 shadow-sm mt-12">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">
        Drawing Upload & AI Take-off
      </h2>
      <p className="text-slate-600 text-sm mb-4">
        Upload a PDF or CAD file. RailQuant AI will detect and quantify elements,
        then export the take-off results to Excel automatically.
      </p>

      <input
        type="file"
        accept=".pdf,.dwg,.dxf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-4 text-sm text-slate-600"
      />
      <button
        onClick={handleUploadAndProcess}
        className="bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-slate-800"
      >
        Start Take-off
      </button>

      {status && <p className="mt-4 text-sm text-slate-500">{status}</p>}

      {elements.length > 0 && (
        <div className="mt-6 text-sm">
          <h3 className="font-semibold mb-2">Preview:</h3>
          <ul className="space-y-1">
            {elements.map((el, idx) => (
              <li key={idx} className="border-b border-slate-100 py-1">
                {el.name} — {el.quantity} {el.unit} ({el.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

