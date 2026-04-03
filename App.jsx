import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Upload from "./pages/Upload";
import Status from "./pages/Status";
import Dashboard from "./pages/Dashboard";
import Violations from "./pages/Violations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="upload" element={<Upload />} />
        <Route path="Dashboard" element={<Dashboard/>} />
        <Route path="status" element={<Status />} />
        <Route path="violations" element={<Violations />} />
      </Route>

      <Route path="*" element={<Navigate to="/upload" />} />
    </Routes>
  );
}

export default App;