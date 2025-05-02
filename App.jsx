

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileEncryption from './component/FileEncryption';
import SlideNavbar from './component/RegistrationForm';
import "./App.css"

function App() {
  return (
    <Router>
      <div className='app-header'>
        <nav>
          <ul>
            <li>
              <Link className='link' to="/">Home</Link>
            </li>
            <li>
            
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FileEncryption />} />
          <Route path="/register" element={<SlideNavbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
