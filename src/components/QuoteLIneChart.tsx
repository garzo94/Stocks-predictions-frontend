import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import useRequestResource from "../hooks/useRequestResource";
import useData from "../globalVariables/dataContext";
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

import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import {
  format,
  startOfMonth,
  endOfMonth,
  endOfYear,
  eachMonthOfInterval,
  eachYearOfInterval,
  getYear,
} from "date-fns";

export default function QuoteLIneChart() {
  // getting cricules data (max value by year)
  const [circules, setCircules] = useState<any[]>([]);
  function getCircules() {
    if (parseData) {
      var groupsYear: any = [];
      parseData.forEach((val) => {
        var date = getYear(val.date);
        if (date in groupsYear) {
          groupsYear[date].push(val);
        } else {
          groupsYear[date] = new Array(val);
        }
      });

      let dataCircules = groupsYear.map((val: any) => {
        return val.reduce(function (prev: any, current: any) {
          return prev.y > current.y ? prev : current;
        });
      });

      setCircules(dataCircules);
    }
  }

  // ########
  const { priceHistory, timeSeries } = useData();

  let parseData: parseDataType[] = [];

  priceHistory.forEach((value, ind) => {
    let date = new Date(timeSeries[ind]);
    parseData.push({ date, value });
  });

  useEffect(() => {
    getCircules();
  }, []);

  let [ref, bounds] = useMeasure();

  let height = bounds.height;
  let width = bounds.width;
  let margin = {
    top: 20,
    right: 20,
    bottom: 25,
    left: 30,
  };
  let startDay = startOfMonth(parseData!.at(0)!.date);
  let endDay = endOfMonth(parseData!.at(-1)!.date);
  let months = eachYearOfInterval({ start: startDay, end: endDay });

  let xScale = d3
    .scaleTime()

    .domain([startDay, endDay])
    .range([margin.left, width - margin.right]);

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(parseData.map((d) => d.value)) as [number, number])
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x((d) => {
      return xScale((d as unknown as parseDataType).date);
    })
    .y((d) => {
      return yScale((d as unknown as parseDataType).value);
    });

  let d = line(parseData as unknown as [number, number][]);

  return (
    <Box
      sx={{
        width: "90%",
        height: "800px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        pt: 5,
      }}
    >
      {parseData ? (
        <svg
          ref={ref}
          style={{
            backgroundColor: "gray",
            padding: 5,
            width: "70%",
            height: "50%",
            borderRadius: "10px",
          }}
          viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        >
          {yScale.ticks().map((max) => {
            return (
              // yScale
              // transform={`translate(0,${yScale(max)})` if I want less numbers on y scale
              <g>
                {/* line */}
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={yScale(max)}
                  y2={yScale(max)}
                  stroke="rgba(0,0,0,0.9)"
                  strokeDasharray="1.5"
                />
                <text alignmentBaseline="middle" y={yScale(max)}>
                  {max}
                </text>
              </g>
            );
          })}

          {/* XScale */}
          {months.map((date, i) => (
            <g transform={`translate(${xScale(date)},0)`}>
              {i % 2 === 1 && (
                <rect
                  width={xScale(endOfYear(date)) - xScale(date)}
                  height={height - margin.bottom}
                  fill="rgba(0,0,0,0.1)"
                />
              )}

              <text
                className="yticks"
                x={(xScale(endOfYear(date)) - xScale(date)) / 2}
                y={height - 5}
                textAnchor="middle"
              >
                {format(date, "MMM y")}
              </text>
            </g>
          ))}

          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, type: "spring" }}
            d={d!}
            fill="none"
            stroke="white"
          />

          {circules.map((d) => {
            return (
              <circle
                key={d.date.toString()}
                fill="black"
                r="8"
                cx={xScale(d.date)}
                cy={yScale(d.value)}
              />
            );
          })}
        </svg>
      ) : (
        <h2>Select a stock</h2>
      )}
    </Box>
  );
}

interface parseDataType {
  date: Date;
  value: number;
}
