import React, { createContext, useReducer, useContext } from "react";
import { dataReducer, initialState, PriceActionKind } from "./dataReducer";

const Context = createContext(initialState);

export function Provider({ children }: any) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const getHistoryPrices = (value: number[]) => {
    dispatch({
      type: PriceActionKind.GETPRICES,
      payload: value,
    });
  };

  const value = {
    priceHistory: state.priceHistory,
    getHistoryPrices,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Context
const useData = () => {
  const context = useContext(Context);

  return context;
};

export default useData;
