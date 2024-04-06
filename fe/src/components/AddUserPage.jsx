import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Input,
  Stack,
  useToast, // Import useToast hook from Chakra UI
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios for making HTTP requests
import "../App.css";
import { ArrowBackIcon } from "@chakra-ui/icons";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [missingDate, setMissingDate] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");

  const navigate = useNavigate();
  const toast = useToast(); // Initialize the useToast hook

  const handleAddUser = () => {
    // Check if any field is empty
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !dob ||
      !missingDate ||
      !aadhaarNumber
    ) {
      // Display toast message if any field is empty
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return; // Exit function if any field is empty
    }
    axios
      .post("http://localhost:5000/add-user", {
        name,
        email,
        phoneNumber,
        dob,
        missingDate,
        aadhaarNumber,
      })
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Success",
          description: "User added successfully!",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/capture-train");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast({
          title: "Error",
          description: "Failed to add user. Please try again later.",
          status: "error",
          duration: 3000,
          position: "top-right",
        });
      });
  };

  const handleGuestFill = () => {
    setName("Guest");
    setEmail("vaibhavkambar77@gmail.com");
    setPhoneNumber("1234567890");
    setDob("2000-01-01");
    setMissingDate("2022-03-14");
    setAadhaarNumber("123456789012");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        onClick={handleBack}
        position="absolute"
        top={6}
        left={6}
        zIndex={17}
      />
      <div className="adduser-container">
        <h2>Add User</h2>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          className="adduser-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          id="email"
          className="adduser-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <Input
          type="tel"
          id="phoneNumber"
          className="adduser-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="dob">Date of Birth:</label>
        <Input
          type="date"
          id="dob"
          className="adduser-input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label htmlFor="missingDate">Date of Missing:</label>
        <Input
          type="date"
          id="missingDate"
          className="adduser-input"
          value={missingDate}
          onChange={(e) => setMissingDate(e.target.value)}
        />
        <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
        <Input
          type="number"
          id="aadhaarNumber"
          className="adduser-input"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
        />
        <Stack direction="row" spacing={4}>
          <Button
            className="adduser-button"
            onClick={handleAddUser}
            variant="primary"
          >
            Add User
          </Button>
          <Button
            className="adduser-button"
            onClick={handleGuestFill}
            variant="secondary"
          >
            Guest
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default AddUserPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Input,
//   Stack,
//   useToast, // Import useToast hook from Chakra UI
// } from "@chakra-ui/react";
// import axios from "axios"; // Import Axios for making HTTP requests
// import "../App.css";

// const AddUserPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [dob, setDob] = useState("");
//   const [missingDate, setMissingDate] = useState("");
//   const [aadhaarNumber, setAadhaarNumber] = useState("");

//   const navigate = useNavigate();
//   const toast = useToast(); // Initialize the useToast hook

//   const handleAddUser = () => {
//     // Check if any field is empty
//     if (
//       !name ||
//       !email ||
//       !phoneNumber ||
//       !dob ||
//       !missingDate ||
//       !aadhaarNumber
//     ) {
//       // Display toast message if any field is empty
//       toast({
//         title: "Error",
//         description: "All fields are required.",
//         status: "error",
//         duration: 3000,
//         position: "top-right",
//       });
//       return; // Exit function if any field is empty
//     }
//     axios
//       .post("http://localhost:5000/add-user", {
//         name,
//         email,
//         phoneNumber,
//         dob,
//         missingDate,
//         aadhaarNumber,
//       })
//       .then((response) => {
//         console.log(response.data);
//         toast({
//           title: "Success",
//           description: "User added successfully!",
//           status: "success",
//           duration: 3000,
//           position: "top-right",
//         });
//         setTimeout(() => {
//           navigate("/capture-train");
//         }, 1000);
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//         toast({
//           title: "Error",
//           description: "Failed to add user. Please try again later.",
//           status: "error",
//           duration: 3000,
//           position: "top-right",
//         });
//       });
//   };

//   return (
//     <div className="adduser-container">
//       <h2>Add User</h2>
//       <label htmlFor="name">Name:</label>
//       <Input
//         type="text"
//         id="name"
//         className="adduser-input"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label htmlFor="email">Email:</label>
//       <Input
//         type="email"
//         id="email"
//         className="adduser-input"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label htmlFor="phoneNumber">Phone Number:</label>
//       <Input
//         type="tel"
//         id="phoneNumber"
//         className="adduser-input"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <label htmlFor="dob">Date of Birth:</label>
//       <Input
//         type="date"
//         id="dob"
//         className="adduser-input"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//       />
//       <label htmlFor="missingDate">Date of Missing:</label>
//       <Input
//         type="date"
//         id="missingDate"
//         className="adduser-input"
//         value={missingDate}
//         onChange={(e) => setMissingDate(e.target.value)}
//       />
//       <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
//       <Input
//         type="number"
//         id="aadhaarNumber"
//         className="adduser-input"
//         value={aadhaarNumber}
//         onChange={(e) => setAadhaarNumber(e.target.value)}
//       />
//       {/* <Button onClick={handleAddUser}>Add User</Button> */}
//       <button className="adduser-button" onClick={handleAddUser}>
//         Add User
//       </button>
//     </div>
//   );
// };

// export default AddUserPage;
