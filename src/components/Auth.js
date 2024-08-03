import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { TextField, Button, Box, Typography } from "@mui/material";

/**
 * Auth Component
 *
 * This file defines the authentication component responsible for managing user authentication
 * within the application, providing functionality for users to sign up, log in, and log out
 * using Firebase Authentication services.
 *
 * Enhancement Three: This code was added for enhancement three connecting to Google Firestore database.
 *
 * Author: Scott Martel
 * Date: 08/01/2024
 */

const Auth = ({ onAuthChange }) => {
  // State to manage the user's email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between registering and logging in

  // Function to handle user registration
  const handleRegister = async () => {
    try {
      // Attempt to create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!"); // Notify the user of successful registration
      onAuthChange(true); // Call the function to change authentication status to true
    } catch (error) {
      alert("Invalid Credentials");
      console.error("Error registering user:", error.message); // Log error if registration fails
    }
  };

  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Attempt to sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!"); // Notify the user of successful login
      onAuthChange(true); // Call the function to change authentication status to true
    } catch (error) {
      console.error("Error logging in:", error.message); // Log error if login fails
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {isRegistering ? "Register" : "Login"}
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update the email state on change
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update the password state on change
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {isRegistering ? (
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{
              backgroundColor: "#276678",
              my: 2,
              "&:hover": { backgroundColor: "#1687A7" },
            }}
          >
            Register
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#276678",
              my: 2,
              "&:hover": { backgroundColor: "#1687A7" },
            }}
          >
            Login
          </Button>
        )}
        <Button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </Button>
      </Box>
    </Box>
  );
};

// <Button
//           variant="contained"
//           onClick={handleLogin}
//           sx={{
//             backgroundColor: "#276678",
//             my: 2,
//             "&:hover": { backgroundColor: "#1687A7" },
//           }}
//         ></Button>

export default Auth;
