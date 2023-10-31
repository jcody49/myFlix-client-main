import React from "react";
import { createRoot } from 'react-dom/client';


import { MainView } from "./components/main-view/main-view";


import Container from "react-bootstrap/Container";


// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

/**
 * The main component of the application.
 * @function
 * @returns {JSX.Element} The main component's JSX.
 */
const MyFlixApplication = () => {

    return ( 
      <Container>
        <MainView />
      </Container> 

    );
};

/**
 * Finds the root of the app.
 * @constant {Element} container - The root element to render the app into.
 */
const container = document.querySelector("#root");

/**
 * The root element used to render the application.
 * @constant {ReactRoot} root - The root element for rendering the app.
 */
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);
