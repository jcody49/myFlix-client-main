import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

/**
 * A component to confirm the deletion of a user account.
 * @function
 * @param {Object} props - The component's props.
 * @param {Object} props.user - The user information.
 * @param {string} props.token - The user's authentication token.
 * @param {Function} props.onLoggedOut - A callback function to log the user out.
 * @returns {JSX.Element} The component's JSX.
 */
export const DeleteAccountConfirmation = ({ user, token, onLoggedOut }) => {
    const [showModal, setShowModal] = useState(false);
  
    
    console.log("Token from localStorage:", token);

    /**
     * Opens the delete account confirmation modal.
     * @function
     */
    const handleShowModal = () => setShowModal(true);

    /**
     * Closes the delete account confirmation modal.
     * @function
     */
    const handleCloseModal = () => setShowModal(false);


    /**
     * Handles the user account deletion process.
     * @function
     */
    const handleDeleteUser = () => {
      fetch(`https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Account deleted successfully');
            onLoggedOut(); // Log out the user after successful deletion
          } else {
            console.error('Failed to delete account');
          }
        })
        .catch((error) => {
          console.error('Error during account deletion:', error);
        })
        .finally(() => {
          handleCloseModal(); // Close the modal whether deletion was successful or not
        });
    };

  return (
    <>
      <Nav.Link onClick={handleShowModal}>Delete Account</Nav.Link>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account permanently?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
          <Button variant="secondary" onClick={handleCloseModal}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
