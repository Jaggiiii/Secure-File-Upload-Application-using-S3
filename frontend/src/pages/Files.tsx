import { useEffect, useState } from "react";
import api from "../services/api";

interface FileObject {
  key: string;
  size: number;
  lastModified: string;
}

function Files() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await api.get("/files");

      setFiles(response.data.files);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 p-10 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-3xl font-bold">
          Files
        </h1>

        <div className="rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur">

          {loading ? (
            // Skeleton
            <div className="space-y-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-lg border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-3 h-5 w-2/3 rounded bg-white/20"></div>

                  <div className="h-4 w-1/4 rounded bg-white/10"></div>
                </div>
              ))}

            </div>
          ) : files.length === 0 ? (

            <p className="text-gray-400">
              No files found.
            </p>

          ) : (

            <div className="space-y-4">

              {files.map((file) => (
                <div
                  key={file.key}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-5"
                >

                  <div>
                    <p className="font-medium">
                      {file.key}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {file.size} bytes
                    </p>
                  </div>

                </div>
              ))}

            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default Files;