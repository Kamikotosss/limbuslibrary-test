import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { Filters } from "../components/filters/Filters";
import { Footer } from "../components/footer/Footer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { ListEgo } from "../components/list-ego/ListEgo";
import { LoadingAnimation } from "../components/loading-animation/LoadingAnimation";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const EGOPage:React.FC = () => {
    const {loading,error} = useTypedSelector(state => state.egoReducer);
    const dispatch =useDispatch();

    const layout = () =>{
        if(error !== null) return <></>;
        if(loading) return <LoadingAnimation/>;
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
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            
            {layout()}
        </main>
        <Footer></Footer>
    </>
}
