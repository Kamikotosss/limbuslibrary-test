import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIds } from "../api/fetchIds";
import { fetchStatuses } from "../api/fetchStatuses";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { Filters } from "../components/filters/Filters";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { ListIds } from "../components/list-ids/ListIds";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const IdentitiesPage:React.FC = () => {
    const {loading,error} = useTypedSelector(state => state.idsReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const dispatch =useDispatch();
    useEffect(() => {
        fetchIds()(dispatch);
        fetchStatuses()(dispatch);
    }, []);
    const layout = () =>{
        if(error !== null && statusesState.error !== null) return <ErrorInfo errors={[statusesState.error , error]}/>;
        if(loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
            <div style={{width:"90%" ,color:"white"}}>
                <h1>Список личностей</h1>
            </div>
            <Filters/>
            <ListIds/>
            </>
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
