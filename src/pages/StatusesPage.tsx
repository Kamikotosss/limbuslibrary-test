import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchStatuses } from "../api/fetchStatuses";
import { StatusesTable } from "../components/statuses-table/StatusesTable";
import { CommonPageLayout } from "./CommonPageLayout";

export const StatusesPage:React.FC = () => {
    const dispatch =useDispatch();
    useEffect(() => {
        fetchStatuses()(dispatch);
    }, []);
   
    return  <CommonPageLayout>
            <h1 style={{width:"90%" ,color:"white"}}>Список статусов</h1>
            <StatusesTable/>
</CommonPageLayout> 
}
