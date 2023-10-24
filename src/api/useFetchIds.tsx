import axios from "axios";
import { identitiesApiKey } from "../constants/apiKeys";
import { getValidatedData } from "../constants/validations";
import { useQuery } from "react-query";
import { idsKeys } from "../constants/idsKeys";

const API_KEY = identitiesApiKey;
const SPREADSHEET_ID = '18-JZl9LlsJLT9sLH-ob1DEez4jYDcxJZYWCVQGmhL1o';
const RANGE = 'Ids'; 
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;

export const useFetchIds = () => {
    const {error,isError,isFetching,isLoading,data,isStale} = useQuery("identities", async () => {
        try {
            console.log("Fetching ids")
            const response = await axios.get(apiUrl);
            return getValidatedData([response.data.values], idsKeys);
        } catch (error) {
            throw new Error("Failed to fetch Identities data.");
        }
    },
    {
      staleTime: Infinity, 
      retry:5,
      retryDelay:attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    });
    return { error, isError, isFetching, isLoading, data,isStale };
}