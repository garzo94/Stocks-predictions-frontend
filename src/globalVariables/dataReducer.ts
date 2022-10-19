import {Reducer} from 'react'
export enum PriceActionKind{
    GETPRICES = 'GETPRICES'
}

interface priceActions {
    type: PriceActionKind,
    payload:number[]
}

interface State {
    priceHistory:number[]
    getHistoryPrices:(value:number[])=>void
}
export const initialState:State = {
    priceHistory:[],
    getHistoryPrices:()=>{}


}

export const dataReducer:Reducer<State,priceActions> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case PriceActionKind.GETPRICES:
        return {
          ...state,
          priceHistory: payload,
        };
       default:
        return state
    }}