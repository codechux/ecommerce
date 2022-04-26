import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

import useStyle from "./style";

const products = [
  {
    id: 1,
    name: "Shirt",
    description: "Office shirt",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  },
  {
    id: 2,
    name: "Laptop",
    description: "macbook air",
    price: "$100",
    image:
      "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
  },
  {
    id: 3,
    name: "Phone",
    description: "Iphone 13",
    price: "$50",
    image:
      "https://images.unsplash.com/photo-1632633173522-47456de71b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGlwaG9uZSUyMDEzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
  },
];

const Products = ({ products, onAddToCart }) => {
  const classes = useStyle();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
