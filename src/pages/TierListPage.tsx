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
import { fetchStatuses } from "../api/fetchStatuses";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
interface TierListPageInterface{
    redirect?:string
}
export const TierListPage:React.FC<TierListPageInterface> = ({redirect}) => {
    const egoState = useTypedSelector( (store) => store.egoReducer);
    const idsState = useTypedSelector( (store) => store.idsReducer);
    const statusesState = useTypedSelector( (store) => store.statusesReducer);
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
        fetchStatuses()(dispatch);
    }, [location]);

    const layout = () =>{
        if(egoState.error !== null && idsState.error !== null && statusesState.error !== null)
        return <ErrorInfo errors={[idsState.error,idsState.error,statusesState.error]}/>;
        if(egoState.loading || idsState.loading || statusesState.loading) return <LoadingAnimation/>;
        return (
            <>
            <Filters></Filters>
            <TierList></TierList>
            </>
        );
    }
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            <TierListNav></TierListNav>
            {layout()}
        </main>
    </>
}
