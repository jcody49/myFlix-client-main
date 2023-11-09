import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

/**
 * A component to display movie information in a card format.
 * @function
 * @param {Object} props - The component's props.
 * @param {Object} props.movie - The movie object to display.
 * @returns {JSX.Element} The movie card component's JSX.
 */
export const MovieCard = ({ movie }) => {
  
  return (
    <>
      <div className="h-100 movie-card-wrapper">
        <Card style={{ border: 'none' }}>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Card.Img variant="top" src={movie.ImagePath} />
            
          </Link>
          <Card.Body className="text-white">
            <Card.Title className="d-flex justify-content-center"><h2>{movie.Title}</h2></Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

/**
 * PropTypes for the MovieCard component, defining the prop constraints.
 */
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
