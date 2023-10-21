import { StatusesAction , StatusesInterface , StatusesActionTypes} from "../store/reducers/statuses-reducer";
import axios, { AxiosError } from "axios";
import { statusesKeys } from "../constants/statusesKeys";
import { getValidatedData } from "../constants/validations";
import { statusesApiKey } from "../constants/apiKeys";
export const fetchStatuses = () => {
    const API_KEY =statusesApiKey; 
    const SPREADSHEET_ID = '1nQehU8M42srGGaaeMDOM4jREBpPOclcvN0dJrZHh_ao';
    const RANGE1 = 'Sinner'; 
    const RANGE2 = 'Anomaly'; 

    const apiUrl1 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE1}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;
    const apiUrl2 = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE2}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;

        return async (dispatch: (arg0: StatusesAction) => void) =>{
            dispatch({type:StatusesActionTypes.FETCH_STATUS})
            const promise1 = axios.get(apiUrl1);
            const promise2 = axios.get(apiUrl2);
            try{
                Promise.all([promise1, promise2])
                .then((responses) => {
                    const [response1, response2] = responses;
                    const result = getValidatedData([response1.data.values,response2.data.values] , statusesKeys);
                    dispatch({type:StatusesActionTypes.FETCH_STATUS_SUCCESS,payload:result as StatusesInterface[]})
                })
                .catch((error) => {
                    dispatch({type:StatusesActionTypes.FETCH_STATUS_ERROR,payload:(error as AxiosError).message})
                });
            } catch(e){
                dispatch({type:StatusesActionTypes.FETCH_STATUS_ERROR,payload:(e as AxiosError).message})
            }
        
        }

}

