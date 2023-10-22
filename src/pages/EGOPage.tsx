import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchStatuses } from "../api/fetchStatuses";
import { Filters } from "../components/filters/Filters";
import { ListEgo } from "../components/list-ego/ListEgo";
import { CommonPageLayout } from "./CommonPageLayout";

export const EGOPage:React.FC = () => {
    const dispatch =useDispatch();

    useEffect(() => {
        fetchEGO()(dispatch);
        fetchStatuses()(dispatch);
    }, []);

    return <CommonPageLayout>
        <h1 style={{width:"90%" ,color:"white"}}>Список ЭГО</h1>
        <Filters/>
        <ListEgo/>
    </CommonPageLayout> 
}
