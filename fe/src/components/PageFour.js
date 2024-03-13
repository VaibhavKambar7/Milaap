import React, { useState } from "react";
import axios from "axios";
// import { useToast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import "../App.css"; // Import CSS file for PageFour styling

const PageFour = () => {
  const [responseMessage, setResponseMessage] = useState(""); // State to store response message
  const [showMessage, setShowMessage] = useState(false); // State to control visibility of message

  // const toast = useToast();

  const handleFaceRecognition = () => {
    // Data to be sent in the POST request
    const requestData = {
      name: "hi",
      latitude: 19.076,
      longitude: 72.8777,
      to_email: "vaibhavkambar123@example.com",
    };

    axios
      .post("http://localhost:5000/face-recognition", requestData)
      // .then((response) => {
      //   // Show success toast
      //   // toast.success(response.data.message);
      //   // toast({
      //   //   title: response.data.message,
      //   //   status: "success",
      //   //   duration: 3000,
      //   //   isClosable: true,
      //   //   position: "top",
      //   // });

      //   console.log(response.data.message);
      // })
      .then((response) => {
        setResponseMessage(response.data.message);
        setShowMessage(true); // Show message
        setTimeout(() => setShowMessage(false), 2500); // Hide message after 5.5 seconds
      })
      .catch((error) => {
        console.error("Error performing face recognition:", error);
        // Show error toast
        // toast.error("Error performing face recognition");
      });
  };

  const handleGeocodeAddress = () => {
    // Logic for geocoding address
    axios
      .get("http://localhost:5000/geocode-address")
      .then((response) => {
        setResponseMessage(response.data.message);
        setShowMessage(true); // Show message
        setTimeout(() => setShowMessage(false), 2500); // Hide message after 5.5 seconds
      })
      .catch((error) => {
        console.error("Error performing geocoding:", error);
      });
  };

  const handleReverseGeocode = () => {
    // Logic for reverse geocoding
    axios
      .get("http://localhost:5000/reverse-geocode")
      .then((response) => {
        setResponseMessage(response.data.message);
        setShowMessage(true); // Show message
        setTimeout(() => setShowMessage(false), 5500); // Hide message after 5.5 seconds
      })
      .catch((error) => {
        console.error("Error performing reverse geocoding:", error);
      });
  };

  return (
    <div className="page-four-container">
      <h2>Face Recognition</h2>
      <button className="action-button" onClick={handleFaceRecognition}>
        Face Recognition
      </button>
      <button className="action-button" onClick={handleGeocodeAddress}>
        Geocoding
      </button>
      <button className="action-button" onClick={handleReverseGeocode}>
        Reverse Geocoding
      </button>
      <div
        className={`response-message ${showMessage ? "show" : ""}`}
        onAnimationEnd={() => setShowMessage(false)}
      >
        {responseMessage}
      </div>
    </div>
  );
};

export default PageFour;
