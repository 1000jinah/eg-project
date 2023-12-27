import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Example from "screens/example";
import Main from "screens/main";
import Process from "screens/process";
import Calcul from "screens/calcul";
import MarketsMonitor from "screens/etf";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/process" replace />} />
          <Route path="/main" element={<Main />} />
          <Route path="/process" element={<Process />} />
          <Route path="/calcul" element={<Calcul />} />
          <Route path="/markets" element={<MarketsMonitor />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
