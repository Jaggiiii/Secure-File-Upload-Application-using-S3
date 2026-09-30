"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_js_1 = require("../s3.js");
const router = (0, express_1.Router)();
router.get("/files", async (req, res) => {
    try {
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME
        });
        const result = await s3_js_1.s3.send(command);
        const files = (result.Contents || []).map((object) => ({
            key: object.Key,
            size: object.Size,
            lastModified: object.LastModified
        }));
        res.json({
            success: true,
            files
        });
    }
    catch (error) {
        console.error("LIST FILES ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Could not list files"
        });
    }
});
exports.default = router;
