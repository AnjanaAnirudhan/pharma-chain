
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import TrackDrug from './components/TrackDrug/TrackDrug';
import ComplianceReports from './components/ComplianceReports/ComplianceReports';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ marginTop: '70px' }}> {/* Ensure content is not hidden behind the navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track-drug" element={<TrackDrug />} />
            <Route path="/compliance-reports" element={<ComplianceReports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
