import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#080b16] px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">

          <h1 className="text-4xl font-bold">
            <span className="text-blue-400">Secure</span>{" "}
            <span className="text-violet-400">File Upload</span>
          </h1>

          <p className="mt-3 text-gray-400">
            Secure file management using Amazon S3
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm text-green-300">

            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />

            Backend Connected

          </div>

        </div>


        {/* Actions */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Upload */}
          <Link
            to="/upload"
            className="group rounded-2xl border border-blue-400/20 bg-[#111827] p-8 text-center transition hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10"
          >

            <div className="mb-5 text-5xl">
              ⬆️
            </div>

            <h2 className="text-xl font-semibold text-blue-400">
              Upload File
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Upload a file directly to S3
            </p>

          </Link>


          {/* Download */}
          <Link
            to="/download"
            className="group rounded-2xl border border-violet-400/20 bg-[#111827] p-8 text-center transition hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-500/10"
          >

            <div className="mb-5 text-5xl">
              ⬇️
            </div>

            <h2 className="text-xl font-semibold text-violet-400">
              Download File
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Download a file securely
            </p>

          </Link>


          {/* Files */}
          <Link
            to="/files"
            className="group rounded-2xl border border-green-400/20 bg-[#111827] p-8 text-center transition hover:-translate-y-1 hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/10"
          >

            <div className="mb-5 text-5xl">
              📁
            </div>

            <h2 className="text-xl font-semibold text-green-400">
              View All Files
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              View files stored in S3
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;