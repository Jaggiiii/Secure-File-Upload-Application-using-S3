import { useEffect, useState } from "react";
import api from "../services/api";

interface FileObject {
  key: string;
  size: number;
  lastModified: string;
}

function Download() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await api.get("/files");

      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDownload = async (filename: string) => {
    try {
      setDownloading(filename);

      const response = await api.get("/download-url", {
        params: {
          filename,
        },
      });

      const downloadUrl = response.data.downloadUrl;

      // Download directly from S3
      window.location.href = downloadUrl;
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violet-400">
            Download Files
          </h1>

          <p className="mt-2 text-gray-400">
            Select a file to securely download it from S3.
          </p>
        </div>

        {/* Files container */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">

          {loading ? (

            /* Skeletons */
            <div className="space-y-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="h-11 w-11 rounded-lg bg-white/10" />

                      <div>
                        <div className="h-4 w-48 rounded bg-white/10" />

                        <div className="mt-2 h-3 w-24 rounded bg-white/10" />
                      </div>

                    </div>

                    <div className="h-9 w-24 rounded-lg bg-white/10" />

                  </div>
                </div>
              ))}

            </div>

          ) : files.length === 0 ? (

            /* Empty state */
            <div className="rounded-xl border border-dashed border-gray-600 p-12 text-center">

              <div className="text-5xl">
                📂
              </div>

              <p className="mt-4 text-gray-400">
                No files available for download.
              </p>

            </div>

          ) : (

            /* Actual files */
            <div className="space-y-3">

              {files.map((file) => (

                <div
                  key={file.key}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-400/40 hover:bg-white/5"
                >

                  {/* File information */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-xl">
                      📄
                    </div>

                    <div>

                      <p className="font-medium text-gray-100">
                        {file.key}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {file.size.toLocaleString()} bytes
                      </p>

                    </div>

                  </div>

                  {/* Download button */}
                  <button
                    onClick={() => handleDownload(file.key)}
                    disabled={downloading === file.key}
                    className="rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {downloading === file.key
                      ? "Preparing..."
                      : "Download"}
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Download;