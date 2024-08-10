import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '/src/pages/App.jsx';
import Admin from '/src/pages/Admin.jsx';
import Stats from '/src/pages/Stats.jsx';
import '/src/css/index.css';
import Swal from 'sweetalert2'


const SITE_URL = "https://proj.ruppin.ac.il/cgroup43/test1";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Stats" element={<Stats />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export { SITE_URL };