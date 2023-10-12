import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { fetchIds } from "../api/fetchIds";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { MainInfo } from "../components/main-info/MainInfo";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const IndexPage:React.FC = () => {
    const idsState = useTypedSelector(state => state.idsReducer);
    const egoState = useTypedSelector(state => state.egoReducer);
    const dispatch =useDispatch();
    useEffect(() => {
        fetchIds()(dispatch);
        fetchEGO()(dispatch);
    }, []);
    const layout = () =>{
        if(egoState.error !== null || idsState.error !== null) return <ErrorInfo errors={[idsState.error , egoState.error]}/>;
        if(egoState.loading || idsState.loading) return <LoadingAnimation/>;
        return(<MainInfo/>
        )
    }
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            {layout()}
        </main>
    </>
}
