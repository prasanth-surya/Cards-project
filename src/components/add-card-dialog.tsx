"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function AddCardDialog({ open, handleClose, getCardsData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    // Only allow numeric and up to 5 digits
    if (/^\d{0,5}$/.test(val)) {
      setPrice(val);
    }
  };

  const handlePostNewCard = async () => {
    await axios
      .post("https://6870c6567ca4d06b34b7ee6a.mockapi.io/Cards", {
        manufacturer: name,
        price: price,
      })
      .then((res) => {
        getCardsData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      open={open}
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Typography
        id="dialog-title"
        sx={{ fontSize: "18px", fontWeight: 500, p: "10px 14px" }}
      >
        {"Add Vehicle Details"}
      </Typography>
      <Divider />
      <DialogContent>
        <Stack direction={"column"} spacing={3}>
          <TextField
            fullWidth
            size="small"
            id="outlined-controlled"
            label="Vehicle Name"
            value={name}
            sx={{ minWidth: "300px" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />

          <TextField
            id="price-id"
            inputMode="numeric"
            size="small"
            type="text"
            label="Vehicle Price"
            value={price}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                maxLength: 4,
              },
            }}
          />
        </Stack>
      </DialogContent>
      <Divider />

      <DialogActions>
        <Button size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handlePostNewCard}
          autoFocus
          variant="contained"
          disabled={!name || !price}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
