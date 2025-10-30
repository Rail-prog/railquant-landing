// /api/upload-url.js
import crypto from "crypto";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { name, type } = req.body || {};
    if (!name || !type) {
      res.status(400).json({ error: "Missing 'name' or 'type' in body" });
      return;
    }

    const {
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
      AWS_REGION,
      AWS_S3_BUCKET,
    } = process.env;

    if (
      !AWS_ACCESS_KEY_ID ||
      !AWS_SECRET_ACCESS_KEY ||
      !AWS_REGION ||
      !AWS_S3_BUCKET
    ) {
      res.status(500).json({ error: "Missing AWS credentials" });
      return;
    }

    const safeName = String(name).replace(/[^\w.\-()]/g, "_");
    const key = `uploads/${Date.now()}-${safeName}`;
    const host = `${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;
    const urlPath = `/${key}`;

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const datestamp = amzDate.slice(0, 8);
    const credentialScope = `${datestamp}/${AWS_REGION}/s3/aws4_request`;
    const signedHeaders = "host";

    const query = new URLSearchParams({
      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
      "X-Amz-Credential": `${AWS_ACCESS_KEY_ID}/${credentialScope}`,
      "X-Amz-Date": amzDate,
      "X-Amz-Expires": "60",
      "X-Amz-SignedHeaders": signedHeaders,
    });

    const canonicalRequest = [
      "PUT",
      urlPath,
      query.toString(),
      `host:${host}\n`,
      signedHeaders,
      "UNSIGNED-PAYLOAD",
    ].join("\n");

    const hashedCanonicalRequest = crypto
      .createHash("sha256")
      .update(canonicalRequest)
      .digest("hex");

    const stringToSign = [
      "AWS4-HMAC-SHA256",
      amzDate,
      credentialScope,
      hashedCanonicalRequest,
    ].join("\n");

    const kDate = crypto
      .createHmac("sha256", "AWS4" + AWS_SECRET_ACCESS_KEY)
      .update(datestamp)
      .digest();
    const kRegion = crypto.createHmac("sha256", kDate).update(AWS_REGION).digest();
    const kService = crypto.createHmac("sha256", kRegion).update("s3").digest();
    const kSigning = crypto
      .createHmac("sha256", kService)
      .update("aws4_request")
      .digest();

    const signature = crypto
      .createHmac("sha256", kSigning)
      .update(stringToSign)
      .digest("hex");

    query.set("X-Amz-Signature", signature);

    const signedUrl = `https://${host}${urlPath}?${query.toString()}`;

    res.status(200).json({
      ok: true,
      url: signedUrl,
      key,
      bucket: AWS_S3_BUCKET,
      region: AWS_REGION,
      headers: { "Content-Type": type },
    });
  } catch (err) {
    console.error("upload-url error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

