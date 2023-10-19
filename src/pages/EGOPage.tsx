import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { Filters } from "../components/filters/Filters";
import { ListEgo } from "../components/list-ego/ListEgo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CommonPageLayout } from "./CommonPageLayout";

export const EGOPage:React.FC = () => {
    const {loading,error} = useTypedSelector(state => state.egoReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);

    const dispatch =useDispatch();

    const layout = () =>{
        if(error !== null || statusesState.error !== null ) return <ErrorInfo errors={[statusesState.error , error]}/>;
        if(loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
            <h1 style={{width:"90%" ,color:"white"}}>Список ЭГО</h1>
            <Filters/>
            <ListEgo/>
            </>
        )
    }

    useEffect(() => {
        fetchEGO()(dispatch);
    }, []);

    return <CommonPageLayout>
            {layout()}
    </CommonPageLayout> 
}
