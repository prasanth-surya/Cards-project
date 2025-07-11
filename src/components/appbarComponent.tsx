"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function AppBarComponent() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "red" }}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Cards
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
