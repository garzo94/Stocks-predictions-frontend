import React, { useEffect } from "react";
import useRequestResource from "./hooks/useRequestResource";
import QuoteLIneChart from "./components/QuoteLIneChart";
import useData from "./globalVariables/dataContext";
import { Box } from "@mui/material";
import DateStockePicker from "./components/DateStockePicker";
import ModelPerformance from "./components/ModelPerformance";
export default function Dashboard() {
  const { priceHistory, parseData } = useData();
  const { getResourceData } = useRequestResource();

  // useEffect(() => {
  //   getResourceData();
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 5,
      }}
      className="quepedo"
    >
      <DateStockePicker />
      {priceHistory.length !== 0 ? (
        <QuoteLIneChart />
      ) : (
        "Stock symbol has not been selected"
      )}

      {parseData.length !== 0 ? <ModelPerformance /> : null}
    </Box>
  );
}
