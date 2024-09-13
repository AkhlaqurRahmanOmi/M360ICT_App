import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../services/Products";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import LoadingScreen from "./LoadingScreen";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <Typography variant="h6" color="error">
          Error fetching product: {error.message}
        </Typography>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <Typography variant="h6" color="textSecondary">
          Product not found
        </Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      {/* Image Section */}
      <Grid item xs={12} md={5}>
        <Card
          sx={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <CardContent>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "80%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Details Section */}
      <Grid item xs={12} md={7}>
        <Card
          sx={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            padding: 3,
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {product.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description}
            </Typography>

            {/* Product Information */}
            <Typography variant="h6" color="textSecondary">
              Brand: {product.brand}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Category: {product.category}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Price: ${product.price}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Rating: {product.rating}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Stock: {product.stock}
            </Typography>

            {/* Edit Button */}
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/edit-product/${id}`}
              >
                Edit Product
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
