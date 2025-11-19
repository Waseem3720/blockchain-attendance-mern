import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Departments from "./pages/Departments.jsx";
import Classes from "./pages/Classes.jsx";
import Students from "./pages/Students.jsx";
import Attendance from "./pages/Attendance.jsx";
import BlockchainExplorer from "./pages/BlockchainExplorer.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
            <li><Link to="/">Departments</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/explorer">Blockchain Explorer</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Departments />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/explorer" element={<BlockchainExplorer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
