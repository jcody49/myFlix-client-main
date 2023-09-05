import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup-view.scss";
import signupImage from "../../assets/signup.png";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthdate, setBirthdate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthdate: Birthdate
    };

    fetch("https://myflixmovieapp-3df5d197457c.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
      <img 
        src={signupImage} 
        alt="Signup" 
        className="signup-image d-flex justify-content-center" 
        style={{ width: "80%", maxWidth: "400px"}} 
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="signUpFormUsername">
          <Form.Label className="text-white">Username:</Form.Label>
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            className="text-white"
          />
        </Form.Group>

        <Form.Group controlId="signUpFormPassword">
          <Form.Label className="text-white">Password:</Form.Label>
          <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="signUpFormEmail">
          <Form.Label className="text-white">Email:</Form.Label>
          <Form.Control
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white"
            required
          />
        </Form.Group>
        <Form.Group controlId="signUpFormBirthdate">
          <Form.Label className="text-white">Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={Birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="text-white"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mb-4 mx-auto d-block">
          Submit
        </Button>
      </Form>
    </>
  );
};
