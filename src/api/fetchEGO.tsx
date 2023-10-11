import * as XLSX from "xlsx";
import axios, { Axios, AxiosError } from "axios";
import { EGOInterface,EGOActionTypes,EGOAction} from "../store/reducers/ego-reducer";
import { egoKeys } from "../constants/egoKeys";
export const fetchEGO = () => {
        return  async (dispatch: (arg0: EGOAction) => void) =>{
            let result:EGOInterface[] = [];
            dispatch({type: EGOActionTypes.FETCH_EGO});
            try{
                const response = await axios.get(`https://docs.google.com/spreadsheets/d/1k_TaGK7vOfYdIS5-6GxJBEjFsxjZyzb1x_0Zi1k6kao/`, {responseType: "arraybuffer",});
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
                            obj[egoKeys[letter]] = sheet[keySheet].v ;
                        }else{
                            break;
                        }
                    }
                    result.push(obj as EGOInterface) ;
                }
                dispatch({type: EGOActionTypes.FETCH_EGO_SUCCESS, payload:result});
            } catch(e: unknown){
                dispatch({type: EGOActionTypes.FETCH_EGO_ERROR , payload: (e as AxiosError).message });
            }
        
        
        }

}

