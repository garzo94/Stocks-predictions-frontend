import { useCallback, useState, useContext } from "react";
import axios from "axios";
import useData from "../globalVariables/dataContext";

const client = axios.create({
    baseURL:"http://127.0.0.1:8000/api/"
})

export default function useRequestResource(){
    const { getHistoryPrices, getTimeSeries, getTrainTime,
        getTrainPrices, getPriceClose, getPredictionClose,
        getTimePrediction, getRmse,Loading, getPredPrice} = useData();
    // const [loading, setLoading] = useState(false)


    const getResourceData = useCallback(
     ({query}:{query:string})=>{
        Loading()

        client.get(`${query}`)
        .then((res)=>{

            // Hisotry Prices
            getHistoryPrices(res.data.data.prices)
            getTimeSeries(res.data.data.time)
            // Train Data
            getTrainTime(res.data.data.train.timeTrain)
            getTrainPrices(res.data.data.train.Close)

            // Table Data
            getPriceClose(res.data.data.valid.Close)
            getPredictionClose(res.data.data.valid.Predictions)
            getTimePrediction(res.data.data.valid.timeValid)

            // Rmse
            getRmse([res.data.data.rmse])


            // price

            getPredPrice(res.data.data.price)
            Loading()




        })
        .catch((err)=>console.log(err))
     },[client]
    );

    return{
        getResourceData,


    }

    interface pricetype{

    }
}

