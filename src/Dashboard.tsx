import React, { useEffect } from "react";
import useRequestResource from "./hooks/useRequestResource";
import QuoteLIneChart from "./components/QuoteLIneChart";
export default function Dashboard() {
  const { getResourceData } = useRequestResource();
  useEffect(() => {
    getResourceData();
  }, []);
  return <QuoteLIneChart />;
}
