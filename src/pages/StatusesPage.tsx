import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStatuses } from "../api/fetchStatuses";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { Statuses } from "../components/statuses/Statuses";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const StatusesPage:React.FC = () => {
    const {statuses,error,loading} = useTypedSelector(store => store.statusesReducer) ;
    const dispatch =useDispatch();
    useEffect(() => {
        fetchStatuses()(dispatch);
    }, []);
    const layout = () =>{
        if(error !== null) return <></>;
        if(loading === true) return <LoadingAnimation/>;
        if(statuses) return <Statuses statuses={statuses}/>;
    }
    return  <>
        <LeftMenu/>
        <main className={"global-content-wrapper"}>
            {
            layout()
            }
        </main>
        <Footer/>
    </>
}
