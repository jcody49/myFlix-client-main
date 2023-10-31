import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import "./movie-view.scss";
import { useNavigate } from "react-router-dom";

/**
 * A component to view and interact with a specific movie's details.
 * @function
 * @param {Object} props - the component's props 
 * @param {Array} props.movies - array of movies
 * @param {Object} props.user - user object
 * @param {Function} props.setUser - A callback function to set the user object.
 * @returns {JSX.Element} The movie view component's JSX.
 */
export const MovieView = ({ movies, user, setUser }) => {
  console.log("Received user prop:", user);
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();



  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [isMovieToWatch, setIsMovieToWatch] = useState(false);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorited = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorited);
    }
  }, [user, movieId]);
  
  useEffect(() => {
    if (user && user.MoviesToWatch) {
      const isAMovieToWatch = user.MoviesToWatch.includes(movieId);
      setIsMovieToWatch(isAMovieToWatch);
    }
  }, [user, movieId]);

  /**
   * Removes the movie from the user's favorite list.
   * @function
   */
  const removeFavorite = () => {
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/movies/${movieId}/favorites`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  /**
   * Removes the movie from the user's watchlist.
   * @function
   */
  const removeMovieToWatch = () => {
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/movies/${movieId}/watchlist`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsMovieToWatch(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  /**
   * Adds the movie to the user's favorite list.
   * @function
   */
  const addToFavorite = () => {
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/movies/${movieId}/favorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  /**
   * Adds the movie to the user's watchlist.
   * @function
   */
  const addToMoviesToWatch = () => {
    console.log("Adding movie to watchlist...");
    fetch(
      `https://myflixmovieapp-3df5d197457c.herokuapp.com/users/${user.Username}/${movieId}/watchlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log("Response from API:", response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add movie to watchlist");
      })
      .then((data) => {
        console.log("Data from API:", data); // Log the data received from the API
        setIsMovieToWatch(true);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Updated user data in local storage:", JSON.parse(localStorage.getItem("user")));
        setUser(data);
      })
      .catch((error) => {
        console.error("Error adding movie to watchlist:", error);
      });
  };
  

  const movie = movies.find((b) => b._id === movieId);

  return (
    <>
      <Card className="mt-1 mb-1 h-100 bg-secondary text-white">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-primary text-center mb-4"><h2>{movie.Title}</h2></Card.Title>
          <Card.Text><span className="text-secondary">Description: </span>{movie.Description}</Card.Text>
          <Card.Text><span className="text-secondary">Director: </span>{movie.Director.Name}</Card.Text>
          <Card.Text><span className="text-secondary">Genre: </span>{movie.Genre.Name}</Card.Text>
          <div className="d-flex justify-content-center mt-5 flex-column">
            {isFavorite ? (
              <Button className="mb-3" size="sm" onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
              <Button className="mb-3" size="sm" onClick={addToFavorite}>Add to favorites</Button>
            )}

            {isMovieToWatch ? (
              <Button className="mb-3" size="sm" onClick={removeMovieToWatch}>Remove from Watchlist</Button>
            ) : (
              <Button className="mb-3" size="sm" onClick={addToMoviesToWatch}>Add movie to Watchlist</Button>
            )}
          </div>
          <br/>
          <br/>

              
          <div
            className="d-flex justify-content-center"
            onClick={() => navigate(-1)} 
          >
            <Button variant="secondary">Back</Button>
          </div>
         


        </Card.Body>
      </Card>
    </>
  )
};
