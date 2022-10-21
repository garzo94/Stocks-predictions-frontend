import {Reducer} from 'react'
export enum PriceActionKind{
    GET_PRICES = 'GET_PRICES',
    GET_TIME = 'GET_TIME'
}


interface priceActions {
    type: PriceActionKind,
    payload:any[]
}

interface State {
    priceHistory:number[]
    timeSeries:string[]
    getHistoryPrices:(value:number[])=>void
    getTimeSeries:(value:string[])=>void
}
export const initialState:State = {
    priceHistory:[],
    timeSeries:[],
    getHistoryPrices:()=>{},
    getTimeSeries:()=>{}


}

export const dataReducer:Reducer<State,priceActions> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
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
       default:
        return state
    }}