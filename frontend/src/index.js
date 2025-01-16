import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the App component
import "./styles/App.css"; // Import your styles (if you have any)

const root = ReactDOM.createRoot(document.getElementById("root")); // Find the 'root' div from index.html

root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
