import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]); // Holds the list of properties
  const [newProperty, setNewProperty] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    role: "",
    realEstateType: "",
    status: "Available",
    lookingTo: {
      city: "",
      society: "",
      locality: "",
    },
  });

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllProperties");
      setProperties(response.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  // Call this on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Add property
  const addProperty = async () => {
    const propertyData = {
      name: newProperty.name,
      description: newProperty.description,
      price: newProperty.price,
      location: newProperty.location,
      status: newProperty.status,
      role: newProperty.role,
      wishlist: "Active", // default field
      realEstateType: newProperty.realEstateType,
      lookingTo: newProperty.lookingTo,
    };

    // Frontend validation
    if (
      !propertyData.name ||
      !propertyData.description ||
      !propertyData.price ||
      !propertyData.location
    ) {
      alert("All fields must be filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/createProperty", propertyData);
      // Handle response
      if (response.data && response.data.property) {
        setProperties((prev) => [...prev, response.data.property]);
        setNewProperty({
          name: "",
          description: "",
          price: "",
          location: "",
          status: "Available",
          wishlist: "Active",
          realEstateType: "",
          role: "user",
          lookingTo: { city: "", society: "", locality: "" },
        });
        alert("Property added successfully!");
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Failed to add property:", err.message);
      alert("Error adding the property.");
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    try {
      // Send DELETE request to the backend API
      const response = await axios.delete(`http://localhost:5000/api/deleteProperty/${id}`);
      console.log('Delete response:', response); // Log the response to check for any additional info
      
      if (response.status === 200) {
        setProperties(properties.filter((property) => property._id !== id));
        alert("Property deleted successfully!");
      } else {
        alert("Something went wrong with deleting the property.");
      }
    } catch (err) {
      // Log the error to the console for more details
      console.error("Failed to delete property:", err.response ? err.response.data : err.message);
      alert("Error deleting the property.");
    }
  };
  

  // Update property (placeholder for actual edit functionality)
  const handleEdit = (property) => {
    setNewProperty({
      ...property, // Populate form with selected property data
      lookingTo: { ...property.lookingTo },
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Add Property</h1>
      <div style={formStyle}>
        <input
          type="text"
          placeholder="Name"
          value={newProperty.name}
          onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Location"
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Real Estate Type"
          value={newProperty.realEstateType}
          onChange={(e) => setNewProperty({ ...newProperty, realEstateType: e.target.value })}
          style={inputStyle}
        />
        {/* LookingTo fields */}
        <input
          type="text"
          placeholder="City"
          value={newProperty.lookingTo.city}
          onChange={(e) =>
            setNewProperty({ ...newProperty, lookingTo: { ...newProperty.lookingTo, city: e.target.value } })
          }
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Society"
          value={newProperty.lookingTo.society}
          onChange={(e) =>
            setNewProperty({ ...newProperty, lookingTo: { ...newProperty.lookingTo, society: e.target.value } })
          }
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Locality"
          value={newProperty.lookingTo.locality}
          onChange={(e) =>
            setNewProperty({ ...newProperty, lookingTo: { ...newProperty.lookingTo, locality: e.target.value } })
          }
          style={inputStyle}
        />
        <button onClick={addProperty} style={buttonStyle}>
          Add Property
        </button>
      </div>

      <h2>Property List</h2>
      <div style={listStyle}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} style={propertyStyle}>
              <strong>{property.name}</strong> <br />
              {property.description} <br />
              <strong>Price:</strong> ${property.price} <br />
              <strong>Location:</strong> {property.location} <br />

              {/* Edit and Delete Buttons in Horizontal Format */}
              <div style={buttonsContainerStyle}>
                <button onClick={() => handleEdit(property)} style={editButtonStyle}>
                  Edit
                </button>
                <button onClick={() => deleteProperty(property._id)} style={deleteButtonStyle}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

// Inline styles for better readability
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const editButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#ffc107",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const listStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap", // To wrap to the next line when items exceed width
  gap: "15px",
  marginTop: "20px",
};

const propertyStyle = {
  padding: "15px",
  width: "150px", // Set the width for horizontal layout
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
};

const buttonsContainerStyle = {
  display: "flex",            // Makes the buttons align horizontally
  gap: "10px",                // Adds space between the buttons
  marginTop: "10px",          // Adds space from the property info above
  justifyContent: "flex-start"// Align buttons to the left
};

export default PropertyPage;
