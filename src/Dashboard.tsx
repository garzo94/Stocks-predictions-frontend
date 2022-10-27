import React, { useEffect } from "react";
import useRequestResource from "./hooks/useRequestResource";
import QuoteLIneChart from "./components/QuoteLIneChart";
import useData from "./globalVariables/dataContext";
import { Box, Typography } from "@mui/material";
import DateStockePicker from "./components/DateStockePicker";
import ModelPerformance from "./components/ModelPerformance";
import { DotLoader } from "react-spinners";
export default function Dashboard() {
  const { priceHistory, parseData, loading } = useData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 5,
      }}
    >
      <DateStockePicker />
      {priceHistory.length === 0 && loading === false ? (
        <Typography
          variant="h5"
          sx={{
            mt: 10,
            color: "rgba(255,255,255,0.3)",
            fontSize: { lg: 40, md: 35, sm: 20, xs: 15 },
          }}
        >
          Select a start/end date and stock to train your model.
        </Typography>
      ) : loading === true ? (
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DotLoader color="#03FFF9" size={150} />
          <Typography sx={{ color: "#03FFF9", mt: 3 }}>
            Model in training
          </Typography>
        </Box>
      ) : (
        <QuoteLIneChart />
      )}

      {loading === true ? null : parseData.length !== 0 ? (
        <ModelPerformance />
      ) : null}
    </Box>
  );
}
