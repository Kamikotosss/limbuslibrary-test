import axios from "axios";
import { statusesApiKey } from "../constants/apiKeys";
import { getValidatedData } from "../constants/validations";
import { useQuery } from "react-query";
import { statusesKeys } from "../constants/statusesKeys";

const API_KEY = statusesApiKey; 
const SPREADSHEET_ID = '1nQehU8M42srGGaaeMDOM4jREBpPOclcvN0dJrZHh_ao';
const RANGE1 = 'Sinner'; 
const RANGE2 = 'Anomaly'; 

const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;
const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;


export const useFetchStatuses = () => {
    const {error,isError,isFetching,isLoading,data,isStale} = useQuery("statuses", async () => {
        const promise1 = axios.get(apiUrl1);
        const promise2 = axios.get(apiUrl2);
        try {
            return Promise.all([promise1, promise2]).then((responses) => {
                const [response1, response2] = responses;
                console.log("Fetching statuses")

                return getValidatedData([response1.data.values,response2.data.values] , statusesKeys);
            })
        } catch (error) {
            throw new Error("Failed to fetch Statuses data.");
        }
    },
    {
      staleTime: Infinity, 
      retry:5,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
    return { error, isError, isFetching, isLoading, data,isStale };
}