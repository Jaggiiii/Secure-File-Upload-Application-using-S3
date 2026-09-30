import { Router } from "express";
import {
  DeleteObjectCommand,
  HeadObjectCommand
} from "@aws-sdk/client-s3";

import { s3 } from "../s3.js";

const router = Router();

router.delete("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    if (!filename || filename.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Filename is required"
      });
    }

    // Check whether the file exists
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    });

    try {
      await s3.send(headCommand);

    } catch (error: any) {
      console.error("HEAD ERROR:", error);

      if (
        error.name === "NotFound" ||
        error.$metadata?.httpStatusCode === 404
      ) {
        return res.status(404).json({
          success: false,
          message: "File not found"
        });
      }

      throw error;
    }

    // Delete the file
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    });

    await s3.send(deleteCommand);

    res.json({
      success: true,
      message: `${filename} deleted successfully`
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Could not delete file",
      error: error instanceof Error ? error.message : error
    });
  }
});

export default router;