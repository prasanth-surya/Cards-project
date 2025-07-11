import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import AppBarComponent from "@/components/appbarComponent";
import CardsContainer from "@/components/card-container";

export default function Home() {
  return (
    <>
      <AppBarComponent />
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: "18px", fontWeight: 500, mt: "10px" }}>
          Hola! Your favourite recipe book
        </Typography>
        <CardsContainer />
      </Container>
    </>
  );
}
