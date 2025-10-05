import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


import Dashboard from "./components/Dashboard"; // example

function App() {
  const [user, setUser] = useState(null); // user object after login {email, role}

  const handleLogin = (userData) => {
    setUser(userData); // store user info after login
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">System Report</Navbar.Brand>
          <Nav className="me-auto">
            {!user && <Link to="/login" className="nav-link">Login</Link>}
            {!user && <Link to="/register" className="nav-link">Register</Link>}
            {user && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
            {user && <span onClick={handleLogout} className="nav-link" style={{cursor:'pointer'}}>Logout</span>}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<h3>Welcome to System Report</h3>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            user ? <Dashboard userRole={user.role} /> : <Navigate to="/login" />
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
