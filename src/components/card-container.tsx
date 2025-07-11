"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardComponent from "./cardComponent";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import AddCardDialog from "./add-card-dialog";
import { toast } from "react-toastify";

const blastVariants = {
  exit: {
    opacity: 0,
    scale: 1.4,
    rotate: 25,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  initial: { opacity: 0, scale: 0.9, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
};

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
        const sorted = res.data.sort((a, b) => Number(b.id) - Number(a.id));
        setData(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = async (cardId) => {
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
              <Grid item key={card.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                <motion.div
                  layout
                  variants={blastVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card sx={{ padding: 2, backgroundColor: "#FAF6E9" }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 500,
                          maxWidth: "160px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {card?.manufacturer}
                      </Typography>
                      <Typography>${card?.price}</Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography>{card?.name}</Typography>

                      <IconButton onClick={() => handleDeleteCard(card?.id)}>
                        <DeleteIcon
                          sx={{
                            fontSize: "18px",
                            opacity: 0.6,
                            ":hover": { opacity: 1 },
                          }}
                          color="error"
                        />
                      </IconButton>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
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
