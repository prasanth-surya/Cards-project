import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import CardsContainer from "@/components/card-container";
import { CircularProgress } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: "linear-gradient(to right, #005aa7, #fffde4)",
        minHeight: "100vh",
      }}
    >
      <CardsContainer />
    </Container>
  );
}
