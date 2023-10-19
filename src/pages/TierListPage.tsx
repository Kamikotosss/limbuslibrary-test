import React, { useEffect} from "react";
import { TierList } from "../components/tier-list/TierList";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { fetchIds } from "../api/fetchIds";
import { fetchEGO } from "../api/fetchEGO";
import { Filters } from "../components/filters/Filters";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchStatuses } from "../api/fetchStatuses";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { CommonPageLayout } from "./CommonPageLayout";

export const TierListPage:React.FC = () => {
    const egoState = useTypedSelector( (store) => store.egoReducer);
    const idsState = useTypedSelector( (store) => store.idsReducer);
    const statusesState = useTypedSelector( (store) => store.statusesReducer);
    const dispatch =useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    useEffect(() => {
        switch (type){
            case "identities":
                fetchIds()(dispatch);
                break;
            case "ego":
                fetchEGO()(dispatch);
                break;
            case "passives":
                fetchIds()(dispatch);
                break;
            default:
                navigate("/limbuslibrary/");
                return;
        }
        fetchStatuses()(dispatch);
    }, [location]);

    const layout = () =>{
        if(egoState.error !== null || idsState.error !== null || statusesState.error !== null)
        return <ErrorInfo errors={[egoState.error,idsState.error,statusesState.error]}/>;
        if(egoState.loading || idsState.loading || statusesState.loading) return <LoadingAnimation/>;
        return (
            <>
            <h1 style={{width:"90%" ,color:"white"}}>Тир Лист</h1>
            <TierListNav/>
            <Filters/>
            <TierList/>
            </>
        );
    }
    return <CommonPageLayout>
    {layout()}
</CommonPageLayout> 
}
