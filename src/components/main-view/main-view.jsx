import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import moviesImage from "../../assets/movies.png";
import logo from "../../assets/logo.png";


import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

/**
 * The main view component for the application.
 * @function
 * @returns {JSX.Element} The main view component's JSX.
 */
export const MainView = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  console.log("Stored User:", localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedUserData = localStorage.getItem("user");
  const storedUser = storedUserData ? JSON.parse(storedUserData) : null;
  console.log("Stored User Data:", storedUserData);
  console.log("Parsed User Data:", storedUser);
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [filter, setFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [moviesLoaded, setMoviesLoaded] = useState(false);


  
  console.log("Token from localStorage:", token);

  /**
   * Handles the user's log out action.
   * @function
   */
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clearing token and other user data from localStorage
  };

  useEffect(() => {
    if (!token) {
      setLoading(false); // If there's no token, set loading to false
      return;
    }
    fetch("https://myflixmovieapp-3df5d197457c.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
        setMoviesLoaded(true);
        setLoading(false); // Set loading to false after fetching the movies
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false); // Set loading to false after fetching the movies
      });
  }, [token]);

  
  return (
    <>
    <BrowserRouter>
      <NavigationBar user={user} token={token} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        }} 
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace/>
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onLoggedOut={onLoggedOut}
                      />
                    </Col>
                  )}
                </>
              }
            />
            
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>This list is empty!</Col>
                  ) : (
                    <Col md={8} >
                      <MovieView
                        movies={movies}
                        user={user}
                        setUser={setUser}
                        token={token}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <>
                      <Col>
                        <ProfileView
                          user={user}
                          token={token}
                          setUser={setUser}
                          movies={movies}
                          onLoggedOut={onLoggedOut}
                        />
                      </Col>  
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : 
                    movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      <Row className="justify-content-center">
                        <img
                          src={moviesImage}
                          alt="Movies"
                          className="movies-image"
                          style={{ width: "80%", maxWidth: "400px" }}
                        />
                      </Row>
                      <Row className="mt-1 mb-2 ms-1 w-100">
                        <Form.Control
                          class="text-white"
                          type="text"
                          placeholder="Search..."
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        />
                        
                      </Row>
                      {loading ? (
                        <Col>Loading movies...</Col>
                      ) : movies.length === 0 ? (
                        <Col>This list is empty!</Col>
                      ) : (
                        movies
                        .sort((a, b) => a.Title.localeCompare(b.Title)) // Sort movies alphabetically
                        .filter((movie) =>
                          movie.Title.toLowerCase().includes(filter.toLowerCase()) &&
                          (!selectedGenre || movie.Genre.Name === selectedGenre)
                        )
                        .map((movie) => (
                          <Col className="mb-5" key={movie._id} md={4}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      )}
                    </>
                  )}
                </>
              }
            />
            
          </Routes>
        
      </Row>
    </BrowserRouter>
    <footer className="footer mt-5">
      <p className='d-flex justify-content-center align-items-center'>
        <span className='text-secondary' style={{ fontSize: '11px' }}>
          This is a <a href="https://jcody49.github.io/Portfolio-Site" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Logo" className="logo ms-1 me-1" style={{ width: '55px', height: '26px' }} />
          </a> web application.
        </span>
      </p>
      <p className='d-flex justify-content-center align-items-center mb-1'>
        <span className='text-secondary' style={{ position: "relative", top: "-18px", fontSize: '11px' }}>
          For more sweet coding-projects...
        </span>  
      </p>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <a
            href="https://github.com/jcody49"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", top: "-18px", fontSize: '11px' }}
          >
            Visit my GitHub
        </a>
      </div>
    </footer>

  </>
  );
};
