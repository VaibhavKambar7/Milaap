import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import "../App.css";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const handleAddUser = () => {
    // name.trim() === "" ||
    // email.trim() === "" ||
    // phone.trim() === "" ||
    // location.trim() === "" ||
    // height.trim() === "" ||
    // weight.trim() === ""

    // Make a POST request to the Flask API to add the user
    axios
      .post("http://localhost:5000/add-name", { name })
      .then((response) => {
        console.log(response.data);
        setShowResponseMessage(true);
        setResponseMessage("User added successfully!");
        setTimeout(() => {
          setShowResponseMessage(false);
          navigate("/page-three");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        setResult("Failed to add user. Please try again later.");
      });
  };

  return (
    <div className="adduser-container">
      {" "}
      {/* Change class name */}
      <h2>Add User</h2>
      <input
        type="text"
        className="adduser-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="adduser-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        className="adduser-input"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        className="adduser-input"
        placeholder="Last Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        className="adduser-input"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        className="adduser-input"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button className="adduser-button" onClick={handleAddUser}>
        Add User
      </button>{" "}
      {/* Change class name */}
      {showResponseMessage && (
        <div className="response-message">{responseMessage}</div>
      )}
      <div className="result">{result}</div> {/* Change class name */}
    </div>
  );
};

export default AddUserPage;
