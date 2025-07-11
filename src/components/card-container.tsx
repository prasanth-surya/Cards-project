"use client";
import { Box, Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardComponent from "./cardComponent";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardsContainer() {
  const [data, setData] = useState([]);

  const getRecipes = async () => {
    await axios
      .get("https://dummyjson.com/recipes")
      .then((res) => {
        setData(res.data.recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        {data &&
          data.map((recipe) => {
            return (
              <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                <Card sx={{ padding: 2 }}>
                  <Image
                    alt={recipe?.name}
                    src={recipe?.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "200px" }}
                  />

                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography>{recipe?.name}</Typography>
                    <IconButton>
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
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
