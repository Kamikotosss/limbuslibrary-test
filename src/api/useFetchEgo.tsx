import axios from "axios";
import { egoApiKey } from "../constants/apiKeys";
import { egoKeys } from "../constants/egoKeys";
import { getValidatedData } from "../constants/validations";
import { useQuery } from "react-query";

const API_KEY = egoApiKey;
const SPREADSHEET_ID = '1k_TaGK7vOfYdIS5-6GxJBEjFsxjZyzb1x_0Zi1k6kao';
const RANGE = 'EGO'; 
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;

export const useFetchEgo = () => {
    const {error,isError,isFetching,isLoading,data,isStale} = useQuery("ego", async () => {
        try {
            console.log("Fetching ego")
            const response = await axios.get(apiUrl);
            return getValidatedData([response.data.values], egoKeys);
        } catch (error) {
            throw new Error("Failed to fetch EGO data.");
        }
    },
    {
      staleTime: Infinity,
      retry:5,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });

    return { error, isError, isFetching, isLoading, data ,isStale };
}