import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <h1 className="text-2xl font-bold p-4 text-center">Admin</h1>
      <nav className="space-y-2 p-4">
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/properties"
          className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          🏠 Properties
        </Link>
        <Link
          to="/users"
          className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          👤 Users
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ⚙️ Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
