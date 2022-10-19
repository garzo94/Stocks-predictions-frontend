import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import useRequestResource from "../hooks/useRequestResource";
import useData from "../globalVariables/dataContext";
export default function QuoteLIneChart() {
  const { closePriceHistory } = useRequestResource();
  const { priceHistory } = useData();
  console.log(priceHistory, "jijijx");
  const [parseData, setParseData] = useState({});

  let [ref, bounds] = useMeasure();
  let dummyData: [number, number][] = [
    [0, 10],
    [5, 50],
    [15, 75],
    [55, 100],
    [75, 10],
    [100, 5],
    [180, 50],
  ];

  let height = bounds.height;
  let width = bounds.width;
  let margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(dummyData.map((d) => d[0])) as [number, number])
    .range([margin.left, width - margin.right]);

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(dummyData.map((d) => d[0])) as [number, number])
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));
  let d = line(dummyData!);

  return (
    <>
      <svg
        ref={ref}
        style={{ backgroundColor: "gray" }}
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
      >
        <path d={d!} fill="none" stroke="black" />
      </svg>
    </>
  );
}
