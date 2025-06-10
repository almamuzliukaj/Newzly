import React from "react"; 
import ReactDOM from "react-dom/client"; 
import App from "./App.jsx"; 
import { BrowserRouter } from "react-router-dom"; 

// Create the root React DOM node and render the app inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode helps detect potential problems in the app during development
  <React.StrictMode>
    {/* BrowserRouter enables routing functionality in the app */}
    <BrowserRouter>
      {/* Render the main App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);