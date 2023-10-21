import { FetchIdsAction, FetchIdsActionError, FetchIdsActionSuccess, IdentityInterface, IdsAction, IdsActionTypes } from "../store/reducers/ids-reducer";
import * as XLSX from "xlsx";
import axios, { AxiosError } from "axios";
import { idsKeys } from "../constants/idsKeys";
import { getValidatedData } from "../constants/validations";
import { identitiesApiKey } from "../constants/apiKeys";
export const fetchIds = () => {
    const API_KEY = identitiesApiKey;
    const SPREADSHEET_ID = '18-JZl9LlsJLT9sLH-ob1DEez4jYDcxJZYWCVQGmhL1o';
    const RANGE = 'Ids'; 
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;
        return async (dispatch: (arg0: IdsAction) => void) =>{
            dispatch({type:IdsActionTypes.FETCH_IDS})
            try{
                const response = await axios.get(apiUrl);
                const result = getValidatedData([response.data.values] , idsKeys);
                dispatch({type:IdsActionTypes.FETCH_IDS_SUCCESS,payload:result as IdentityInterface[]})
            } catch(e: unknown){
                dispatch({type:IdsActionTypes.FETCH_IDS_ERROR,payload:(e as AxiosError).message})
            }
        
        }

}

