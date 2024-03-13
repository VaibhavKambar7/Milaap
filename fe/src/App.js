// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS 
import LoginPage from "./components/LoginPage";
import StartPage from "./components/StartPage";
import AddUserPage from "./components/AddUserPage";
import PageThree from "./components/PageThree";
import PageFour from "./components/PageFour";

function App() {
  return (
    <Router>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/page-three" element={<PageThree />} />
        <Route path="/page-four" element={<PageFour />} />
      </Routes>
    </Router>
  );
}

export default App;
