import React from "react";
import {
  IconButton,
  Badge,
  Typography,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "./assets/logo.jpeg";

import useStyle from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyle();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={Logo}
              alt="Logo"
              height="25px"
              className={classes.image}
            />
            BIGMANDEM
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show Cart Item"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
