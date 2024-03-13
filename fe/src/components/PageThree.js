import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const PageThree = () => {
  const navigate = useNavigate();
  const [showPermissionBox, setShowPermissionBox] = useState(false);
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleCaptureDataset = () => {
    setShowPermissionBox(true);
  };

  const handleCaptureConfirmed = () => {
    setShowPermissionBox(false);
    axios
      .post("http://localhost:5000/capture-dataset")
      // .get("http://localhost:5000/tryy")
      .then((response) => {
        console.log(response.data.message);
        setResponseMessage(
          `${response.data.message}. You can now proceed to train the model.`
        );
        setShowResponseMessage(true);
        setTimeout(() => {
          setShowResponseMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error capturing dataset:", error);
      });
  };

  const handleTrainModel = () => {
    axios
      .post("http://localhost:5000/train-model")
      .then((response) => {
        console.log(response.data.message);
        setShowResponseMessage(true);
        setResponseMessage(response.data.message);
        setTimeout(() => {
          setShowResponseMessage(false);
          navigate("/page-four");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error training model:", error);
      });
  };

  return (
    <div className="page-three-container">
      <h2>Page Three</h2>
      <div className="button-container">
        <button className="" onClick={handleCaptureDataset}>
          Capture Dataset
        </button>
        <button className="train-button" onClick={handleTrainModel}>
          Train Model
        </button>
      </div>
      {showPermissionBox && (
        <div className="modal">
          <div className="modal-content">
            <p>Note :- This will Capture 300 pic of your Face.</p>
            <button className="ok-button" onClick={handleCaptureConfirmed}>
              OK
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowPermissionBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showResponseMessage && (
        <div
          className={`response-message ${showResponseMessage ? "show" : ""}`}
          onAnimationEnd={() => setShowResponseMessage(false)}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default PageThree;
