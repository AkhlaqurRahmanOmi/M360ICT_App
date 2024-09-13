import React, { useState } from "react";
import { useGetProductsQuery } from "../services/Products";
import { Table, Button } from "antd";
import { CircularProgress, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

import LoadingScreen from './LoadingScreen'

// Ant Design Table Columns
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `$${price}`,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link to={`/product/${record.id}`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          View Details
        </Button>
      </Link>
    ),
  },
];

const ProductList = () => {
  // State for pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch products with pagination
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({ limit: pageSize, skip: (page - 1) * pageSize });

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error fetching products: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Table
        columns={columns}
        dataSource={products?.products || []} // Default to an empty array if products is undefined
        rowKey="id"
        pagination={{
          current: page,
          pageSize,
          total: products?.total || 0, // Assume the API provides total number of products
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </Container>
  );
};

export default ProductList;
