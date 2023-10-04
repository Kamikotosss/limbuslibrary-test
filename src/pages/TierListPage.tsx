import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { TierList } from "../components/tier-list/TierList";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { getLocationLastParam } from "../tools/getLocationLastParam";
import { fetchIds } from "../api/fetchIds";
import { fetchEGO } from "../api/fetchEGO";
import { Filters } from "../components/filters/Filters";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";
interface TierListPageInterface{
    redirect?:string
}
export const TierListPage:React.FC<TierListPageInterface> = ({redirect}) => {
    const egoState = useTypedSelector( (store) => store.egoReducer);
    const idsState = useTypedSelector( (store) => store.idsReducer);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const location =useLocation();
    useEffect(() => {
        if(!!redirect){
            console.log("redirected")
            navigate(redirect);
        } 
        const tierlistParam = getLocationLastParam(location.pathname);
        switch (tierlistParam){
            case "identities":
                fetchIds()(dispatch);
                break;
            case "ego":
                fetchEGO()(dispatch);
                break;
            case "passives":
                fetchIds()(dispatch);
                break;
            default:
                break;
        }
       
    }, [location]);

    const layout = () =>{
        if(egoState.error !== null || idsState.error !== null ) return <></>;
        if(egoState.loading === true || idsState.loading === true) return <LoadingAnimation/>;
        return (
            <>
            <Filters></Filters>
            <TierList></TierList>
            </>
        );
    }
    return  <>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <TierListNav></TierListNav>
            {layout()}
        </main>
        <Footer></Footer>
    </>
}
