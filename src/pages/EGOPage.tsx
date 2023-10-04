import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEGO } from "../api/fetchEGO";
import { Filters } from "../components/filters/Filters";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { ItemEGO } from "../components/item-ego/ItemEGO";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { EGOInterface } from "../store/reducers/ego-reducer";

export const EGOPage:React.FC = () => {
    const {ego} = useTypedSelector(state => state.egoReducer);
    const setupEGO = () =>{
        return ego?.map((item:EGOInterface)=>{
            return (<>
                {<ItemEGO ego={item} key={`${Math.random()}`}></ItemEGO>}
            </>);
        });
    }
    const dispatch =useDispatch();

    useEffect(() => {
        fetchEGO()(dispatch);
    }, []);

    return  <>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <div style={{width:"90%" ,color:"white"}}>
                <h1>Список ЭГО</h1>
            </div>
        <Filters></Filters>
            <div className={"tier-bar-items"} style={{width:"80%"}}>
                {setupEGO()}
            </div>
        </main>
        <Footer></Footer>
    </>
}
