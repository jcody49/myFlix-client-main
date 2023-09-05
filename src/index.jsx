import React from "react";
import { createRoot } from 'react-dom/client';


import { MainView } from "./components/main-view/main-view";


import Container from "react-bootstrap/Container";


// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {

    return ( 
      <Container>
        <MainView />
      </Container> 

    );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);
