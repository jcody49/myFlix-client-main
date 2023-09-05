import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie }) => {
  
  return (
    <>
      <div className="h-100 movie-card-wrapper">
        <Card style={{ border: 'none' }}>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body className="text-white">
              <Card.Title className="d-flex justify-content-center"><h2>{movie.Title}</h2></Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </>
  );
};

// Defines all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};
