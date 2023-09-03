import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { idsKeys } from "../constants/idsKeys";
import { IdsAction, IdsActionTypes } from "../store/reducers/ids-reducer";
import axios from "axios";
import { useEffect } from "react";
const useFetchIds = () => {
    const dispatch =useDispatch();
    useEffect(() => {
    const fetchData = async () =>{
        let result:IdsAction[] = [];
        try{
            dispatch<IdsAction>({type: IdsActionTypes.FETCH_IDS});
            const response = await axios.get(`https://docs.google.com/spreadsheets/d/18-JZl9LlsJLT9sLH-ob1DEez4jYDcxJZYWCVQGmhL1o/`);
            const workbook = XLSX.read(response.data, { type: 'binary' });
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
                result.push(obj) ;
            }
            console.log(result);
            //dispatch<IdsAction>({type: IdsActionTypes.FETCH_IDS_SUCCESS, payload:response.data});
        } catch(e){
            dispatch<IdsAction>({type: IdsActionTypes.FETCH_IDS_ERROR , payload: e as string});
        }
    
    }
    fetchData();
}, []);
return null;
}
export {useFetchIds};