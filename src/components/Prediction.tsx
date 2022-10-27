import React from "react";
import useData from "../globalVariables/dataContext";
import { Typography, Box } from "@mui/material";
export default function Prediction() {
  const { price } = useData();

  var predprice = Number(price[0]).toFixed(2);
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          pt: 5,
          pb: 4,
          fontFamily: "Roboto Flex",
          color: "rgba(255,255,255,0.8)",
          fontSize: { lg: 45, md: 45, sm: 35, xs: 25 },
        }}
      >
        Price Prediction
      </Typography>
      <Box
        sx={{
          bgcolor: "rgba(3,255,249,0.8)",
          width: { lg: "200px", md: "200px", sm: "150px" },
          borderRadius: "10px",
          p: 2,
          textAlign: "center",
          fontSize: { lg: 25, md: 25, sm: 18, xs: 17 },
          boxShadow: "0px 0px 15px #03FFF9",
        }}
      >
        {predprice}
      </Box>
    </Box>
  );
}
