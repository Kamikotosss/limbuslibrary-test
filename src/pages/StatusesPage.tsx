import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStatuses } from "../api/fetchStatuses";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { ScrollUpButton } from "../components/scroll-up-button/ScrollUpButton";
import { StatusesTable } from "../components/statuses-table/StatusesTable";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const StatusesPage:React.FC = () => {
    const {statuses,error,loading} = useTypedSelector(store => store.statusesReducer) ;
    const dispatch =useDispatch();
    useEffect(() => {
        fetchStatuses()(dispatch);
    }, []);
    const layout = () =>{
        if(error !== null) return <ErrorInfo errors={[error]}/>;
        if(loading === true) return <LoadingAnimation/>;
        if(statuses) return <>
            <div style={{width:"90%" ,color:"white"}}>
                <h1>Список статусов</h1>
            </div>
            <StatusesTable statuses={statuses}/>
            <ScrollUpButton/>
        </>;
    }
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            {
            layout()
            }
        </main>
    </>
}
