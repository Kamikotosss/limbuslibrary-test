import React, { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { TierList } from "../components/tier-list/TierList";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { getLocationLastParam } from "../tools/getLocationLastParam";
import { fetchIds } from "../components/api/fetchIds";
import { fetchEGO } from "../components/api/fetchEGO";
interface TierListPageInterface{
    redirect?:string
}
export const TierListPage:React.FC<TierListPageInterface> = ({redirect}) => {
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
