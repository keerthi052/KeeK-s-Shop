import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  let [updateproduct, setupdateproduct] = useState(null);
  let { id } = useParams();
  let navigate = useNavigate();

  // Fetch product data when component mounts
  useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`)
      .then(res => setupdateproduct(res.data))
      .catch(err => console.error("Error fetching product:", err.message));
  }, [id]);

  // Handle input change
  let handleChange = (e) => {
    let { name, value } = e.target;

    if (name.includes("rating.")) {
      let fieldname = name.split("rating.")[1]; // rate or count
      setupdateproduct({
        ...updateproduct,
        rating: {
          ...updateproduct.rating,
          [fieldname]: value,
        },
      });
    } else {
      setupdateproduct({
        ...updateproduct,
        [name]: value,
      });
    }
  };

  // Handle update (PUT request)
  let handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateproduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product updated successfully ✅");
        console.log("Updated:", data);
        navigate("/product"); // redirect after update (optional)
      })
      .catch((err) => console.error("Error updating:", err.message));
  };

  if (updateproduct === null) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={20} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5" textAlign="center" style={{ margin: "10px 0" }}>
        Update Product
      </Typography>

      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={updateproduct.title}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={updateproduct.category}
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={updateproduct.rating.rate}
              name="rating.rate"
              label="Rate"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={updateproduct.rating.count}
              name="rating.count"
              label="Count"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateProduct;
