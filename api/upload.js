// /api/upload.js
import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Upload failed" });

      const file = files.file?.[0];
      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || "eu-west-2",
      });

      const fileStream = fs.createReadStream(file.filepath);

      const upload = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `uploads/${file.originalFilename}`,
          Body: fileStream,
          ContentType: file.mimetype,
        })
        .promise();

      return res.status(200).json({
        success: true,
        fileUrl: upload.Location,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unexpected error" });
  }
}

