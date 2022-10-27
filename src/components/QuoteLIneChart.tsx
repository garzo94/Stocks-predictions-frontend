import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import useData from "../globalVariables/dataContext";
import { Box, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

import {
  format,
  startOfMonth,
  endOfMonth,
  endOfYear,
  eachYearOfInterval,
  getYear,
} from "date-fns";
import ModelPerformance from "./ModelPerformance";
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

  // ######## Close Price Historry
  const { priceHistory, timeSeries, getParseData } = useData();

  let parseData: parseDataType[] = [];

  priceHistory.forEach((value, ind) => {
    let date = new Date(timeSeries[ind]);
    parseData.push({ date, value });
  });

  useEffect(() => {
    getParseData(parseData);
  }, []);

  useEffect(() => {
    getCircules();
  }, [priceHistory]);

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

  // pulsating circule
  useEffect(() => {
    drawPulsatingCircle();
  });

  const drawPulsatingCircle = () => {
    (function repeat() {
      d3.selectAll(".circle")
        .transition()
        .duration(300)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0)
        .transition()
        .duration(300)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0.5)
        .transition()
        .duration(1000)
        .attr("stroke-width", 25)
        .attr("stroke-opacity", 0)
        .ease(d3.easeSin)
        .on("end", repeat);
    })();
  };

  return (
    <Box
      sx={{
        width: { lg: "85%", md: "85%", sm: "95%", xs: "95%" },
        height: "400px",
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
            backgroundColor: "#1A172C",
            padding: 5,
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        >
          {yScale.ticks().map((max) => {
            return (
              <g>
                {/* line */}
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={yScale(max)}
                  y2={yScale(max)}
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="1"
                />
                <text
                  fill="rgba(255,255,255,0.5)"
                  alignmentBaseline="middle"
                  y={yScale(max)}
                >
                  {max}
                </text>
              </g>
            );
          })}

          {/* XScale */}
          {months.map((date, i) => (
            <g key={i} transform={`translate(${xScale(date)},0)`}>
              {i % 2 === 1 && (
                <rect
                  width={xScale(endOfYear(date)) - xScale(date)}
                  height={height - margin.bottom}
                  fill="rgba(0,0,0,0.2)"
                />
              )}

              <text
                className="yticks"
                x={(xScale(endOfYear(date)) - xScale(date)) / 2}
                y={height - 5}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
              >
                {format(date, "MMM y")}
              </text>
            </g>
          ))}

          <motion.path
            className="shadow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, type: "spring" }}
            d={d!}
            fill="none"
            stroke="#03FFF9"
          />

          {circules.map((d) => {
            return (
              <Tooltip
                key={d.value}
                title={`Close price: ${d.value.toFixed(2)}`}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      fontSize: 15,
                    },
                  },
                }}
              >
                <circle
                  className="circle"
                  key={d.date.toString()}
                  stroke="#E4FCFF"
                  fill="#E4FCFF"
                  r="8"
                  cx={xScale(d.date)}
                  cy={yScale(d.value)}
                />
              </Tooltip>
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
