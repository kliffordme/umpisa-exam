import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './components/pages/Home';
import { Books } from './components/pages/Books';
import { Authors } from './components/pages/Authors';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/books" element={
                <Layout>
                  <Books />
                </Layout>
              } />
              <Route path="/authors" element={
                <Layout>
                  <Authors />
                </Layout>
              } />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
