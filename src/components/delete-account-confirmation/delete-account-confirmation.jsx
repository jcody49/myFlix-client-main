import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

export const DeleteAccountConfirmation = ({ user, token, onLoggedOut }) => {
    const [showModal, setShowModal] = useState(false);
  
    
    console.log("Token from localStorage:", token);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);



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
