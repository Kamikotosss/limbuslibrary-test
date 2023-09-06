import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { TierList } from "../components/tier-list/TierList";
import { useDispatch } from "react-redux";
import { FetchIdsAction, FetchIdsActionError, FetchIdsActionSuccess, IdsAction, IdsActionTypes } from "../store/reducers/ids-reducer";
import axios from "axios";
import * as XLSX from "xlsx";
import { idsKeys } from "../constants/idsKeys";
import { egoKeys } from "../constants/egoKeys";
import { IdentityInterface } from "../store/reducers/ids-reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { getLocationLastParam } from "../tools/getLocationLastParam";
import { EGOActionTypes, EGOInterface, FetchEGOAction, FetchEGOActionError, FetchEGOActionSuccess } from "../store/reducers/ego-reducer";
interface TierListPageInterface{
    redirect?:string
}
export const TierListPage:React.FC<TierListPageInterface> = ({redirect}) => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const location =useLocation();
 
    const fetchIds = async () =>{
        let result:IdentityInterface[] = [];
        try{
            dispatch<FetchIdsAction>({type: IdsActionTypes.FETCH_IDS});
            const response = await axios.get(`https://docs.google.com/spreadsheets/d/15DuUvVJP_F3KEAAQIMDdMf2NPfinft0jYffzYJXuok8/`, {responseType: "arraybuffer",});
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
            console.log(result);
            dispatch<FetchIdsActionSuccess>({type: IdsActionTypes.FETCH_IDS_SUCCESS, payload:result});
        } catch(e){
            dispatch<FetchIdsActionError>({type: IdsActionTypes.FETCH_IDS_ERROR , payload: e as string});
        }
    
    }
    const fetchEGO = async () =>{
        let result:EGOInterface[] = [];
        try{
            dispatch<FetchEGOAction>({type: EGOActionTypes.FETCH_EGO});
            const response = await axios.get(`https://docs.google.com/spreadsheets/d/17Qwv0_UamLyfe7ypTKuTjTAxHk7kWuIa5IqsJ0RUuoA/`, {responseType: "arraybuffer",});
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
            console.log(result);
            dispatch<FetchEGOActionSuccess>({type: EGOActionTypes.FETCH_EGO_SUCCESS, payload:result});
        } catch(e){
            dispatch<FetchEGOActionError>({type: EGOActionTypes.FETCH_EGO_ERROR , payload: e as string});
        }
    
    }
    useEffect(() => {
        if(!!redirect){
            console.log("redirected")
            navigate(redirect);
        } 
        const tierlistParam = getLocationLastParam(location.pathname);
        switch (tierlistParam){
            case "identities":
                fetchIds();
                break;
            case "ego":
                fetchEGO();
                break;
            case "passives":
                break;
            default:
                break;
        }
       
}, [location]);
    return  <>
        <Header></Header>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <TierListNav></TierListNav>
            <TierList></TierList>
        </main>
        <Footer></Footer>
    </>
}
