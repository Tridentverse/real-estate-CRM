import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      if (res.data.success) {
        setMessage("Login successful!");
        localStorage.setItem("token", res.data.token); // Save token
        navigate("/properties"); // Redirect to admin panel
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1602495080095-f0170897da72')" }}
    >
      <div className="bg-black bg-opacity-50 text-white p-10 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-semibold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded-md hover:bg-blue-700 text-white transition duration-200"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
