import { Router } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../s3.js";

const router = Router();

router.get("/download-url", async (req, res) => {
  try {
    const filename = req.query.filename as string;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required"
      });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,

      // Tell S3/browser to download instead of display
      ResponseContentDisposition: `attachment; filename="${filename}"`
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 300
    });

    res.json({
      success: true,
      downloadUrl: url
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not generate download URL"
    });
  }
});

export default router;