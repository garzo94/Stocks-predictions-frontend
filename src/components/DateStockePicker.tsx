import React, { useState, useEffect } from "react";
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
  Snackbar,
  Button,
} from "@mui/material";

export default function DateStockePicker() {
  // open Snack
  const [open, setOpen] = useState(false);
  //Global varialbes
  const { getResourceData } = useRequestResource();
  //Date picker ///////////////
  // start date
  const [startDate, setstartDate] = useState<string | Date>("");
  const handleChangeStart = (start: any) => {
    setstartDate(format(new Date(start), "yyyy-MM-dd"));
  };
  /////////////////////////

  // end date ////////////////
  const [endDate, setEndDate] = useState<string | Date>("");
  const handleChangeEnd = (end: any) => {
    setEndDate(format(new Date(end), "yyyy-MM-dd"));
  }; //////////////

  // stock //////////
  const [stock, setStock] = useState("");
  const handleChangeStock = (event: SelectChangeEvent) => {
    setStock(event.target.value as string);
  };

  // handle  snackbar

  const handleClose = () => {
    setOpen(false);
  };

  // set click request
  const [request, setRequest] = useState(false);

  const action = (
    <React.Fragment>
      <Button sx={{ color: "#03FFF9" }} size="small" onClick={handleClose}>
        Close
      </Button>
    </React.Fragment>
  );
  //////////////

  let totalDays =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 3600 * 24);

  useEffect(() => {
    if (totalDays > 365 && stock !== "") {
      getResourceData({
        query: `?start=${startDate}&end=${endDate}&stock=${stock}`,
      });
    } else {
      stock !== "" ? setOpen(true) : null;
    }
  }, [stock, request]);

  // Menu items
  const stockMenu = ["NFLX", "NVDA", "DIS", "AAPL", "MSFT"];
  /////////////////////////
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Date range not allowed, enter a range more than 1 year"
        action={action}
      />
      <Typography
        variant="h3"
        sx={{
          pb: 5,
          fontFamily: "Roboto Flex",
          color: "rgba(255,255,255,0.8)",
          fontSize: { lg: 45, md: 45, sm: 35, xs: 25 },
        }}
      >
        Close Price History
      </Typography>
      <Stack
        spacing={{ lg: 3, md: 3, sm: 0, xs: 0 }}
        direction="row"
        sx={{ pb: 2 }}
      >
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
            <InputLabel
              id="stock-label"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Stock
            </InputLabel>
            <Select
              sx={{ color: "rgba(255,255,255,0.7)" }}
              id="demo-simple-select"
              value={stock}
              label="Stock"
              onChange={handleChangeStock}
            >
              {stockMenu.map((stock) => {
                return (
                  <MenuItem
                    key={stock}
                    value={stock}
                    onClick={() => setRequest(!request)}
                  >
                    {stock}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
}
