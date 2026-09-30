"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const s3Routes_js_1 = __importDefault(require("./routes/s3Routes.js"));
const upload_js_1 = __importDefault(require("./routes/upload.js"));
const download_js_1 = __importDefault(require("./routes/download.js"));
const files_js_1 = __importDefault(require("./routes/files.js"));
const delete_js_1 = __importDefault(require("./routes/delete.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend is running"
    });
});
app.use("/api", s3Routes_js_1.default);
app.use("/api", upload_js_1.default);
app.use("/api", download_js_1.default);
app.use("/api", files_js_1.default);
app.use("/api", delete_js_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
