"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_js_1 = require("../s3.js");
const router = (0, express_1.Router)();
router.get("/s3-test", async (req, res) => {
    try {
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME
        });
        const result = await s3_js_1.s3.send(command);
        res.json({
            success: true,
            message: "S3 connection successful",
            files: result.Contents || []
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "S3 connection failed"
        });
    }
});
exports.default = router;
