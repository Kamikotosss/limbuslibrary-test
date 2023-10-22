import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { MainInfo } from "../components/main-info/MainInfo";
import { CommonPageLayout } from "./CommonPageLayout";

export const IndexPage:React.FC = () => {
    const dispatch =useDispatch();
    useEffect(() => {
        fetchIds()(dispatch);
        fetchEGO()(dispatch);
    }, []);
  
    return  <CommonPageLayout>
    <MainInfo/>
</CommonPageLayout> 
}
