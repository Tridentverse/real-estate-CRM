import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PropertyPage from './components/PropertyPage';
import './styles/App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/properties" 
          element={isAuthenticated ? <PropertyPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
