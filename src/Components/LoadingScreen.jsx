// src/components/LoadingScreen.js

import React from "react";
import { CircularProgress, Typography, Container, Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box textAlign="center">
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" color="textSecondary" mt={2}>
          Loading, please wait...
        </Typography>
      </Box>
    </Container>
  );
};

export default LoadingScreen;
