import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HOME";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import Files from "./pages/Files";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/download" element={<Download />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;