import React from "react";
import { Filters } from "../components/filters/Filters";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { ItemIdentity } from "../components/item-identity/ItemIdentity";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IdentityInterface } from "../store/reducers/ids-reducer";

export const IdentitiesPage:React.FC = () => {
    const {loading,ids,error} = useTypedSelector(state => state.idsReducer);

    const setupIds = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return (<ItemIdentity identity={item} key={`ids${Math.random()}`}></ItemIdentity>);
        });
    }
    return  <>
        <Header></Header>
        <LeftMenu></LeftMenu>
        <main className={"global-content-wrapper"}>
            <Filters></Filters>
            <div>
                {setupIds()}
            </div>
        </main>
        <Footer></Footer>
    </>
}
