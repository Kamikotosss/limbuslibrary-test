import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchStatuses } from "../api/fetchStatuses";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { StatusesTable } from "../components/statuses-table/StatusesTable";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CommonPageLayout } from "./CommonPageLayout";

export const StatusesPage:React.FC = () => {
    const {statuses,error,loading} = useTypedSelector(store => store.statusesReducer) ;
    const dispatch =useDispatch();
    useEffect(() => {
        fetchStatuses()(dispatch);
    }, []);
    const layout = () =>{
        if(error !== null) return <ErrorInfo errors={[error]}/>;
        if(loading) return <LoadingAnimation/>;
        if(statuses) return <>
            <h1 style={{width:"90%" ,color:"white"}}>Список статусов</h1>
            <StatusesTable statuses={statuses}/>
        </>;
        return <></>
    }
    return  <CommonPageLayout>
    {layout()}
</CommonPageLayout> 
}
