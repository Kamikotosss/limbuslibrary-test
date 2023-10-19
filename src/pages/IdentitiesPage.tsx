import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchIds } from "../api/fetchIds";
import { fetchStatuses } from "../api/fetchStatuses";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { Filters } from "../components/filters/Filters";
import { ListIds } from "../components/list-ids/ListIds";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CommonPageLayout } from "./CommonPageLayout";

export const IdentitiesPage:React.FC = () => {
    const {loading,error} = useTypedSelector(state => state.idsReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const dispatch =useDispatch();
    const ref = useRef(null);
    useEffect(() => {
        fetchIds()(dispatch);
        fetchStatuses()(dispatch);
    }, []);
    const layout = () =>{
        if(error !== null || statusesState.error !== null) return <ErrorInfo errors={[statusesState.error , error]}/>;
        if(loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
            <h1 style={{width:"90%" ,color:"white"}}>Список личностей</h1>
            <Filters />
            <ListIds />
            </>
        )
    }
    return  <CommonPageLayout>
    {layout()}
</CommonPageLayout> 
}
