"use client";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AnimatePresence, easeIn, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCardDialog from "./add-card-dialog";
import CardComponent from "./card-ui-component";

const blastVariants = {
  exit: {
    opacity: 0,
    scale: 1.4,
    rotate: 25,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: easeIn,
    },
  },
  initial: { opacity: 0, scale: 0.9, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
};

interface card {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
  createdAt: string;
}

export default function CardsContainer() {
  const [data, setData] = useState<card[]>([]);
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
          {data.length > 0 ? (
            data.map((card) => (
              <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                <motion.div
                  layout
                  variants={blastVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardComponent
                    card={card}
                    handleDeleteCard={handleDeleteCard}
                  />
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  width: "100%",
                }}
              >
                <CircularProgress sx={{ color: "#fffde4" }} />
              </Box>
            </Grid>
          )}
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
