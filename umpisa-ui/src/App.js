import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { SideBar } from './pages/SideBar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  // const testUser = {id:1, name: 'klifford'}
  const testUser = null
  return (
    <div className="App">
      <Router>
        {/* <SideBar /> */}
        <div className="content">
          <Routes>
          <Route index element={<Login />} />
            <Route element={<PrivateRoute user={testUser} />} >
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;