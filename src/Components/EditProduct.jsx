import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../services/Products";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation(); // RTK Query mutation for updating

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        brand: product.brand,
        category: product.category,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id, ...formData });
      navigate(`/product/${id}`); // Redirect to the product detail page after successful update
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
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

  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Edit Product
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditProduct;
