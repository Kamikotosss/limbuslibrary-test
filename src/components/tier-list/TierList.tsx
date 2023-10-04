import React from "react";
import { useLocation } from "react-router-dom";
import { getLocationLastParam } from "../../tools/getLocationLastParam";
import { TierBar } from "./tier-bar/TierBar";
import "./TierList.css"
interface TierListInterface {
   
}
export const TierList:React.FC<TierListInterface> = () => {
    const ratings = ["SSS","SS","S","A","B","C"];
    const location = useLocation();
    const locationParam = getLocationLastParam(location.pathname);

    const tierListClass = () =>{
        switch (locationParam){
            case "identities":
                return "tier-list--ego-ids";
            case "ego":
                return "tier-list--ego-ids";
            case "passives":
                return "tier-list--passives";            
        }
        return "";
    }
    const setupTierlist = () => {
        if (locationParam === "passives") return ["battlePassives" , "supportPassives"];
        return [locationParam];
    }
    const tierListName = (tierListParam:string) =>{
        switch (tierListParam){
            case "identities":
                return "Identities tier list";
            case "ego":
                return "EGO tier list";
            case "battlePassives":
                return "Battle passives tier list";      
            case "supportPassives":
                return "Support passives tier list";        
        }
        return "";
    }
    return (
        //TODO routing list
        <div className="tier-list-container">
            {setupTierlist().map((tierListParam)=>{
                return (
                    <div key={`${Math.random()}`} className={["tier-list" , tierListClass()].join(" ")}>
                        <span className="tier-list-name">{tierListName(tierListParam)}</span>
                            {ratings.map((rating)=>{
                                return(
                                    <TierBar  rating={rating} tierListParam={tierListParam} key={`${rating}`}></TierBar>
                                )
                            })}
                    </div>
                )
            })}
        </div>
        
    )
}
