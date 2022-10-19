import { useCallback, useState, useContext } from "react";
import axios from "axios";
import useData from "../globalVariables/dataContext";

const client = axios.create({
    baseURL:"http://127.0.0.1:8000/api/"
})

export default function useRequestResource(){
    const { priceHistory, getHistoryPrices } = useData();
    const [closePriceHistory, setclosePriceHistory] = useState({ results: [] })
    const [time, setTime] = useState<number[]>([])
    const [loading, setLoading] = useState(false)


    const getResourceData = useCallback(
     ()=>{
        setLoading(true);
        client.get(``)
        .then((res)=>{
            console.log('heey whats up')
            getHistoryPrices(res.data.data.prices)
        })
        .catch((err)=>console.log(err))
     },[client,setclosePriceHistory,setLoading]
    );
    console.log(closePriceHistory,'heeyyy')
    return{
        getResourceData,
        closePriceHistory

    }

    interface pricetype{

    }
}

