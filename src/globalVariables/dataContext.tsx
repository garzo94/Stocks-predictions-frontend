import React, { createContext, useReducer, useContext } from "react";
import { dataReducer, initialState, PriceActionKind } from "./dataReducer";

const Context = createContext(initialState);

export function Provider({ children }: any) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  // Price History
  const getHistoryPrices = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GET_PRICES,
      payload: value,
    });
  };

  const getTimeSeries = (value: string[]) => {
    dispatch({
      type: PriceActionKind.GET_TIME,
      payload: value,
    });
  };

  // Train data
  const getTrainPrices = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GET_TRAIN_PRICES,
      payload: value,
    });
  };

  const getTrainTime = (value: string[]) => {
    dispatch({
      type: PriceActionKind.GET_TIMETRAIN,
      payload: value,
    });
  };

  // Table Data
  const getPriceClose = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GET_CLOSE_PRICE,
      payload: value,
    });
  };

  const getPredictionClose = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GET_PREDICTION_CLOSE,
      payload: value,
    });
  };

  const getTimePrediction = (value: string[]) => {
    dispatch({
      type: PriceActionKind.GET_TIME_PREDICTION,
      payload: value,
    });
  };

  // parse Data
  const getParseData = (value: { date: Date; value: number }[]) => {
    dispatch({
      type: PriceActionKind.GET_PARSEDATA,
      payload: value,
    });
  };

  //getRMSE
  const getRmse = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GET_RMSE,
      payload: value,
    });
  };

  const Loading = (): void => {
    dispatch({
      type: PriceActionKind.LOADING,
      payload: [],
    });
  };

  const getPredPrice = (value: number[]): void => {
    dispatch({
      type: PriceActionKind.GET_PRED_PRICE,
      payload: value,
    });
  };

  const value = {
    //Price Hisory
    priceHistory: state.priceHistory,
    timeSeries: state.timeSeries,
    getHistoryPrices,
    getTimeSeries,

    // Train data
    priceTrain: state.priceTrain,
    timeTrain: state.timeTrain,
    getTrainPrices,
    getTrainTime,

    // Prediction data
    priceClose: state.priceClose,
    predictionClose: state.predictionClose,
    timePrediction: state.timePrediction,
    getPriceClose,
    getPredictionClose,
    getTimePrediction,

    // Get parse Data
    parseData: state.parseData,
    getParseData,

    // RMSE
    rmse: state.rmse,
    getRmse,

    // loading
    loading: state.loading,
    Loading,

    // pred price
    price: state.price,
    getPredPrice,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Context
const useData = () => {
  const context = useContext(Context);

  return context;
};

export default useData;
