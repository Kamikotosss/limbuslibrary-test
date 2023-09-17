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
    tierListParam:string;
    children?:any;
}
export const TierBar:React.FC<TierBarProps> = ({rating,tierListParam}) => {
    const {loading,ids,error} = useTypedSelector(state => state.idsReducer);
    const {ego} = useTypedSelector(state => state.egoReducer);

    const setupEGO = () =>{
        return ego?.map((item:EGOInterface)=>{
            return (
                (item.egoTier === rating ) && <ItemEGO ego={item} key={`ego${Math.random()}`}></ItemEGO>
                );
            });
        }

    const setupIds = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return ((item.idTier === rating ) && <ItemIdentity identity={item} key={`ids${Math.random()}`}></ItemIdentity>);
        });
    }
    const setupBattlePassives = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return ((item.passive1Tier === rating ) && <ItemIdentity identity={item} key={`ids${Math.random()}`}></ItemIdentity>);
        });
    }
    const setupSupportPassives = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return ((item.passive2Tier === rating ) && <ItemIdentity identity={item} key={`ids${Math.random()}`}></ItemIdentity>);
        });
    }
    const setupItems = () =>{
        switch (tierListParam){
            case "identities":
                return setupIds()
            case "ego":
                return setupEGO()
            case "battlePassives":
                return setupBattlePassives();
            case "supportPassives":
                return setupSupportPassives();
            default:
                return;
        }
    }
    return (
        <div className={["tier-bar-container" , `tier-bar-container--${rating}`].join(" ")}>
            <div className={["tier-bar-line" , `tier-bar-line--${rating}`].join(" ")}></div>
            <span className={"tier-bar-rating"}>{`${rating.toUpperCase()} tier`}</span>
            <span className={["tier-bar-description" , `tier-bar-description--${rating}`].join(" ")}> description description description description description </span>
            <div className={"tier-bar-items"}>
                {setupItems()} 
            </div>
        </div>
    )
}
