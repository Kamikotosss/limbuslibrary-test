import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { getLocationLastParam } from "../../../tools/getLocationLastParam";
import { isFilterMatching } from "../../../tools/isFilterMatching";
import { ItemEntity } from "../../item-entity/ItemEntity";
import "./TierBar.css";
interface TierBarProps {
    rating:string;
    tierListParam:string;
    description:string;
    children?:any;
}
export const TierBar:React.FC<TierBarProps> = ({rating,tierListParam,description}) => {
    const {ids} = useTypedSelector(state => state.idsReducer);
    const {ego} = useTypedSelector(state => state.egoReducer);
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);

    const setupEGO = () =>{
        return ego?.map((item:EGOInterface)=>{
            return (
            (item.egoTier === rating && isFilterMatching(filterState,searchState,item)) && <ItemEntity entity={item} key={`${item.imgUrl}`}/>
                );
            });
        }

    const setupIds = () =>{
        return ids?.map((item:IdentityInterface,index)=>{
            return ((item.idTier === rating && isFilterMatching(filterState,searchState,item)) && <ItemEntity entity={item} key={`${item.imgUrl}`}/>);
        });
    }
    const setupBattlePassives = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return ((item.passive1Tier === rating && isFilterMatching(filterState,searchState,item) ) && <ItemEntity entity={item} key={`${item.imgUrl}`}/>);
        });
    }
    const setupSupportPassives = () =>{
        return ids?.map((item:IdentityInterface)=>{
            return ((item.passive2Tier === rating && isFilterMatching(filterState,searchState,item) ) && <ItemEntity entity={item} key={`${item.imgUrl}`}/>);
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
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);

    return (
        <article ref={containerRef} className={["tier-bar-container" , `tier-bar-container--${rating}`, isVisible && "tier-bar-container--animated"].join(" ")}>
            <div className={["tier-bar-line" , `tier-bar-line--${rating}`].join(" ")}></div>
            <h3 className={"tier-bar-rating"}>{`${rating.toUpperCase()} тир`}</h3>
            <p className={["tier-bar-description" , `tier-bar-description--${rating}`].join(" ")}> {description} </p>
            <div className={"tier-bar-items"}>
                {setupItems()} 
            </div>
        </article>
    )
}
