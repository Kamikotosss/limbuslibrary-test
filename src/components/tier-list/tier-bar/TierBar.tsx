import React from "react";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { getLocationLastParam } from "../../../tools/getLocationLastParam";
import { EGOProfile } from "../../ego-profile/EGOProfile";
import { IdProfile } from "../../id-profile/IdProfile";
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
        return ego?.map((id:EGOInterface)=>{
            return (<>
                {id.egoTier === rating && <EGOProfile ego={id} key={`${Math.random()}`}></EGOProfile>}
            </>);
        });
    }
    const setupIds = () =>{
        return ids?.map((id:IdentityInterface)=>{
            return (<>
                {id.idTier === rating && <IdProfile identity={id} key={`${Math.random()}`}></IdProfile>}
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
            <div className={["tier-bar-rating" , `tier-bar-rating--${rating}`].join(" ")}>
                <span>{rating}</span>
            </div>
            <div className={"tier-bar-items"}>
                {setupItems()} 
            </div>
        </div>
    )
}
