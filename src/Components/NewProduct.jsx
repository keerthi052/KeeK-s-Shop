import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid, TextField, Typography, Button } from "@mui/material";

const NewProduct = () => {
  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 2000,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  // handle input change
  let handleChange = (e) => {
    let { name, value } = e.target;

    if (name.includes("rating.")) {
      let fieldname = name.split("rating.")[1]; // rate or count
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldname]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  // handle submit
  let handleAdd = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product added successfully ✅");
        console.log("Saved:", data);
        // reset form
        setNewProduct({
          title: "",
          price: 2000,
          description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          category: "",
          image:
            "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
          rating: {
            rate: 0,
            count: 0,
          },
        });
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Paper elevation={20} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5" textAlign="center" style={{ margin: "10px 0" }}>
        Create New Product
      </Typography>

      <form onSubmit={handleAdd}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={newProduct.title}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={newProduct.category}
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={newProduct.rating.rate}
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
              value={newProduct.rating.count}
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
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewProduct;
