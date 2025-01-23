import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Real Estate CRM</h1>
      <nav className="space-y-2">
        <Link to="/" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
          Dashboard
        </Link>
        <Link to="/properties" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
          Properties
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
