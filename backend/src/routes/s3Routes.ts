import { Router } from "express";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "../s3.js";

const router = Router();

router.get("/s3-test", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME
    });

    const result = await s3.send(command);

    res.json({
      success: true,
      message: "S3 connection successful",
      files: result.Contents || []
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "S3 connection failed"
    });
  }
});

export default router;