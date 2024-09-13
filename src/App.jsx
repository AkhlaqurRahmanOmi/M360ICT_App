import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import EditProduct from './Components/EditProduct'

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Pink
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
