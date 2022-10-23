import { useCallback, useState, useContext } from "react";
import axios from "axios";
import useData from "../globalVariables/dataContext";

const client = axios.create({
    baseURL:"http://127.0.0.1:8000/api/"
})

export default function useRequestResource(){
    const { getHistoryPrices, getTimeSeries } = useData();
    // const [loading, setLoading] = useState(false)


    const getResourceData = useCallback(
     ({query}:{query:string})=>{

        client.get(`${query}`)
        .then((res)=>{
            getHistoryPrices(res.data.data.prices)
            getTimeSeries(res.data.data.time)
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

