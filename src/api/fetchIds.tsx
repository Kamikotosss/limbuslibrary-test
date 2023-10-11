import { FetchIdsAction, FetchIdsActionError, FetchIdsActionSuccess, IdentityInterface, IdsAction, IdsActionTypes } from "../store/reducers/ids-reducer";
import * as XLSX from "xlsx";
import axios, { AxiosError } from "axios";
import { idsKeys } from "../constants/idsKeys";
export const fetchIds = () => {
        return async (dispatch: (arg0: IdsAction) => void) =>{
            let result:IdentityInterface[] = [];
            dispatch({type:IdsActionTypes.FETCH_IDS})
            try{
                const response = await axios.get(`https://docs.google.com/spreadsheets/d/18-JZl9LlsJLT9sLH-ob1DEez4jYDcxJZYWCVQGmhL1o/`, {responseType: "arraybuffer",});
                const workbook = XLSX.read(response.data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                for(let numberIndx = 4 ; ; numberIndx++){
                    if( !(`B${numberIndx}` in sheet)) break;
                    const obj:any = {};
                    for(let letterIndx = 1 ; letterIndx < 26 ; letterIndx++){
                        const letter = String.fromCharCode(65 + letterIndx);// 65 - A 90 - Z
                        const keySheet = `${letter}${numberIndx}`;
                        if( keySheet in sheet){
                            obj[idsKeys[letter]] = sheet[keySheet].v ;
                        }else{
                            break;
                        }
                    }
                    result.push(obj as IdentityInterface) ;
                }
                dispatch({type:IdsActionTypes.FETCH_IDS_SUCCESS,payload:result})
            } catch(e: unknown){
                dispatch({type:IdsActionTypes.FETCH_IDS_ERROR,payload:(e as AxiosError).message})
            }
        
        }

}

