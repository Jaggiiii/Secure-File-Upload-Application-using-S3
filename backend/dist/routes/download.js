"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3_js_1 = require("../s3.js");
const router = (0, express_1.Router)();
router.get("/download-url", async (req, res) => {
    try {
        const filename = req.query.filename;
        if (!filename) {
            return res.status(400).json({
                success: false,
                message: "Filename is required"
            });
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename,
            // Tell S3/browser to download instead of display
            ResponseContentDisposition: `attachment; filename="${filename}"`
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3_js_1.s3, command, {
            expiresIn: 300
        });
        res.json({
            success: true,
            downloadUrl: url
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not generate download URL"
        });
    }
});
exports.default = router;
