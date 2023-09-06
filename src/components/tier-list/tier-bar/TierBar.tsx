import React from "react";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { getLocationLastParam } from "../../../tools/getLocationLastParam";
import { ItemEGO } from "../../item-ego/ItemEGO";
import { ItemIdentity } from "../../item-identity/ItemIdentity";
import "./TierBar.css";
interface TierBarProps {
    rating:string;
    children?:any;
}
export const TierBar:React.FC<TierBarProps> = ({rating}) => {
    const {loading,ids,error} = useTypedSelector(state => state.idsReducer);
    const {ego} = useTypedSelector(state => state.egoReducer);
    const location = useLocation();
    const tierlistParam = getLocationLastParam(location.pathname);
    const setupEGO = () =>{
        return ego?.map((item:EGOInterface)=>{
            return (<>
                {item.egoTier === rating && <ItemEGO ego={item} key={`${Math.random()}`}></ItemEGO>}
            </>);
        });
    }
    const setupIds = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return (<>
                {item.idTier === rating && <ItemIdentity identity={item} key={`${Math.random()}`}></ItemIdentity>}
            </>);
        });
    }
    const setupPassives = () =>{
        return (<>
        </>
        )
    }
    const setupItems = () =>{
        switch (tierlistParam){
            case "identities":
                return setupIds()
            case "ego":
                return setupEGO()
            case "passives":
                return setupPassives();
            default:
                return;
        }
    }
    return (
        //TODO routing list
        <div className={"tier-bar-container"}>
            <div className={"tier-bar-left-subcontainer"}>
                <div className={["tier-bar-line" , `tier-bar-line--${rating}`].join(" ")}></div>
                <div className={["tier-bar-dot" , `tier-bar-dot--${rating}`].join(" ")}></div>
            </div>
            <div className={"tier-bar-right-subcontainer"}>
                <span className={"tier-bar-rating"}>{`${rating.toUpperCase()} tier`}</span>
                <span className={["tier-bar-description" , `tier-bar-description--${rating}`].join(" ")}> description description description description description </span>
                <div className={"tier-bar-items"}>
                    {setupItems()} 
                </div>
            </div>
            
        </div>
    )
}
