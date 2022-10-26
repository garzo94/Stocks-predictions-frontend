import React from "react";
import useData from "../globalVariables/dataContext";
import { Typography, Box } from "@mui/material";
export default function Prediction() {
  const { price } = useData();
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          pt: 5,
          pb: 4,
          fontFamily: "Roboto Flex",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        Price Prediction
      </Typography>
      <Box sx={{ bgcolor: "rgba(255,255,255,0.8)" }}>{price}</Box>
    </Box>
  );
}
