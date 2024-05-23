// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing custom CSS styles
import { Provider } from "react-redux"; // Importing Provider from react-redux for Redux store integration
import store from "./app/store.js"; // Importing the Redux store configuration

// Rendering the application root component using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the application with the Redux Provider to provide the store to all components
  <Provider store={store}>
    {/* Using BrowserRouter as Router to enable routing */}
    <Router>
      {/* Rendering the main App component */}
      <App />
    </Router>
  </Provider>
);
