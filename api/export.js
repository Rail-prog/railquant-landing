// /api/export.js
import ExcelJS from "exceljs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { elements } = req.body;
    if (!elements || !Array.isArray(elements))
      return res.status(400).json({ error: "Invalid data" });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("AI Take-off");

    sheet.columns = [
      { header: "Item", key: "name", width: 30 },
      { header: "Type", key: "type", width: 15 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Unit", key: "unit", width: 10 },
    ];

    elements.forEach((el) => sheet.addRow(el));

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=RailQuant_Takeoff.xlsx"
    );
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Excel generation failed" });
  }
}

