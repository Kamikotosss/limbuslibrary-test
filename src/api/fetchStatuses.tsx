import { StatusesAction , StatusesInterface , StatusesActionTypes} from "../store/reducers/statuses-reducer";
import * as XLSX from "xlsx";
import axios, { AxiosError } from "axios";
import { statusesKeys } from "../constants/statusesKeys";
export const fetchStatuses = () => {
        return async (dispatch: (arg0: StatusesAction) => void) =>{
            let result:StatusesInterface[] = [];
            dispatch({type:StatusesActionTypes.FETCH_STATUS})
            try{
                const response = await axios.get(`https://docs.google.com/spreadsheets/d/1nQehU8M42srGGaaeMDOM4jREBpPOclcvN0dJrZHh_ao/`, {responseType: "arraybuffer",});
                const workbook = XLSX.read(response.data, { type: 'array' });
                for (const sheetName in workbook.Sheets){
                    const sheet = workbook.Sheets[sheetName];
                    for(let numberIndx = 4 ; ; numberIndx++){
                        if( !(`B${numberIndx}` in sheet)) break;
                        const obj:any = {};
                        for(let letterIndx = 1 ; letterIndx < 26 ; letterIndx++){
                            const letter = String.fromCharCode(65 + letterIndx);// 65 - A 90 - Z
                            const keySheet = `${letter}${numberIndx}`;
                            if( keySheet in sheet){
                                obj[statusesKeys[letter]] = sheet[keySheet].v ;
                            }else{
                                break;
                            }
                        }
                        result.push(obj as StatusesInterface) ;
                    }
                }
                dispatch({type:StatusesActionTypes.FETCH_STATUS_SUCCESS,payload:result})
            } catch(e){
                dispatch({type:StatusesActionTypes.FETCH_STATUS_ERROR,payload:(e as AxiosError).message})
            }
        
        }

}

