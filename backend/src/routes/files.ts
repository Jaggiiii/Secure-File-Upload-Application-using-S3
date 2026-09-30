import { Router } from "express";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "../s3.js";

const router = Router();

router.get("/files", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME
    });

    const result = await s3.send(command);

    const files = (result.Contents || []).map((object) => ({
      key: object.Key,
      size: object.Size,
      lastModified: object.LastModified
    }));

    res.json({
      success: true,
      files
    });

  } catch (error) {
    console.error("LIST FILES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Could not list files"
    });
  }
});

export default router;