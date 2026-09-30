"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_js_1 = require("../s3.js");
const router = (0, express_1.Router)();
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
        const headCommand = new client_s3_1.HeadObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename
        });
        try {
            await s3_js_1.s3.send(headCommand);
        }
        catch (error) {
            console.error("HEAD ERROR:", error);
            if (error.name === "NotFound" ||
                error.$metadata?.httpStatusCode === 404) {
                return res.status(404).json({
                    success: false,
                    message: "File not found"
                });
            }
            throw error;
        }
        // Delete the file
        const deleteCommand = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename
        });
        await s3_js_1.s3.send(deleteCommand);
        res.json({
            success: true,
            message: `${filename} deleted successfully`
        });
    }
    catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Could not delete file",
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.default = router;
