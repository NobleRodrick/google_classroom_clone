import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { ContextProvider } from "./context/context"; // Import ContextProvider

// Create a theme
const theme = createTheme({
  spacing: 8, // Customize the spacing scale
});

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>  {/* Wrap App with ContextProvider */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ContextProvider>
);


