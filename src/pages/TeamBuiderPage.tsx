import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";

export const TeamBuilderPage:React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchEGO()(dispatch);
        fetchIds()(dispatch);
    }, []);
    return  <>
        <Header></Header>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <TbSins></TbSins>
            <TbSlots></TbSlots>
        </main>
        <Footer></Footer>
    </>
}
