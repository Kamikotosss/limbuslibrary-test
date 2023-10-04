import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStatuses } from "../api/fetchStatuses";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { Statuses } from "../components/statuses/Statuses";

export const StatusesPage:React.FC = () => {
    const dispatch =useDispatch();
    useEffect(() => {
        fetchStatuses()(dispatch);
    }, []);
    return  <>
        <LeftMenu/>
        <main className={"global-content-wrapper"}>
            <Statuses/>
        </main>
        <Footer/>
    </>
}
