import React, { useEffect} from "react";
import { TierList } from "../components/tier-list/TierList";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { fetchIds } from "../api/fetchIds";
import { fetchEGO } from "../api/fetchEGO";
import { Filters } from "../components/filters/Filters";
import { fetchStatuses } from "../api/fetchStatuses";
import { CommonPageLayout } from "./CommonPageLayout";

export const TierListPage:React.FC = () => {
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
                navigate("/");
                return;
        }
        fetchStatuses()(dispatch);
    }, [location]);

    return <CommonPageLayout>
            <h1 style={{width:"90%" ,color:"white"}}>Тир Лист</h1>
            <TierListNav/>
            <Filters/>
            <TierList/>
    </CommonPageLayout> 
}
