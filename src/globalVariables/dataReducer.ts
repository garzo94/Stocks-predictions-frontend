import { ClockNumberClassKey } from '@mui/x-date-pickers'
import {Reducer} from 'react'
export enum PriceActionKind{
    GET_PRICES = 'GET_PRICES',
    GET_TIME = 'GET_TIME',
    GET_TRAIN_PRICES = 'GET_TRAIN_PRICES',
    GET_TIMETRAIN = 'GET_TIMETRAIN',
    LOADING = 'LOADING',
    GET_CLOSE_PRICE = 'GET_CLOSE_PRICE',
    GET_PREDICTION_CLOSE = 'GET_PREDICTION_CLOSE',
    GET_TIME_PREDICTION = 'GET_TIME_PREDICTION',
    GET_PARSEDATA = 'GET_PARSEDATA',
    GET_RMSE = 'GET_RMSE',
    GET_PRED_PRICE = 'GET_PRED_PRICE'
}


interface priceActions {
    type: PriceActionKind,
    payload:any[]
}

interface State {
   // Prices History
    priceHistory:number[]
    timeSeries:string[]
    getHistoryPrices:(value:number[])=>void
    getTimeSeries:(value:string[])=>void

     // Prices History
     priceTrain:number[]
     timeTrain:string[]
     getTrainPrices:(value:number[])=>void
     getTrainTime:(value:string[])=>void

     // tableData
     priceClose:number[]
     predictionClose:number[]
     timePrediction:string[]
     getPriceClose:(value:number[])=>void
     getPredictionClose:(value:number[])=>void
     getTimePrediction:(value:string[])=>void

     // parseData
     parseData:{date:Date,value:number}[]
     getParseData:(value:{date:Date, value:number}[])=>void

     //RMSE
     rmse:number[]
     getRmse:(value:number[])=>void

     // loading
     loading:boolean
     Loading:()=>void

     // pred price
     price:number[]
     getPredPrice:(value:number[])=>void
}
export const initialState:State = {
  // Prices History
    priceHistory:[],
    timeSeries:[],
    getHistoryPrices:()=>{},
    getTimeSeries:()=>{},

  // Train Prices
  priceTrain:[],
  timeTrain:[],
  getTrainPrices:()=>{},
  getTrainTime:()=>{},

  // prediction DATA
  priceClose:[],
  predictionClose:[],
  timePrediction:[],
  getPriceClose:()=>{},
  getPredictionClose:()=>{},
  getTimePrediction:()=>{},

  // parseData
  parseData:[],
  getParseData:()=>{},

  // RMSE
  rmse:[],
  getRmse:()=>{},

  //loading
  loading:false,
  Loading:()=>{},

  //Pred price
  price:[],
  getPredPrice:()=>{}
}

export const dataReducer:Reducer<State,priceActions> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      // Price History
      case PriceActionKind.GET_PRICES:
        return {
          ...state,
          priceHistory: payload,
        };
        case PriceActionKind.GET_TIME:
        return {
          ...state,
          timeSeries: payload,
        };

      // Train Data
      case PriceActionKind.GET_TRAIN_PRICES:
        return {
          ...state,
          priceTrain: payload,
        };

        case PriceActionKind.GET_TIMETRAIN:
          return {
            ...state,
            timeTrain: payload,
          };

      // Table Data
      case PriceActionKind.GET_CLOSE_PRICE:
        return {
          ...state,
          priceClose: payload,
        };

      case PriceActionKind.GET_PREDICTION_CLOSE:
        return {
          ...state,
          predictionClose: payload,
        };

      case PriceActionKind.GET_TIME_PREDICTION:
        return {
          ...state,
          timePrediction: payload,
        };
      case PriceActionKind.GET_PARSEDATA:
        return {
          ...state,
          parseData: payload,
        };
      case PriceActionKind.GET_RMSE:
        return {
          ...state,
          rmse: payload,
        };

      case PriceActionKind.LOADING:
        return {...state, loading:!state.loading}

      case PriceActionKind.GET_PRED_PRICE:
        return {...state, price: payload}



       default:
        return state
    }}