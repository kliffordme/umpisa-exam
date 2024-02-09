import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { SideBar } from './pages/SideBar';

function App() {
  return (
    <div className="App">
      <Router>
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;