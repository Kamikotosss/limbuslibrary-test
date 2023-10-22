import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchIds } from "../api/fetchIds";
import { fetchStatuses } from "../api/fetchStatuses";
import { Filters } from "../components/filters/Filters";
import { ListIds } from "../components/list-ids/ListIds";
import { CommonPageLayout } from "./CommonPageLayout";

export const IdentitiesPage:React.FC = () => {
    const dispatch =useDispatch();

    useEffect(() => {
        fetchIds()(dispatch);
        fetchStatuses()(dispatch);
    }, []);
   
    return  <CommonPageLayout>
            <h1 style={{width:"90%" ,color:"white"}}>Список личностей</h1>
            <Filters />
            <ListIds />
</CommonPageLayout> 
}
