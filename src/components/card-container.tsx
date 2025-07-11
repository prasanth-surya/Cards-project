"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCardDialog from "./add-card-dialog";
import CardComponent from "./card-ui-component";

export default function CardsContainer() {
  const [data, setData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleClose = () => {
    setOpenAddDialog(false);
  };

  const getCardsData = async () => {
    await axios
      .get("https://6870c6567ca4d06b34b7ee6a.mockapi.io/Cards")
      .then((res) => {
        const sorted = res.data.sort(
          (a: { id: string }, b: { id: string }) => Number(b.id) - Number(a.id)
        );

        setData(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = async (cardId: string) => {
    await axios
      .delete(`https://6870c6567ca4d06b34b7ee6a.mockapi.io/Cards/${cardId}`)
      .then((res) => {
        getCardsData();
        toast.success("Successfully Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <Box sx={{ py: "20px" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ py: "20px" }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, color: "#fffde4" }}
        >
          Vehicle Gallery
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleClickOpen}
          sx={{ backgroundColor: "#005aa7" }}
        >
          Add
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <AnimatePresence>
          {data &&
            data.map((card) => (
              <CardComponent card={card} handleDeleteCard={handleDeleteCard} />
            ))}
        </AnimatePresence>
      </Grid>
      <AddCardDialog
        open={openAddDialog}
        handleClose={handleClose}
        getCardsData={getCardsData}
      />
    </Box>
  );
}
