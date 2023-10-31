import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import profileImage from "../../assets/profile.png";

/**
 * A component that displays the user's profile information, favorite movies, and movies to watch.
 * @function
 * @param {Object} props - The component's props.
 * @param {Object} props.user - The user object.
 * @param {string} props.token - The user's authentication token.
 * @param {Array} props.movies - An array of movie objects.
 * @param {Function} props.onLoggedOut - A callback function to handle user logout.
 * @param {Function} props.setUser - A callback function to update user information.
 * @returns {JSX.Element} The profile view component's JSX.
 */
export const ProfileView = ({ user, token, movies, onLoggedOut, setUser }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthdate, setBirthdate] = useState(user.Birthdate);
  const [showModal, setShowModal] = useState(false);
  
  if (!user || movies.length === 0) {
    return <div>Loading...</div>;
  }

  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  });

  // Creating a local variable to hold the MoviesToWatch IDs
  const moviesToWatchIds = user.MoviesToWatch || [];
  console.log("MoviesToWatch IDs from user object:", moviesToWatchIds);

  const moviesToWatch = movies.filter((movie) => {
    return user.MoviesToWatch && user.MoviesToWatch.includes(movie._id);
  });
  console.log("MoviesToWatch IDs from user object:", moviesToWatchIds);
  
  /**
   * Show the profile edit modal.
   * @function
   */
  const handleShowModal = () => {
    setShowModal(true);
  };

  /**
   * Close the profile edit modal.
   * @function
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Format a date string.
   * @function
   * @param {string} date - The date to format.
   * @returns {string} The formatted date in "YYYY-MM-DD" format.
   */
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

    /**
     * Handle the submission of profile edits.
     * @function
     */
    const handleProfileEditSubmit = () => {
            
        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthdate: formatDate(Birthdate)
        };

        fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }
        }).then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            alert("Update failed")
        }
        }).then((data) => {
            if(data !== undefined) {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                setUsername(data.Username);
                setPassword(data.Password);
                setEmail(data.Email);
                setBirthdate(data.Birthdate);
                handleCloseModal();
        }
        }).catch((error) => {
            console.error("Error updating profile:", error);
        });
    };

 
  /**
   * Handle the deletion of a user account.
   * @function
   */
  const handleDeleteUser = () => {
    fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        console.log("Deletion successful");
        onLoggedOut();
      } else {
        alert("something went wrong.")
      }
    })
  }

    return (
        <>
            <Col className="d-flex justify-content-center">
              <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="profile-image d-flex justify-content-center"
                  style={{ width: "80%", maxWidth: "400px"}} 
              />
            </Col>
            <Row 
                style={{ position: "relative", top: "-42px" }}>
                <h6 className="d-flex justify-content-center mb-3 text-primary">
                    Welcome to your myFlix profile, {user.Username}!
                </h6>
            </Row>

            <Row className="mt-1 mb-3">
                <Col className="text-white ms-n3">
                    <div className="text-secondary d-flex justify-content-center">
                        <h3>Profile Details</h3>
                    </div>
                </Col>        
            </Row>
            <Row className="text-white d-flex justify-content-center text-center mt-3">    
                Username: {user.Username}<br />
                Email: {user.Email}<br /><br />
                
                <span
                  className="d-flex justify-content-center"
                  style={{ fontSize: 12, cursor: "pointer" }}
                  onClick={handleShowModal}
                >
                  Edit Profile Information
                </span>

            </Row>
      {/* Add the modal for editing profile information */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add the forms to edit profile information */}
          <Form>
            {/* Username */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>
            {/* Password */}
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>
            {/* Email */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {/* Birth Date */}
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                value={Birthdate ? formatDate(Birthdate) : ""}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProfileEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <h3 className="text-secondary d-flex justify-content-center mt-5 mb-3">
          Favorite Movies:
        </h3>
        {favoriteMovies.length === 0 ? (
          <Col className="mb-5 d-flex justify-content-center">
            <p className="text-white">Favorite movie list is currently empty.</p>
          </Col>
        ) : (
          favoriteMovies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={4}>
              <MovieCard movie={movie}></MovieCard>
            </Col>
          ))
        )}
      </Row>

      <Row>
        <h3 className="text-secondary d-flex justify-content-center mt-5 mb-3">
          Movies to Watch:
        </h3>
        {moviesToWatch.length === 0 ? (
          <Col className="mb-5 d-flex justify-content-center">
            <p className="text-white">Movies to watch list is currently empty.</p>
          </Col>
        ) : (
          moviesToWatch.map((movie) => {
            console.log("Movies to Watch:", movie);
            return (            
              <Col className="mb-5" key={movie._id} md={4}>
                <MovieCard movie={movie}></MovieCard>
              </Col>
            );
          })
        )}
      </Row>


    </>
    )
}
