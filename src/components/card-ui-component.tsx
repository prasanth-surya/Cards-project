import React from "react";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import { Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  );
}
