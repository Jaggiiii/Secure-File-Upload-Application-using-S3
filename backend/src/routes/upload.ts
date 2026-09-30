import { Router } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../s3.js";

const router = Router();

router.get("/upload-url", async (req, res) => {
  try {
    const filename = req.query.filename as string;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required"
      });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 300
    });

    res.json({
      success: true,
      uploadUrl: url
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not generate upload URL"
    });
  }
});

export default router;