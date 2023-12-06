import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Example from "screens/example";
import Main from "screens/main";
import Process from "screens/process";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/process" replace />} />
          <Route path="/main" element={<Main />} />
          <Route path="/process" element={<Process />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
