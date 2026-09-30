import { useState } from "react";
import api from "../services/api";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setUploading(true);

      // 1. Ask backend for presigned URL
      const response = await api.get("/upload-url", {
        params: {
          filename: file.name,
          contentType: file.type
        }
      });

      const uploadUrl = response.data.uploadUrl;

      console.log("Presigned URL received");

      // 2. Upload directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type
        },
        body: file
      });

      // 3. Check S3 response
      if (!uploadResponse.ok) {
        throw new Error(
          `S3 upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      console.log("S3 upload successful");

      alert("File uploaded successfully!");

      setFile(null);

    } catch (error) {
      console.error("Upload failed:", error);

      alert("Upload failed");

    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b16] px-6 py-10 text-white">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-bold text-blue-400">
          Upload File
        </h1>

        <p className="mt-2 text-gray-400">
          Select a file from your computer and upload it to S3.
        </p>

        <div className="mt-8 rounded-2xl border border-blue-400/20 bg-[#111827] p-8">

          <input
            type="file"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];

              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
            className="block w-full cursor-pointer rounded-lg border border-gray-600 bg-[#080b16] p-3 text-sm text-gray-300"
          />

          {file && (
            <div className="mt-5 rounded-lg border border-green-400/20 bg-green-400/5 p-4">

              <p className="text-green-400">
                Selected file
              </p>

              <p className="mt-1 text-gray-300">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {file.size.toLocaleString()} bytes
              </p>

            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Upload;