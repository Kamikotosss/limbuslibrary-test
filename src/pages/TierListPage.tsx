import React from "react";
import { TierList } from "../components/tier-list/TierList";
import { useLocation, useNavigate } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { Filters } from "../components/filters/Filters";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";


const getQuaryByParam = (param:string) => {
    if(param === "identities") return ["identities","statuses"];
    if(param === "passives") return ["identities","statuses"];
    return ["ego","statuses"];
}
export const TierListPage:React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type')||"redirect";
    const navigate = useNavigate();
    if(type === "redirect")  navigate("/");
    const queryKeys = getQuaryByParam(type);
  
    return <CommonPageLayout title="Тир лист">
            <LoadingPageWrapper queryKeys={queryKeys}>
                <h1 style={{width:"90%" ,color:"white"}}>Тир Лист</h1>
                <TierListNav/>
                <Filters/>
                <TierList/>
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
