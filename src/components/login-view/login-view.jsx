import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./login-view.scss";
import loginImage from "../../assets/login.png";

/**
 * A component for user login.
 * @function
 * @param {Object} props - The component's props.
 * @param {Function} props.onLoggedIn - A callback function for handling user login.
 * @returns {JSX.Element} The component's JSX.
 */
export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  /**
   * Handles the form submission for user login.
   * @function
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      Username: Username,
      Password: Password,
    };
  
    fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", (data.token)); // Set the token in localStorage
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user found.");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <img 
        src={loginImage}  
        alt="Login" 
        className="login-image d-flex justify-content-center" 
        style={{ width: "80%", maxWidth: "400px"}} 
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label className="text-white">Username:</Form.Label>
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>

        <Form.Group className='mt-3' controlId="formPassword">
          <Form.Label className="text-white">Password:</Form.Label>
          <Form.Control 
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mb-4 mx-auto d-block">
          Submit
        </Button>
        
        <div className="text-center">
          <p className="text-white">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

      </Form>
    </>
  );
};
