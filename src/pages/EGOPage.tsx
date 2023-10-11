import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { ErrorInfo } from "../components/error-info/ErrorInfo";
import { Filters } from "../components/filters/Filters";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { ListEgo } from "../components/list-ego/ListEgo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const EGOPage:React.FC = () => {
    const {loading,error} = useTypedSelector(state => state.egoReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);

    const dispatch =useDispatch();

    const layout = () =>{
        if(error !== null && statusesState.error !==null) return <ErrorInfo errors={[statusesState.error , error]}/>;
        if(loading || statusesState.loading) return <LoadingAnimation/>;
        return(
            <>
            <div style={{width:"90%" ,color:"white"}}>
                <h1>Список ЭГО</h1>
            </div>
            <Filters/>
            <ListEgo/>
            </>
        )
    }

    useEffect(() => {
        fetchEGO()(dispatch);
    }, []);

    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            
            {layout()}
        </main>
    </>
}
