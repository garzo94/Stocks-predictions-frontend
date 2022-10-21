import React, { useState } from "react";
import useRequestResource from "../hooks/useRequestResource";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import {
  Box,
  Typography,
  TextField,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function DateStockePicker() {
  //Global varialbes
  const { getResourceData } = useRequestResource();
  //Date picker ///////////////
  // start date
  const [startDate, setstartDate] = useState<string | Date>(new Date());
  const handleChangeStart = (start: any) => {
    setstartDate(format(new Date(start), "yyyy-MM-dd"));
  };
  /////////////////////////

  // end date ////////////////
  const [endDate, setEndDate] = useState<string | Date>(new Date());
  const handleChangeEnd = (end: any) => {
    setEndDate(format(new Date(end), "yyyy-MM-dd"));
  }; //////////////

  // stock //////////
  const [stock, setStock] = useState("STOCK");
  const handleChangeStock = (event: SelectChangeEvent) => {
    setStock(event.target.value as string);
    getResourceData();
  };
  // Menu items
  const stockMenu = ["NFLX", "NVDA", "DIS", "FB", "AAPL", "BYND", "MSFT"];
  /////////////////////////
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h4" sx={{ pb: 5 }}>
        Close Price History
      </Typography>
      <Stack spacing={3} direction="row" sx={{ pb: 2 }}>
        <DesktopDatePicker
          label="Start Date"
          inputFormat="MM/DD/YYYY"
          value={startDate}
          onChange={handleChangeStart}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="MM/DD/YYYY"
          value={endDate}
          onChange={handleChangeEnd}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Stock</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stock}
              label="Stock"
              onChange={handleChangeStock}
            >
              {stockMenu.map((stock) => {
                return <MenuItem value={stock}>{stock}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
