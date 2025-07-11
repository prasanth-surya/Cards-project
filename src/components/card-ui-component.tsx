import React from "react";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

interface CardType {
  id: string;
  manufacturer: string;
  price: string;
  name?: string;
}

interface CardComponentProps {
  card: CardType;
  handleDeleteCard: (id: string) => void;
}

export default function CardComponent({
  card,
  handleDeleteCard,
}: CardComponentProps) {
  return (
    <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
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
  );
}
