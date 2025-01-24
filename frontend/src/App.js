import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PropertyPage from "./components/PropertyPage";
import LoginPage from "./components/LoginPage";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token"); // Check for the token
  return token ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route: Admin panel */}
        <Route
          path="/properties"
          element={
            <div className="flex h-screen">
              {/* Sidebar Component */}
              <Sidebar />
              {/* Main Content */}
              <div className="flex-grow bg-gray-100 p-6">
                <ProtectedRoute element={PropertyPage} />
              </div>
            </div>
          }
        />

        {/* Redirect to login page by default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
