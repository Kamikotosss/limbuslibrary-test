import * as XLSX from "xlsx";
import axios, { Axios, AxiosError } from "axios";
import { EGOInterface,EGOActionTypes,EGOAction} from "../store/reducers/ego-reducer";
import { egoKeys } from "../constants/egoKeys";
import { getValidatedData } from "../constants/validations";
import { egoApiKey } from "../constants/apiKeys";

export const fetchEGO = () => {
    const API_KEY = egoApiKey;
    const SPREADSHEET_ID = '1k_TaGK7vOfYdIS5-6GxJBEjFsxjZyzb1x_0Zi1k6kao';
    const RANGE = 'EGO'; 
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?valueRenderOption=UNFORMATTED_VALUE&key=${API_KEY}`;
        return  async (dispatch: (arg0: EGOAction) => void) =>{
            dispatch({type: EGOActionTypes.FETCH_EGO});
            try{
                const response = await axios.get(apiUrl);
                const result = getValidatedData([response.data.values] , egoKeys);
                dispatch({type: EGOActionTypes.FETCH_EGO_SUCCESS, payload:result as EGOInterface[]});
            } catch(e: unknown){
                dispatch({type: EGOActionTypes.FETCH_EGO_ERROR , payload: (e as AxiosError).message });
            }
        }

}