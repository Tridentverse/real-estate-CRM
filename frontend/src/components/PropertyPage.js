import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    status: "Available",
  });
  const [editProperty, setEditProperty] = useState(null);
  const [error, setError] = useState("");

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getAllProperties");
        setProperties(response.data);
      } catch (err) {
        setError("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, []);

  // Add a new property
  const addProperty = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/createProperty", newProperty);
      setProperties([...properties, response.data.property]);
      setNewProperty({ name: "", description: "", price: "", location: "", status: "Available" });
      setError("");
    } catch (err) {
      setError("Failed to add property");
    }
  };

  // Update a property
  const updateProperty = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update/${id}`, editProperty);
      setProperties(
        properties.map((property) =>
          property._id === id ? response.data.property : property
        )
      );
      setEditProperty(null);
      setError("");
    } catch (err) {
      setError("Failed to update property");
    }
  };

  // Delete a property
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete property");
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Properties</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Property</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Name"
              value={newProperty.name}
              onChange={(e) =>
                setNewProperty({ ...newProperty, name: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Description"
              value={newProperty.description}
              onChange={(e) =>
                setNewProperty({ ...newProperty, description: e.target.value })
              }
            />
            <input
              type="number"
              className="border rounded p-2"
              placeholder="Price"
              value={newProperty.price}
              onChange={(e) =>
                setNewProperty({ ...newProperty, price: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Location"
              value={newProperty.location}
              onChange={(e) =>
                setNewProperty({ ...newProperty, location: e.target.value })
              }
            />
          </div>
          <button
            onClick={addProperty}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Property
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Properties List</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="border p-4 rounded bg-gray-50">
                {editProperty && editProperty._id === property._id ? (
                  <>
                    <input
                      type="text"
                      className="border rounded w-full p-2 mb-2"
                      placeholder="Name"
                      value={editProperty.name}
                      onChange={(e) =>
                        setEditProperty({ ...editProperty, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="border rounded w-full p-2 mb-2"
                      placeholder="Description"
                      value={editProperty.description}
                      onChange={(e) =>
                        setEditProperty({
                          ...editProperty,
                          description: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => updateProperty(property._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditProperty(null)}
                      className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-gray-800">{property.name}</h2>
                    <p className="text-sm text-gray-600">{property.description}</p>
                    <p className="text-gray-700">Price: ${property.price}</p>
                    <p className="text-gray-700">Location: {property.location}</p>
                    <p
                      className={`font-bold ${
                        property.status === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Status: {property.status}
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => setEditProperty(property)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProperty(property._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyPage;
